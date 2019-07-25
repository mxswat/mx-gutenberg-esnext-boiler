#!/usr/bin/env node
'use strict'

// #!/usr/bin/env <= It's called a shebang. It basically tells the system this isn't a shell script and it should use a different interpreter.

console.log('Welcome to Mx\'s gutenberg builder');

const readline = require('readline')
const fsExtra = require('fs-extra');
const replace = require('replace-in-file');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let pluginName = ''; // into the files matches with "__pluginName__"
let pluginNameInternal = ''; // into the files matches with "__pluginNameInternal__"

let pluginPrefix = '';
let pluginPrefixInternal = '';

let registerBlockFunctionName = '';

/** Convert something like: Example 03 editable esnext to example-03-editable-esnext */
const sanitizeForInternal = (str) => {
    let sanitized = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return sanitized.replace(/\s+/g, '-').toLowerCase();
}

const getPluginName = () => {
    return new Promise((resolve, reject) => {
        rl.question('Plugin name 📋 :', (answer) => {
            pluginNameInternal = sanitizeForInternal(answer);
            pluginName = answer;
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Plugin prefix 📋 :', (answer) => {
            pluginPrefixInternal = sanitizeForInternal(answer);
            pluginPrefix = answer;
            resolve()
        })
    })
}

const main = async () => {
    // test in
    const builderDirectory = __dirname.replace('bin', '');
    const resourcesDirectory = builderDirectory + 'resources';
    console.log(`Moving files from ${resourcesDirectory}`);

    await getPluginName();
    await question2();

    async function copyFiles() {
        try {
            await fsExtra.copy(resourcesDirectory, process.cwd() + `/${pluginPrefixInternal}-${pluginNameInternal}`);
            console.log('Copied files')
        } catch (err) {
            console.error(err)
        }
    }

    await copyFiles()

    const results = replace.sync({
        files: process.cwd() + `/${pluginPrefixInternal}-${pluginNameInternal}/*`,
        from: [
            /__pluginName__/g,
            /__pluginNameInternal__/g,
            /__pluginPrefix__/g,
            /__pluginPrefixInternal__/g,
            /__registerBlockFunctionName__/g
        ],
        to: [
            pluginName,
            pluginNameInternal,
            pluginPrefix,
            pluginPrefixInternal,
            registerBlockFunctionName
        ],
    });

    console.log(results)

    registerBlockFunctionName = (pluginNameInternal + '_' + pluginPrefixInternal).replace(/-+/g, '_');
    rl.close();

    // console.log(pluginName);
    // console.log(pluginNameInternal);
    // console.log(pluginPrefix);
    // console.log(pluginPrefixInternal);
    // console.log(registerBlockFunctionName);
}

main()