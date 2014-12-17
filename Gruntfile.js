module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        tag: {
            banner: '/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * <%= pkg.title %>\n' +
                ' * <%= pkg.url %>\n' +
                ' * @author <%= pkg.author %>\n' +
                ' * @version <%= pkg.version %>\n' +
                ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                ' */\n'
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            vendors_footer: {
                files:{
                    "dist/js/footer.min.js" : [ "js/lib/masonry/dist/masonry.pkgd.min.js"]
                }
            },
            vendors_head: {
                files:{
                    "dist/js/modernizr.min.js" : [ "js/lib/modernizr/modernizr.js"]
                }
            }
            /*
            vendors_normalize: {
                files:{
                    "dist/css/normalize.min.css" : "js/lib/normalize.css/normalize.css"
                }
            }
            */
        },
        copy: {
            main: {
                files: [
                    { src: ['js/lib/normalize.css/normalize.css'], dest: 'dist/css/normalize.css', filter: 'isFile'},

                ]
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    banner: '<%= tag.banner %>',
                    compass: true
                },
                files: {
                    'dist/css/style.css': 'scss/style.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    'dist/css/style.css': 'scss/style.scss'
                }
            }
        },
        watch: {
            sass: {
                files: 'scss/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'copy', 'sass:dev', 'watch']);

};