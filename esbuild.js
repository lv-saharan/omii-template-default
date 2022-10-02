import pkg from "./package.json" assert {type: "json"}
import esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'
import { sassPlugin } from 'esbuild-sass-plugin'
import { dev } from "local-dev-server"
const [mode] = process.argv.splice(2);
const modulesRoot = './modules'
const modules = []
const excludes = ['node_modules']
fs.readdirSync(modulesRoot).forEach(function (file) {
    let moduleDir = path.join(modulesRoot, file);
    if (!excludes.includes(file) && fs.statSync(moduleDir).isDirectory()) {
        modules.push(moduleDir)
    }
});
console.log("find modules", modules)

let options = {
    jsxFactory: 'h',
    jsxFragment: 'h.f',
    format: "esm",
    bundle: true,
    external: ['/es-lib/*', '/common/*'],
    sourcemap: true,
    minify: true,
    plugins: [sassPlugin({
        type: "css-text"
    })],

}

if (mode == "dev") {
    const { reload } = dev(pkg.localDev.server, pkg.localDev.api)
    modules.forEach(module => {
        let infile = `${module}/src/index.jsx`
        if (fs.existsSync(infile)) {
            let outfile = `${module}/index.js`
            esbuild.build({
                ...options,
                entryPoints: [infile],
                outfile,
                watch:
                {
                    onRebuild(error, result) {
                        if (error) console.error('watch build failed:', error)
                        else {
                            console.log('watch build succeeded:', result)
                            reload("solution rebuild ok")
                        }
                    },
                }
            }).then(result => {
                console.log(`build  ${module} ok!`)
            })
        }
    })

}
else if (mode == "prod") {
    modules.forEach(module => {
        let infile = `${module}/src/index.jsx`
        if (fs.existsSync(infile)) {
            let outfile = `${module}/index.js`
            esbuild.build({
                ...options,
                entryPoints: [infile],
                outfile
            }).then(result => {
                console.log(`build  ${module} ok!`)
            })
        }
    })
}