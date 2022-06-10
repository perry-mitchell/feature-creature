import path from "node:path";
import minimist from "minimist";
import { VERSION } from "./version.js";

export interface DerivedConfiguration {
    action: "help" | "test" | "version";
    version?: string;
}

export async function deriveConfiguration(): Promise<DerivedConfiguration> {
    const {
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
    if (s || spec) {
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
        return {
            action: "test"
        };
    }
    return { action: "help" };
}
