import esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'
//https://github.com/glromeo/esbuild-sass-plugin/
import { sassPlugin } from 'esbuild-sass-plugin'
import liveServer from 'live-server'

const port = 8900


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
    external: ['/es-lib/*','/common/*'],
    sourcemap: true,
    minify: true,
    plugins: [sassPlugin({
        type: "css-text"
    })],

}

if (mode == "dev") {
    // var params = {
    //     port: 8900, // Set the server port. Defaults to 8080.
    //     host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    //     root: "/public", // Set root directory that's being served. Defaults to cwd.
    //     open: false, // When false, it won't load your browser by default.
    //     ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    //     file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    //     wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    //     mount: [['/components', './node_modules']], // Mount a directory to a route.
    //     logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    //     middleware: [function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
    // };
    liveServer.start({
        port
    });

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
                        else console.log('watch build succeeded:', result)
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