'use strict';

function explode(delimiter, string) {
    var emptyArray = {0: ''};

    if (arguments.length != 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined') {
        return null;
    }

    if (delimiter === ''
        || delimiter === false
        || delimiter === null) {
        return false;
    }

    if (typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object') {
        return emptyArray;
    }

    if (delimiter === true) {
        delimiter = '1';
    }

    return string.toString().split(delimiter.toString());
}

var currentPlugins = [];
function getCurrentPlugins(err, stdout, stderr, cb) {
    var stringify = stdout.replace(/(\r\n|\n|\r)/gm, "&&&");

    var arrayWithTrash = stringify.split('&&&');

    arrayWithTrash.forEach(function (item, i, arr) {
        currentPlugins[i] = 'cordova plugin rm ' + explode(' ', arrayWithTrash[i])[0];
    });
    currentPlugins.pop();
    cb();
}

module.exports = function (grunt) {
    return {
        options: {
            stderr: true
        },
        findHtml: {
            command: function(){
                var htmlList = [];
                htmlList = grunt.file.expand({cwd:'project'}, '**/**.html', '!**/_*.html', '!template/main.html', '!template/index.html');

                htmlList.forEach(function(element, index){
                    htmlList[index] = '<ons-template id="' + element + '"><!-- @include ' + element + ' --></ons-template>'
                });

                grunt.file.write('project/_include.html', htmlList.join('\n'));

                return 'echo list ready';
            }
        },
        init: {
            command: function() {
                currentPlugins = [];
                return 'cordova plugins ls'
            },
            options: {
                callback: getCurrentPlugins
            }
        },
        remove: {
            command: function() {
                if (currentPlugins[0] == 'cordova plugin rm No')
                    return 'echo current plugins is empty';
                else
                    return currentPlugins.join('&&');
            }
        },
        install: {
            command: function() {

                var pluginList = grunt.file.readJSON('plugins.json').plugins;
                var commands = [];

                pluginList.forEach(function (item, i, arr) {
                    commands[i] = 'cordova plugins add ' + item;
                });

                return commands.join('&&');
            }
        }
    }
};