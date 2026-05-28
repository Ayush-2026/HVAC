"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initial_data_seed;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
async function initial_data_seed({ container, }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const fulfillmentModuleService = container.resolve(utils_1.ModuleRegistrationName.FULFILLMENT);
    // ─── Sales Channel & API Key ──────────────────────────────────────────────
    logger.info("Seeding store data...");
    const { result: [defaultSalesChannel], } = await (0, core_flows_1.createSalesChannelsWorkflow)(container).run({
        input: {
            salesChannelsData: [
                {
                    name: "Default Sales Channel",
                    description: "Created by HVAC Store seed",
                },
            ],
        },
    });
    const { result: [publishableApiKey], } = await (0, core_flows_1.createApiKeysWorkflow)(container).run({
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
    await (0, core_flows_1.linkSalesChannelsToApiKeyWorkflow)(container).run({
        input: {
            id: publishableApiKey.id,
            add: [defaultSalesChannel.id],
        },
    });
    await (0, core_flows_1.createStoresWorkflow)(container).run({
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
    const { result: regionResult } = await (0, core_flows_1.createRegionsWorkflow)(container).run({
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
    await (0, core_flows_1.createTaxRegionsWorkflow)(container).run({
        input: [
            { country_code: "us", provider_id: "tp_system" },
            { country_code: "gb", provider_id: "tp_system" },
        ],
    });
    logger.info("Finished seeding tax regions.");
    // ─── Stock Location ───────────────────────────────────────────────────────
    logger.info("Seeding stock location data...");
    const { result: stockLocationResult } = await (0, core_flows_1.createStockLocationsWorkflow)(container).run({
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
        [utils_1.Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
        [utils_1.Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
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
        [utils_1.Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
        [utils_1.Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    });
    const usZoneId = fulfillmentSet.service_zones[0].id;
    const ukZoneId = fulfillmentSet.service_zones[1].id;
    await (0, core_flows_1.createShippingOptionsWorkflow)(container).run({
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
    await (0, core_flows_1.linkSalesChannelsToStockLocationWorkflow)(container).run({
        input: { id: stockLocation.id, add: [defaultSalesChannel.id] },
    });
    logger.info("Finished seeding stock location data.");
    // ─── Product Categories ───────────────────────────────────────────────────
    logger.info("Seeding HVAC product categories...");
    const { result: categoryResult } = await (0, core_flows_1.createProductCategoriesWorkflow)(container).run({
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
    const cat = (name) => categoryResult.find((c) => c.name === name).id;
    logger.info("Finished seeding categories.");
    // ─── Products ─────────────────────────────────────────────────────────────
    logger.info("Seeding HVAC product data...");
    await (0, core_flows_1.createProductsWorkflow)(container).run({
        input: {
            products: [
                // ── Air Conditioners ──────────────────────────────────────────────
                {
                    title: "Carrier Performance 16 SEER Central Air Conditioner",
                    handle: "carrier-performance-16-seer-ac",
                    category_ids: [cat("Air Conditioners")],
                    description: "The Carrier Performance series delivers quiet, reliable cooling with a 16 SEER2 efficiency rating. Ideal for residential and light commercial use. Features a two-stage scroll compressor for consistent comfort and energy savings.",
                    weight: 68000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "Goodman's 18 SEER2 two-stage air conditioner provides superior comfort control and energy efficiency. The two-stage operation runs at low capacity most of the time, reducing energy usage and improving humidity control.",
                    weight: 72000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "The Lennox XP21 is one of the most efficient heat pumps available, with up to 21 SEER and 10 HSPF ratings. Variable-speed operation provides precise temperature control and ultra-quiet performance year-round.",
                    weight: 75000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "The Daikin DX14SN is a reliable, affordable heat pump offering 14 SEER efficiency. Perfect as an entry-level replacement unit with broad compatibility and a proven single-stage scroll compressor.",
                    weight: 65000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "The Trane S9V2 is a premium 96% AFUE variable-speed gas furnace built for maximum efficiency and comfort. Features ComfortR™ variable-speed technology for precise temperature control and ultra-quiet operation.",
                    weight: 55000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "The Carrier Performance 96% AFUE furnace delivers reliable, efficient heating for homes and small businesses. Single-stage operation with a durable aluminized steel heat exchanger and a 10-year limited warranty.",
                    weight: 48000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "The ecobee SmartThermostat Premium is the smartest thermostat on the market. Features a built-in air quality monitor, occupancy sensor, Alexa/Google Home integration, and a 3.5\" color touchscreen. Compatible with all system types.",
                    weight: 500,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "The Honeywell Home T6 Pro is a straightforward 7-day programmable thermostat with an easy-to-read backlit display. Works with gas, oil, and electric heating systems, as well as central air conditioning.",
                    weight: 400,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "FilterBuy MERV 13 pleated air filters capture 98% of particles including dust, pollen, pet dander, smoke, and bacteria. Compatible with all standard HVAC systems. Replace every 60-90 days for optimal performance.",
                    weight: 800,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "Industry-standard R-410A refrigerant in a 25 lb cylinder. Compatible with most modern residential and light commercial split-system air conditioners and heat pumps. EPA Section 608 certification required for purchase.",
                    weight: 12000,
                    status: utils_1.ProductStatus.PUBLISHED,
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
                    description: "Heavy-duty plastic condensate drain pan for air handlers and evaporator coils. Prevents water damage from condensate overflow. Fits most standard air handler units.",
                    weight: 1200,
                    status: utils_1.ProductStatus.PUBLISHED,
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
    await (0, core_flows_1.createInventoryLevelsWorkflow)(container).run({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbC1kYXRhLXNlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWlncmF0aW9uLXNjcmlwdHMvaW5pdGlhbC1kYXRhLXNlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFzQkEsb0NBbTdCQztBQXg4QkQscURBS21DO0FBQ25DLDREQWFxQztBQUV0QixLQUFLLFVBQVUsaUJBQWlCLENBQUMsRUFDOUMsU0FBUyxHQUdWO0lBQ0MsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsTUFBTSx3QkFBd0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUNoRCw4QkFBc0IsQ0FBQyxXQUFXLENBQ25DLENBQUM7SUFFRiw2RUFBNkU7SUFFN0UsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sRUFDSixNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUM5QixHQUFHLE1BQU0sSUFBQSx3Q0FBMkIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbkQsS0FBSyxFQUFFO1lBQ0wsaUJBQWlCLEVBQUU7Z0JBQ2pCO29CQUNFLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLFdBQVcsRUFBRSw0QkFBNEI7aUJBQzFDO2FBQ0Y7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sRUFDSixNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUM1QixHQUFHLE1BQU0sSUFBQSxrQ0FBcUIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDN0MsS0FBSyxF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