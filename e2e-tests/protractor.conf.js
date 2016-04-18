exports.config = {

    seleniumAddress: 'http://localhost:9515',

    specs: [
        '*.js'
    ],

    capabilities: {
        'browserName': 'phantomjs'
    },

    baseUrl: 'http://localhost:80/#/',

    framework: 'jasmine',

};
