#!/usr/bin/env node
'use strict'

// #!/usr/bin/env <= It's called a shebang. It basically tells the system this isn't a shell script and it should use a different interpreter.

// Load the files for the boiler plate => var lib  = path.join(path.dirname(fs.realpathSync(__filename)), '../lib');

console.log('Welcome to Mx\'s gutenberg builder');

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let pluginName = ''; // into the files matches with "__pluginName__"
let pluginNameInternal = ''; // into the files matches with "__pluginNameInternal__"

let pluginPrefix = '';
let pluginPrefixInternal = '';

/** Convert something like: Example 03 editable esnext to example-03-editable-esnext */
const sanitizeForInternal = (str) => {
    let sanitized = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return sanitized.replace(/\s+/g, '-').toLowerCase();
}

const getPluginName = () => {
    return new Promise((resolve, reject) => {
        rl.question('Plugin name 📋 :', (answer) => {
            pluginName = sanitizeForInternal(answer);
            pluginNameInternal = answer;
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Plugin prefix 📋 :', (answer) => {
            pluginPrefix = sanitizeForInternal(answer);
            pluginPrefixInternal = answer;
            resolve()
        })
    })
}

const main = async () => {
    await getPluginName()
    await question2()
    rl.close()
    console.log(pluginName);
    console.log(pluginNameInternal);
    console.log(pluginPrefix);
    console.log(pluginPrefixInternal);
}

// process.cwd()
// __dirname
main()