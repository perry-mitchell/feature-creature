#!/usr/bin/env node

import { deriveConfiguration } from "./config.js";
import { showHelp, showVersion } from "./static.js";
import { executeFeatureTests } from "./feature.js";

try {
    const config = await deriveConfiguration();
    switch (config.action) {
        case "test":
            await executeFeatureTests(config);
            break;
        case "version":
            showVersion(config.version);
            break;
        case "help":
            /* falls-through */
        default:
            showHelp();
            break;
    }
} catch (err) {
    console.error(err);
    process.exit(1);
}
