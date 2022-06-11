import chalk from "chalk";

const HELP = `
${chalk.bold.blue("Feature Creature")}

    Feature specification and testing library, designed to help ensure that all
    application features are documented, tested and reported on. Use FC to process
    your feature specification document (markdown) when running your tests either
    locally or on a CI server. Fail the tests if there is regression. Report to
    management with the current supported features. Plan new features and prevent
    regression during refactorings.

    FC is a command-line utility:

        feature test --config=fc.json --spec=features.md
            --report=dist/coverage.html

    It supports the following commands:

        ${chalk.bold("test")}                    Run the markdown processor to extract features,
                                and then compare then against the test results
                                from a tool such as Mocha.

    It supports the following flags:

        -v, --version:          Display the application version and exit.
        -h, --help:             Display this usage documentation and exit.
        -c, --config            Specify the config file to use. If not specified
                                FC will attempt to read from the current working
                                directory: "./fc.json".
        -s, --spec              The feature specification file, in markdown
                                format. This is always required.
        -r, --report            The optional, desired HTML output location.
        -t, --test              Path to the test's reported results, such as
                                Mocha's "report.json". It will try to load this
                                path by default, in the current working
                                directory.
`.trim();

export function showHelp(): void {
    console.log(HELP);
}

export function showVersion(version: string): void {
    console.log(`v${version}`);
}
