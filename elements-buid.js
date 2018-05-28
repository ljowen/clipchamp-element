const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/clipchampElement/runtime.js',
        './dist/clipchampElement/polyfills.js',
        './dist/clipchampElement/scripts.js',
        './dist/clipchampElement/main.js',
    ]
    await concat(files, './dist/clipchampElement/clipchamp.js');
    // await fs.copyFile('./dist/clipchampElement/styles.css', 'clipChamp/styles.css')
    // await fs.copy('./dist/clipchampElement/assets/', 'clipChamp/assets/' )

})()