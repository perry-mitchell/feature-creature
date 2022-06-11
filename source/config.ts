import path from "node:path";
import fs from "node:fs/promises";
import minimist from "minimist";
import { VERSION } from "./version.js";

export interface Config {
    mappings: Array<{
        featurePattern: string | [string, number];
        featureUnique?: boolean; // @todo
        specPattern: string | [string, number];
    }>;
}

export interface DerivedConfiguration {
    action: "help" | "test" | "version";
    config?: Config;
    specMD?: string;
    testsReport?: { [key: string]: unknown; };
    version?: string;
}

export async function deriveConfiguration(): Promise<DerivedConfiguration> {
    const {
        _: [
            command
        ],
        c,
        config,
        r,
        report,
        s,
        spec,
        t,
        test,
        v = false,
        version = false
    } = minimist(process.argv.slice(2));
    if (v || version) {
        return {
            action: "version",
            version: VERSION
        };
    }
    if (command === "test") {
        const configFilename = [
            c,
            config,
            "./fc.json"
        ].find(item => !!item);
        const specFilename = s || spec;
        const testsFilename = [
            t,
            test,
            "./report.json"
        ].find(item => !!item);
        const configFile = path.resolve(process.cwd(), configFilename);
        const specFile = path.resolve(process.cwd(), specFilename);
        const testsFile = path.resolve(process.cwd(), testsFilename);
        // Parse files
        const configData = JSON.parse(await fs.readFile(configFile, { encoding: "utf8" })) as Config;
        const specRaw = await fs.readFile(specFile, { encoding: "utf8" });
        const testsReport = JSON.parse(await fs.readFile(testsFile, { encoding: "utf8" }));
        return {
            action: "test",
            config: configData,
            specMD: specRaw,
            testsReport
        };
    } else if (command) {
        throw new Error(`Unrecognised command: ${command}`);
    }
    return { action: "help" };
}
