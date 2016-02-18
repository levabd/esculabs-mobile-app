module.exports = {

    app: {
        options: {
            outputStyle: 'nested',
            sourceMap: true
        },
        files: [{
            expand: true,
            src: ['project/template/**/*.sass', 'project/view/**/*.sass'],
            dest: 'cache/css',
            ext: '.css'
        }]
    }
}