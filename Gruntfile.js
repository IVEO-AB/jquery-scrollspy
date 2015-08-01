
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            js: {
                files: ['jquery-scrollspy.js'],
                tasks: ['uglify','jshint'],
                options: {
                    livereload: true,
                },
            }
        },

        // uglify to concat & minify
        uglify: {
            js: {
                files: {
                    'jquery-scrollspy.min.js': 'jquery-scrollspy.js',
                },
                options: {
                    compress: {
                        dead_code: true,
                        drop_console: true,
                        unused: true
                    }
                }
            }
        },

        jshint: {
            all: ['jquery-scrollspy.js']
        }

    });

    // register task
    grunt.registerTask('default', ['watch']);
};
