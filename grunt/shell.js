'use strict';

var currentPlugins = [];
function getCurrentPlugins(err, stdout, stderr, cb) {
    var stringify = stdout.replace(/(\r\n|\n|\r)/gm, "&&&");

    var arrayWithTrash = stringify.split('&&&');

    arrayWithTrash.forEach(function (item, i, arr) {
        currentPlugins[i] = 'cordova plugin rm ' + arrayWithTrash.split(' ')[0]; //измененная часть
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