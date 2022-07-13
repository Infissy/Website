
const  path= require("path");
    rootPath = path.normalize(__dirname + '/../../..'),
    clientPath  = path.normalize(rootPath + '/clientOld/'),
    pagePath = path.normalize(rootPath + '/clientOld/pages');

module.exports ={ root: rootPath, pagePath :pagePath,clientPath : clientPath };