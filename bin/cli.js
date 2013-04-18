#!/usr/bin/env node

/*
THIS IS A COMPLETE COPY OF: https://github.com/yui/yuidoc/blob/master/lib/cli.js
*/

//Require the package
var Y = require('yuidocjs');

var options = Y.Options(Y.Array(process.argv, 2));

Y.log('Starting MYYUIDoc@' + Y.packageInfo.version + ' using YUI@' + Y.version + ' with NodeJS@' + process.versions.node, 'info', 'yuidoc');

var starttime = (new Date).getTime();

options = Y.Project.init(options);

Y.log('Starting YUIDoc with the following options:', 'info', 'yuidoc');
var opts = Y.clone(options);
if (opts.paths && opts.paths.length && (opts.paths.length > 10)) {
    opts.paths = [].concat(opts.paths.slice(0, 5), ['<paths truncated>'], options.paths.slice(-5));
}
Y.log(opts, 'info', 'yuidoc');

if (options.server) {
    Y.Server.start(options);
} else {

    var yuidoc = (new Y.YUIDoc(options));

    /*
        EXTENDING THE DIGESTER FOR CUSTOM SMART TAGS
    */
    Y.DocParser.DIGESTERS['foobar'] = function(tagname, value, target, block) {
        target.foobar = value;
        target.extra = 'THIS IS AN EXTRA TAG, DO AS YOU WILL';
    };

    var json = yuidoc.run();
    options = Y.Project.mix(json, options);

    if (!options.parseOnly) {
        var builder = new Y.DocBuilder(options, json);
        builder.compile(function() {
            var endtime = (new Date).getTime();
            Y.log('Completed in ' + ((endtime - starttime) / 1000) + ' seconds' , 'info', 'yuidoc');
        });
    }
}
