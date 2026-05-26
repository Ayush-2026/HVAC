import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  // ─── Sales Channel & API Key ──────────────────────────────────────────────

  logger.info("Seeding store data...");
  const {
    result: [defaultSalesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Default Sales Channel",
          description: "Created by HVAC Store seed",
        },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Default Publishable API Key",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel.id],
    },
  });

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "HVAC Pro Store",
          supported_currencies: [
            { currency_code: "usd", is_default: true },
            { currency_code: "gbp", is_default: false },
          ],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      ],
    },
  });

  // ─── Regions ──────────────────────────────────────────────────────────────

  logger.info("Seeding region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
          payment_providers: ["pp_system_default"],
        },
        {
          name: "United Kingdom",
          currency_code: "gbp",
          countries: ["gb"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const usRegion = regionResult[0];
  const ukRegion = regionResult[1];
  logger.info("Finished seeding regions.");

  // ─── Tax Regions ──────────────────────────────────────────────────────────

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: [
      { country_code: "us", provider_id: "tp_system" },
      { country_code: "gb", provider_id: "tp_system" },
    ],
  });
  logger.info("Finished seeding tax regions.");

  // ─── Stock Location ───────────────────────────────────────────────────────

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "US Warehouse",
          address: {
            city: "Dallas",
            country_code: "US",
            address_1: "1234 Industrial Blvd",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  });

  // ─── Fulfillment Sets ─────────────────────────────────────────────────────

  logger.info("Seeding fulfillment data...");
  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "HVAC Store Delivery",
    type: "shipping",
    service_zones: [
      {
        name: "US Shipping",
        geo_zones: [{ country_code: "us", type: "country" }],
      },
      {
        name: "UK Shipping",
        geo_zones: [{ country_code: "gb", type: "country" }],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  const usZoneId = fulfillmentSet.service_zones[0].id;
  const ukZoneId = fulfillmentSet.service_zones[1].id;

  await createShippingOptionsWorkflow(container).run({
    input: [
      // ── US Shipping Options ──
      {
        name: "Standard Shipping (US)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: usZoneId,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Standard", description: "Delivered in 3-5 business days.", code: "standard" },
        prices: [
          { currency_code: "usd", amount: 2500 },
          { region_id: usRegion.id, amount: 2500 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Express Shipping (US)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: usZoneId,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Express", description: "Delivered in 1-2 business days.", code: "express" },
        prices: [
          { currency_code: "usd", amount: 4500 },
          { region_id: usRegion.id, amount: 4500 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Freight Shipping (US)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: usZoneId,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Freight", description: "For large HVAC units — 5-7 business days.", code: "freight" },
        prices: [
          { currency_code: "usd", amount: 14900 },
          { region_id: usRegion.id, amount: 14900 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      // ── UK Shipping Options ──
      {
        name: "Standard Shipping (UK)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: ukZoneId,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Standard", description: "Delivered in 3-5 business days.", code: "standard" },
        prices: [
          { currency_code: "gbp", amount: 2000 },
          { region_id: ukRegion.id, amount: 2000 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Express Shipping (UK)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: ukZoneId,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Express", description: "Next working day delivery.", code: "express" },
        prices: [
          { currency_code: "gbp", amount: 3500 },
          { region_id: ukRegion.id, amount: 3500 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Freight Shipping (UK)",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: ukZoneId,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Freight", description: "For large HVAC units — 5-7 business days.", code: "freight" },
        prices: [
          { currency_code: "gbp", amount: 11900 },
          { region_id: ukRegion.id, amount: 11900 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [defaultSalesChannel.id] },
  });
  logger.info("Finished seeding stock location data.");

  // ─── Product Categories ───────────────────────────────────────────────────

  logger.info("Seeding HVAC product categories...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: [
        { name: "Air Conditioners", is_active: true, rank: 0 },
        { name: "Heat Pumps", is_active: true, rank: 1 },
        { name: "Furnaces & Boilers", is_active: true, rank: 2 },
        { name: "Thermostats", is_active: true, rank: 3 },
        { name: "Filters & Parts", is_active: true, rank: 4 },
        { name: "Accessories", is_active: true, rank: 5 },
      ],
    },
  });

  const cat = (name: string) =>
    categoryResult.find((c) => c.name === name)!.id;

  logger.info("Finished seeding categories.");

  // ─── Products ─────────────────────────────────────────────────────────────

  logger.info("Seeding HVAC product data...");

  await createProductsWorkflow(container).run({
    input: {
      products: [
        // ── Air Conditioners ──────────────────────────────────────────────
        {
          title: "Carrier Performance 16 SEER Central Air Conditioner",
          handle: "carrier-performance-16-seer-ac",
          category_ids: [cat("Air Conditioners")],
          description:
            "The Carrier Performance series delivers quiet, reliable cooling with a 16 SEER2 efficiency rating. Ideal for residential and light commercial use. Features a two-stage scroll compressor for consistent comfort and energy savings.",
          weight: 68000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            seer_rating: "16",
            fuel_type: "electric",
            voltage: "208/230V",
            brand: "Carrier",
            warranty_years: "10",
          },
          images: [
            { url: "https://placehold.co/800x600/1e3a5f/ffffff?text=Carrier+16+SEER+AC" },
            { url: "https://placehold.co/800x600/1e3a5f/ffffff?text=Carrier+AC+Side+View" },
          ],
          options: [{ title: "Tonnage", values: ["1.5 Ton", "2 Ton", "2.5 Ton", "3 Ton", "3.5 Ton"] }],
          variants: [
            {
              title: "1.5 Ton",
              sku: "CARR-AC-16SEER-1.5T",
              options: { Tonnage: "1.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 119900 },
                { currency_code: "gbp", amount: 94900 },
              ],
            },
            {
              title: "2 Ton",
              sku: "CARR-AC-16SEER-2T",
              options: { Tonnage: "2 Ton" },
              prices: [
                { currency_code: "usd", amount: 149900 },
                { currency_code: "gbp", amount: 119900 },
              ],
            },
            {
              title: "2.5 Ton",
              sku: "CARR-AC-16SEER-2.5T",
              options: { Tonnage: "2.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 169900 },
                { currency_code: "gbp", amount: 134900 },
              ],
            },
            {
              title: "3 Ton",
              sku: "CARR-AC-16SEER-3T",
              options: { Tonnage: "3 Ton" },
              prices: [
                { currency_code: "usd", amount: 189900 },
                { currency_code: "gbp", amount: 149900 },
              ],
            },
            {
              title: "3.5 Ton",
              sku: "CARR-AC-16SEER-3.5T",
              options: { Tonnage: "3.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 219900 },
                { currency_code: "gbp", amount: 174900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "Goodman 18 SEER2 Two-Stage Central Air Conditioner",
          handle: "goodman-18-seer2-two-stage-ac",
          category_ids: [cat("Air Conditioners")],
          description:
            "Goodman's 18 SEER2 two-stage air conditioner provides superior comfort control and energy efficiency. The two-stage operation runs at low capacity most of the time, reducing energy usage and improving humidity control.",
          weight: 72000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            seer_rating: "18",
            fuel_type: "electric",
            voltage: "208/230V",
            brand: "Goodman",
            warranty_years: "10",
            stages: "2",
          },
          images: [
            { url: "https://placehold.co/800x600/0f2540/ffffff?text=Goodman+18+SEER2+AC" },
            { url: "https://placehold.co/800x600/0f2540/ffffff?text=Goodman+AC+Unit" },
          ],
          options: [{ title: "Tonnage", values: ["2 Ton", "2.5 Ton", "3 Ton", "3.5 Ton", "4 Ton"] }],
          variants: [
            {
              title: "2 Ton",
              sku: "GOOD-AC-18SEER-2T",
              options: { Tonnage: "2 Ton" },
              prices: [
                { currency_code: "usd", amount: 179900 },
                { currency_code: "gbp", amount: 144900 },
              ],
            },
            {
              title: "2.5 Ton",
              sku: "GOOD-AC-18SEER-2.5T",
              options: { Tonnage: "2.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 209900 },
                { currency_code: "gbp", amount: 169900 },
              ],
            },
            {
              title: "3 Ton",
              sku: "GOOD-AC-18SEER-3T",
              options: { Tonnage: "3 Ton" },
              prices: [
                { currency_code: "usd", amount: 229900 },
                { currency_code: "gbp", amount: 184900 },
              ],
            },
            {
              title: "3.5 Ton",
              sku: "GOOD-AC-18SEER-3.5T",
              options: { Tonnage: "3.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 259900 },
                { currency_code: "gbp", amount: 209900 },
              ],
            },
            {
              title: "4 Ton",
              sku: "GOOD-AC-18SEER-4T",
              options: { Tonnage: "4 Ton" },
              prices: [
                { currency_code: "usd", amount: 289900 },
                { currency_code: "gbp", amount: 234900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Heat Pumps ────────────────────────────────────────────────────
        {
          title: "Lennox XP21 Variable-Speed Heat Pump",
          handle: "lennox-xp21-variable-speed-heat-pump",
          category_ids: [cat("Heat Pumps")],
          description:
            "The Lennox XP21 is one of the most efficient heat pumps available, with up to 21 SEER and 10 HSPF ratings. Variable-speed operation provides precise temperature control and ultra-quiet performance year-round.",
          weight: 75000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            seer_rating: "21",
            hspf: "10",
            fuel_type: "electric",
            brand: "Lennox",
            warranty_years: "10",
            compressor_type: "variable_speed",
          },
          images: [
            { url: "https://placehold.co/800x600/1a4a6e/ffffff?text=Lennox+XP21+Heat+Pump" },
            { url: "https://placehold.co/800x600/1a4a6e/ffffff?text=Lennox+Heat+Pump+Detail" },
          ],
          options: [{ title: "Tonnage", values: ["2 Ton", "2.5 Ton", "3 Ton", "3.5 Ton"] }],
          variants: [
            {
              title: "2 Ton",
              sku: "LENNOX-HP-XP21-2T",
              options: { Tonnage: "2 Ton" },
              prices: [
                { currency_code: "usd", amount: 219900 },
                { currency_code: "gbp", amount: 179900 },
              ],
            },
            {
              title: "2.5 Ton",
              sku: "LENNOX-HP-XP21-2.5T",
              options: { Tonnage: "2.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 249900 },
                { currency_code: "gbp", amount: 199900 },
              ],
            },
            {
              title: "3 Ton",
              sku: "LENNOX-HP-XP21-3T",
              options: { Tonnage: "3 Ton" },
              prices: [
                { currency_code: "usd", amount: 279900 },
                { currency_code: "gbp", amount: 224900 },
              ],
            },
            {
              title: "3.5 Ton",
              sku: "LENNOX-HP-XP21-3.5T",
              options: { Tonnage: "3.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 309900 },
                { currency_code: "gbp", amount: 249900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "Daikin DX14SN 14 SEER Single-Stage Heat Pump",
          handle: "daikin-dx14sn-14-seer-heat-pump",
          category_ids: [cat("Heat Pumps")],
          description:
            "The Daikin DX14SN is a reliable, affordable heat pump offering 14 SEER efficiency. Perfect as an entry-level replacement unit with broad compatibility and a proven single-stage scroll compressor.",
          weight: 65000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            seer_rating: "14",
            hspf: "8.2",
            fuel_type: "electric",
            brand: "Daikin",
            warranty_years: "12",
            compressor_type: "single_stage",
          },
          images: [
            { url: "https://placehold.co/800x600/2c5f7a/ffffff?text=Daikin+DX14SN+Heat+Pump" },
          ],
          options: [{ title: "Tonnage", values: ["1.5 Ton", "2 Ton", "2.5 Ton", "3 Ton"] }],
          variants: [
            {
              title: "1.5 Ton",
              sku: "DAIK-HP-DX14-1.5T",
              options: { Tonnage: "1.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 139900 },
                { currency_code: "gbp", amount: 114900 },
              ],
            },
            {
              title: "2 Ton",
              sku: "DAIK-HP-DX14-2T",
              options: { Tonnage: "2 Ton" },
              prices: [
                { currency_code: "usd", amount: 159900 },
                { currency_code: "gbp", amount: 129900 },
              ],
            },
            {
              title: "2.5 Ton",
              sku: "DAIK-HP-DX14-2.5T",
              options: { Tonnage: "2.5 Ton" },
              prices: [
                { currency_code: "usd", amount: 179900 },
                { currency_code: "gbp", amount: 144900 },
              ],
            },
            {
              title: "3 Ton",
              sku: "DAIK-HP-DX14-3T",
              options: { Tonnage: "3 Ton" },
              prices: [
                { currency_code: "usd", amount: 199900 },
                { currency_code: "gbp", amount: 159900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Furnaces & Boilers ────────────────────────────────────────────
        {
          title: "Trane S9V2 96% AFUE Variable-Speed Gas Furnace",
          handle: "trane-s9v2-96-afue-gas-furnace",
          category_ids: [cat("Furnaces & Boilers")],
          description:
            "The Trane S9V2 is a premium 96% AFUE variable-speed gas furnace built for maximum efficiency and comfort. Features ComfortR™ variable-speed technology for precise temperature control and ultra-quiet operation.",
          weight: 55000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            afue: "96%",
            fuel_type: "natural_gas",
            voltage: "115V",
            brand: "Trane",
            warranty_years: "10",
            stages: "variable_speed",
          },
          images: [
            { url: "https://placehold.co/800x600/2d3748/ffffff?text=Trane+S9V2+Gas+Furnace" },
            { url: "https://placehold.co/800x600/2d3748/ffffff?text=Trane+Furnace+Interior" },
          ],
          options: [{ title: "BTU Output", values: ["60,000 BTU", "80,000 BTU", "100,000 BTU", "120,000 BTU"] }],
          variants: [
            {
              title: "60,000 BTU",
              sku: "TRANE-FURN-S9V2-60K",
              options: { "BTU Output": "60,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 119900 },
                { currency_code: "gbp", amount: 94900 },
              ],
            },
            {
              title: "80,000 BTU",
              sku: "TRANE-FURN-S9V2-80K",
              options: { "BTU Output": "80,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 139900 },
                { currency_code: "gbp", amount: 109900 },
              ],
            },
            {
              title: "100,000 BTU",
              sku: "TRANE-FURN-S9V2-100K",
              options: { "BTU Output": "100,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 159900 },
                { currency_code: "gbp", amount: 124900 },
              ],
            },
            {
              title: "120,000 BTU",
              sku: "TRANE-FURN-S9V2-120K",
              options: { "BTU Output": "120,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 179900 },
                { currency_code: "gbp", amount: 144900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "Carrier Performance 96% AFUE Single-Stage Gas Furnace",
          handle: "carrier-performance-96-afue-gas-furnace",
          category_ids: [cat("Furnaces & Boilers")],
          description:
            "The Carrier Performance 96% AFUE furnace delivers reliable, efficient heating for homes and small businesses. Single-stage operation with a durable aluminized steel heat exchanger and a 10-year limited warranty.",
          weight: 48000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            afue: "96%",
            fuel_type: "natural_gas",
            voltage: "115V",
            brand: "Carrier",
            warranty_years: "10",
            stages: "1",
          },
          images: [
            { url: "https://placehold.co/800x600/3a3a4a/ffffff?text=Carrier+96+AFUE+Furnace" },
          ],
          options: [{ title: "BTU Output", values: ["40,000 BTU", "60,000 BTU", "80,000 BTU"] }],
          variants: [
            {
              title: "40,000 BTU",
              sku: "CARR-FURN-96-40K",
              options: { "BTU Output": "40,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 99900 },
                { currency_code: "gbp", amount: 79900 },
              ],
            },
            {
              title: "60,000 BTU",
              sku: "CARR-FURN-96-60K",
              options: { "BTU Output": "60,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 119900 },
                { currency_code: "gbp", amount: 94900 },
              ],
            },
            {
              title: "80,000 BTU",
              sku: "CARR-FURN-96-80K",
              options: { "BTU Output": "80,000 BTU" },
              prices: [
                { currency_code: "usd", amount: 139900 },
                { currency_code: "gbp", amount: 109900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Thermostats ───────────────────────────────────────────────────
        {
          title: "Ecobee SmartThermostat Premium",
          handle: "ecobee-smartthermostat-premium",
          category_ids: [cat("Thermostats")],
          description:
            "The ecobee SmartThermostat Premium is the smartest thermostat on the market. Features a built-in air quality monitor, occupancy sensor, Alexa/Google Home integration, and a 3.5\" color touchscreen. Compatible with all system types.",
          weight: 500,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            thermostat_type: "smart_wifi",
            compatibility: "multi_stage",
            display: "3.5 inch color touchscreen",
            brand: "Ecobee",
            warranty_years: "3",
            smart_home: "Alexa, Google Home, Apple HomeKit",
          },
          images: [
            { url: "https://placehold.co/800x600/4a90d9/ffffff?text=Ecobee+SmartThermostat" },
            { url: "https://placehold.co/800x600/4a90d9/ffffff?text=Ecobee+App+View" },
          ],
          options: [{ title: "Color", values: ["Black", "Stainless Steel"] }],
          variants: [
            {
              title: "Black",
              sku: "ECOBEE-SMART-PREM-BLK",
              options: { Color: "Black" },
              prices: [
                { currency_code: "usd", amount: 24900 },
                { currency_code: "gbp", amount: 19900 },
              ],
            },
            {
              title: "Stainless Steel",
              sku: "ECOBEE-SMART-PREM-SS",
              options: { Color: "Stainless Steel" },
              prices: [
                { currency_code: "usd", amount: 27900 },
                { currency_code: "gbp", amount: 22900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "Honeywell Home T6 Pro Programmable Thermostat",
          handle: "honeywell-t6-pro-programmable-thermostat",
          category_ids: [cat("Thermostats")],
          description:
            "The Honeywell Home T6 Pro is a straightforward 7-day programmable thermostat with an easy-to-read backlit display. Works with gas, oil, and electric heating systems, as well as central air conditioning.",
          weight: 400,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            thermostat_type: "programmable",
            compatibility: "single_stage",
            display: "backlit LCD",
            brand: "Honeywell",
            warranty_years: "5",
            programming: "7-day",
          },
          images: [
            { url: "https://placehold.co/800x600/5a6a7a/ffffff?text=Honeywell+T6+Pro" },
          ],
          options: [{ title: "Type", values: ["Standard", "With Stages"] }],
          variants: [
            {
              title: "Standard",
              sku: "HON-T6PRO-STD",
              options: { Type: "Standard" },
              prices: [
                { currency_code: "usd", amount: 8900 },
                { currency_code: "gbp", amount: 6900 },
              ],
            },
            {
              title: "With Stages",
              sku: "HON-T6PRO-STAGES",
              options: { Type: "With Stages" },
              prices: [
                { currency_code: "usd", amount: 10900 },
                { currency_code: "gbp", amount: 8900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Filters & Parts ───────────────────────────────────────────────
        {
          title: "FilterBuy MERV 13 Pleated Air Filter",
          handle: "filterbuy-merv-13-pleated-air-filter",
          category_ids: [cat("Filters & Parts")],
          description:
            "FilterBuy MERV 13 pleated air filters capture 98% of particles including dust, pollen, pet dander, smoke, and bacteria. Compatible with all standard HVAC systems. Replace every 60-90 days for optimal performance.",
          weight: 800,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            merv_rating: "13",
            filter_type: "pleated",
            brand: "FilterBuy",
            pack_quantity: "4-pack",
            replacement_interval: "60-90 days",
          },
          images: [
            { url: "https://placehold.co/800x600/8a9a6a/ffffff?text=FilterBuy+MERV+13+Filter" },
          ],
          options: [{ title: "Size", values: ["16x20x1", "16x25x1", "20x20x1", "20x25x1", "20x25x4"] }],
          variants: [
            {
              title: "16x20x1",
              sku: "FILTBUY-M13-16X20X1",
              options: { Size: "16x20x1" },
              prices: [
                { currency_code: "usd", amount: 3200 },
                { currency_code: "gbp", amount: 2500 },
              ],
            },
            {
              title: "16x25x1",
              sku: "FILTBUY-M13-16X25X1",
              options: { Size: "16x25x1" },
              prices: [
                { currency_code: "usd", amount: 3600 },
                { currency_code: "gbp", amount: 2900 },
              ],
            },
            {
              title: "20x20x1",
              sku: "FILTBUY-M13-20X20X1",
              options: { Size: "20x20x1" },
              prices: [
                { currency_code: "usd", amount: 3600 },
                { currency_code: "gbp", amount: 2900 },
              ],
            },
            {
              title: "20x25x1",
              sku: "FILTBUY-M13-20X25X1",
              options: { Size: "20x25x1" },
              prices: [
                { currency_code: "usd", amount: 3900 },
                { currency_code: "gbp", amount: 3100 },
              ],
            },
            {
              title: "20x25x4",
              sku: "FILTBUY-M13-20X25X4",
              options: { Size: "20x25x4" },
              prices: [
                { currency_code: "usd", amount: 5500 },
                { currency_code: "gbp", amount: 4400 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },

        // ── Accessories ───────────────────────────────────────────────────
        {
          title: "R-410A Refrigerant 25 lb Cylinder",
          handle: "r410a-refrigerant-25lb-cylinder",
          category_ids: [cat("Accessories")],
          description:
            "Industry-standard R-410A refrigerant in a 25 lb cylinder. Compatible with most modern residential and light commercial split-system air conditioners and heat pumps. EPA Section 608 certification required for purchase.",
          weight: 12000,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            refrigerant_type: "R-410A",
            weight_lbs: "25",
            brand: "Genetron",
            certification_required: "EPA Section 608",
          },
          images: [
            { url: "https://placehold.co/800x600/c0392b/ffffff?text=R-410A+Refrigerant+25lb" },
          ],
          options: [{ title: "Size", values: ["25 lb"] }],
          variants: [
            {
              title: "25 lb",
              sku: "REFRIG-R410A-25LB",
              options: { Size: "25 lb" },
              prices: [
                { currency_code: "usd", amount: 12900 },
                { currency_code: "gbp", amount: 9900 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
        {
          title: "Universal HVAC Condensate Drain Pan",
          handle: "universal-hvac-condensate-drain-pan",
          category_ids: [cat("Accessories")],
          description:
            "Heavy-duty plastic condensate drain pan for air handlers and evaporator coils. Prevents water damage from condensate overflow. Fits most standard air handler units.",
          weight: 1200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          metadata: {
            material: "heavy_duty_plastic",
            brand: "Diversitech",
            compatibility: "universal",
          },
          images: [
            { url: "https://placehold.co/800x600/6a7a8a/ffffff?text=Condensate+Drain+Pan" },
          ],
          options: [{ title: "Size", values: ["14x14x2 in", "18x18x2 in", "24x24x2 in"] }],
          variants: [
            {
              title: "14x14x2 in",
              sku: "DRAIN-PAN-14X14",
              options: { Size: "14x14x2 in" },
              prices: [
                { currency_code: "usd", amount: 2900 },
                { currency_code: "gbp", amount: 2200 },
              ],
            },
            {
              title: "18x18x2 in",
              sku: "DRAIN-PAN-18X18",
              options: { Size: "18x18x2 in" },
              prices: [
                { currency_code: "usd", amount: 3900 },
                { currency_code: "gbp", amount: 3100 },
              ],
            },
            {
              title: "24x24x2 in",
              sku: "DRAIN-PAN-24X24",
              options: { Size: "24x24x2 in" },
              prices: [
                { currency_code: "usd", amount: 5500 },
                { currency_code: "gbp", amount: 4400 },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel.id }],
        },
      ],
    },
  });
  logger.info("Finished seeding HVAC product data.");

  // ─── Inventory Levels ─────────────────────────────────────────────────────

  logger.info("Seeding inventory levels...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryItems.map((item) => ({
        location_id: stockLocation.id,
        stocked_quantity: 500,
        inventory_item_id: item.id,
      })),
    },
  });
  logger.info("Finished seeding inventory levels.");
  logger.info("HVAC store seed complete.");
}
