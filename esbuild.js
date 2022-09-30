import esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'
//https://github.com/glromeo/esbuild-sass-plugin/
import { sassPlugin } from 'esbuild-sass-plugin'
const rootDir = './modules'
const apps = []
const excludes = ['node_modules']
fs.readdirSync(rootDir).forEach(function (file) {
    let typeDir = path.join(rootDir, file);
    if (!excludes.includes(file) && fs.statSync(typeDir).isDirectory()) {
        fs.readdirSync(typeDir).forEach(file => {
            let appDir = path.join(typeDir, file);
            if (fs.statSync(appDir).isDirectory()) {
                apps.push(appDir)
            }
        })
    }
});
console.log("find apps", apps)

let options = {
    jsxFactory: 'h',
    jsxFragment: 'h.f',
    format: "esm",
    bundle: true,
    external: ['/es-lib/*'],
    sourcemap: true,
    minify: true,
    plugins: [sassPlugin({
        type: "css-text"
    })],
    watch:
    {
        onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
        },
    }


}
let modules = []
apps.forEach(app => {
    console.log(app)
    let infile = `${app}/src/index.jsx`
    if (fs.existsSync(infile)) {
        let outfile = `${app}/index.js`
        modules.push(app)
        let opts = { ...options }
        opts.entryPoints = [infile]
        opts.outfile = outfile
        esbuild.build(opts).then(result => {
            console.log(`watching ${app}...`)
        })
    }


})

