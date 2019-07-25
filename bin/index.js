#!/usr/bin/env node
'use strict'

// #!/usr/bin/env <= It's called a shebang. It basically tells the system this isn't a shell script and it should use a different interpreter.

console.log('Welcome to Mx\'s gutenberg builder');

const readline = require('readline')
const fsExtra = require('fs-extra');

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
    console.log(process.cwd());
    console.log(`Moving files from ${resourcesDirectory}`);

    await getPluginName()
    await question2()
    const newFolderName = `${pluginPrefix}-${pluginNameInternal}`;
    fsExtra.mkdirSync(`${process.cwd()}/${newFolderName}`);

    registerBlockFunctionName = (pluginNameInternal + '_' + pluginPrefixInternal).replace(/-+/g, '_');
    rl.close()
    console.log(pluginName);
    console.log(pluginNameInternal);
    console.log(pluginPrefix);
    console.log(pluginPrefixInternal);
    console.log(registerBlockFunctionName);
}

main()