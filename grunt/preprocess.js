module.exports = {
    options: {
        root: "app/view",
        context: {
            DEBUG: true
        }
    },
    html: {
        src: 'project/template/index.html',
        dest: 'www/index.html'
    },
    main: {
        src: 'project/template/main.html',
        dest: 'www/main.html'
    }
};