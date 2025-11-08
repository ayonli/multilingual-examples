import {
    ControlKeys,
    ControlSequences,
    NavigationKeys,
    run,
    writeStdoutSync,
} from "@ayonli/jsext/cli"
import { readDir, stat } from "@ayonli/jsext/fs"
import { basename, dirname, join } from "@ayonli/jsext/path"
import { try_ } from "@ayonli/jsext/result"
import { watch } from "chokidar"
import process from "node:process"
import { getWatchPaths, isReservedPath } from "./2ts"

async function generate(filePath: string): Promise<void> {
    const { ok, error, value: stats } = await try_(stat(filePath))
    if (!ok) {
        console.error("Error: ", error)
        process.exit(1)
    }

    if (stats.kind === "file") {
        await generateForFile(filePath)
    } else {
        const files = readDir(filePath, { recursive: true })

        for await (const e of files) {
            if (!e.relativePath.endsWith(".py") || isReservedPath(e.relativePath)) {
                continue
            }

            const src = join(filePath, e.relativePath)
            await generateForFile(src)
        }
    }
}

async function generateForFile(filePath: string): Promise<void> {
    const outputPath = dirname(filePath) + "/" + basename(filePath, ".py") + ".ts"
    const { code, stderr } = await run("uv", [
        "run",
        "pydantic2ts",
        "--module",
        filePath,
        "--output",
        outputPath,
    ])

    if (code) {
        console.error("Error generating TypeScript definitions from Pydantic models:", stderr)
        process.exit(1)
    } else {
        console.log("Successfully generated TypeScript to:", outputPath)
    }
}

async function handleFileChange(path: string): Promise<void> {
    writeStdoutSync(ControlSequences.CLR_SCREEN)
    writeStdoutSync(NavigationKeys.HOME)
    writeStdoutSync(ControlKeys.LF)
    console.log(`Detected change in Python file: ${path}`)

    await generateForFile(path)
}

async function startWatchMode(): Promise<void> {
    const paths = await getWatchPaths("py2ts")
    const _watcher = watch(paths, {
        persistent: true,
        awaitWriteFinish: true,
        ignored: (path, stat) => {
            if (!stat?.isFile() || !path.endsWith(".py") || isReservedPath(path)) {
                return true
            } else {
                return false
            }
        },
    }).on("change", handleFileChange)
        .on("unlink", handleFileChange)
        .on("unlinkDir", handleFileChange)
        .once("ready", () => {
            console.log("Watching Python model files for changes...")
        })

    console.log("Starting in watch mode...")
}

function printUsage(): void {
    console.log("Usage:")
    console.log("  py2ts <file.py>     - Generate TypeScript definitions for a specific file")
    console.log(
        "  py2ts <dir>         - Generate TypeScript definitions for all files in directory",
    )
    console.log("  py2ts --watch       - Start watch mode")
}

async function main(): Promise<void> {
    const args = process.argv.slice(2)
    const firstArg = args.at(0)

    if (!firstArg || firstArg === "--help" || firstArg === "-h") {
        printUsage()
    } else if (firstArg === "--watch" || firstArg === "-w") {
        startWatchMode()
    } else {
        await generate(firstArg)
    }
}

main()
