import * as esbuild from "esbuild";
// import eslint from "esbuild-plugin-eslint";
import { rmSync } from "fs";

const commandLine: string[] = process.argv.slice(2);

if (commandLine.length === 0) {
    console.error("Please provide an argument!");
} else if (commandLine[0] === "build") {
    rmSync("dist", { recursive: true, force: true });

    const settings: esbuild.BuildOptions = {
        entryPoints: ["./src/index.ts"],
        outfile: "dist/index.js",
        bundle: true,
        minify: true,
        sourcemap: "external",
        platform: "node",
        target: "node18",
        plugins: [
            // eslint({  // Disabled for production
            //     throwOnError: true,
            // }),
        ],
    };

    await esbuild.build(settings);
}