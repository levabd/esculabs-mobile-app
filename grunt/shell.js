'use strict';

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
        }
    }
};