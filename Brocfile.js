var esTranspiler = require('broccoli-babel-transpiler');
var scriptTree = esTranspiler('src', {
    filterExtensions:['js', 'es6'],
    loose: ['es6.classes'],
    modules: 'umd'
});

module.exports = scriptTree;