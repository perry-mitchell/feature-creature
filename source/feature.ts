import { DerivedConfiguration } from "./config.js";
import { extractFeatures } from "./markdown.js";

export async function executeFeatureTests(config: DerivedConfiguration): Promise<void> {
    const features = await extractFeatures(config.specMD);
}
