module.exports = {

    options: {
        spawn: false,
        livereload: true
    },

    appViews: {
        files: [
            'project/**/*.html'
        ],
        tasks: [
            'shell:findHtml',
            'preprocess',
            'notify:watch'
        ]
    },

    appPublic: {
        files: [
            'project/public/**'
        ],
        tasks: [
            'sync:public',
            'notify:watch'
        ]
    },

    appDb: {
        files: [
            'project/db/**'
        ],
        tasks: [
            'sync:db',
            'notify:watch'
        ]
    },

    appScripts: {
        files: [
            'project/**/*.js'
        ],
        tasks: [
            'uglify:app',
            'notify:watch'
        ]
    },
    vendorScripts: {
        files: [
            'project/vendor/**/*.js'
        ],
        tasks: [
            'uglify:vendor',
            'notify:watch'
        ]
    },

    appStyles: {
        files: [
            'project/template/**/*.sass', 'project/view/**/*.sass'
        ],
        tasks: [
            'sass:app',
            'cssmin:app',
            'clean:app',
            'autoprefixer:app',
            'notify:watch'
        ]
    },

    vendorStyles: {
        files: [
            'project/vendor/**/*.css', 'project/vendor/**/*/sass', 'project/vendor/**/*/scss'
        ],
        tasks: [
            //'sass:vendor',
            'cssmin:vendor',
            'autoprefixer:vendor',
            'notify:watch'
        ]
    }
};
