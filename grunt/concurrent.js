module.exports = {
    options: {
        limit: 4
    },

    one: [
        'sass:app',
        'uglify:app',

        'uglify:vendor',
        'cssmin:vendor',
        'shell:findHtml'
    ],

    two: [
        'sync:public',
        'preprocess',
        'cssmin:app'
    ],

    three: [
        'sync:db',
        'clean:app',
        'autoprefixer:app',
        'autoprefixer:vendor'
    ],

    four: [
        'notify:concurrent'
    ]
};