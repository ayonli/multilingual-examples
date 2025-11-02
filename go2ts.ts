import once from "@ayonli/jsext/once"
import {
    ControlKeys,
    ControlSequences,
    NavigationKeys,
    run,
    writeStdoutSync,
} from "@ayonli/jsext/cli"
import { readFileAsText } from "@ayonli/jsext/fs"
import { parse } from "@std/yaml"
import { FSWatcher, watch } from "chokidar"
import { dirname } from "@ayonli/jsext/path"

const getGoModName: () => Promise<string> = once(async () => {
    const content = await readFileAsText("go.mod")
    const match = content.match(/^module\s+([^\s]+)/m)
    if (!match) {
        throw new Error("Could not find module name in go.mod")
    }
    return match[1]
})

async function getTygoPaths(): Promise<string[]> {
    const goMod = await getGoModName()
    const content = await readFileAsText("tygo.yaml")
    const { packages } = parse(content) as {
        packages: {
            path: string
        }[]
    }

    return packages.map((pkg) => pkg.path.slice(goMod.length + 1))
}

async function go2ts(path: string): Promise<void> {
    writeStdoutSync(ControlSequences.CLR_SCREEN)
    writeStdoutSync(NavigationKeys.HOME)
    writeStdoutSync(ControlKeys.LF)
    console.log(`Detected change in Go file: ${path}`)

    const { code, stderr } = await run("tygo", ["generate"])
    if (code) {
        console.error("Error generating TypeScript definitions from Go models:", stderr)
    } else {
        const dest = dirname(path) + "/index.ts"
        console.log("Successfully generated TypeScript to:", dest)
    }
}

let watcher: FSWatcher | undefined

async function watchGoModels(): Promise<void> {
    if (watcher) {
        console.log("tygo.yaml changed, reloading watcher...")
        await watcher.close()
    }

    const paths = await getTygoPaths()
    watcher = watch(paths, {
        persistent: true,
        awaitWriteFinish: true,
        ignored: (path, stat) => {
            return !!stat?.isFile() && !path.endsWith(".go")
        },
    }).on("change", go2ts)
        .on("unlink", go2ts)
        .on("unlinkDir", go2ts)
        .once("ready", () => {
            console.log("Watching Go model files for changes...")
        })
}

watch("tygo.yaml", {
    persistent: true,
    awaitWriteFinish: true,
}).on("change", watchGoModels)
    .once("ready", watchGoModels)
