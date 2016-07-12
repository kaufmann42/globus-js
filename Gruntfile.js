module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'modules/*.js', 'test/*.js', 'globus.js']
        },
        jsbeautifier: {
            files: ['Gruntfile.js', 'modules/*.js', 'test/*.js', 'globus.js'],
            options: {}
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

    // Jshint Task
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Jsbeautifier Task
    grunt.loadNpmTasks("grunt-jsbeautifier");
};
