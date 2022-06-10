const path = require("node:path");
const fs = require("node:fs/promises");
const packageInfo = require("../package.json");

const content = `// This file is created automatically:
// Do not make changes here as they'll be overwritten.

export const VERSION = "${packageInfo.version}";
`;

fs
    .writeFile(
        path.resolve(__dirname, "../source/version.ts"),
        content
    )
    .catch(err => {
        console.error(err);
        process.exit(1);
    });