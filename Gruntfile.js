var jsFiles = [
  'lib/angular.js',
  'js/*.js',
  'js/**/*.module.js',
  'js/**/*.js'
];

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean : ['html/build/'],

    concat: {
      dev: {
        src: jsFiles,
        dest: 'html/build/scripts.min.js'
      },
      release: {
        src: jsFiles,
        dest: 'html/build/scripts.concat.js'
      }
    },

    ngmin: {
      release: {
        src: 'html/build/scripts.concat.js',
        dest: 'html/build/scripts.ngmin.js'
      }
    },

    uglify : {
      release: {
        src: 'html/build/scripts.ngmin.js',
        dest: 'html/build/scripts.min.js'
      },
      all: {
        src: 'lib/modernizr.js',
        dest: 'html/build/modernizr.min.js'
      }
    },

    sass: {
      all: {
        options: {
          style: 'compressed'
        },
        files: {
          'html/build/styles.css': 'css/styles.scss'
        }
      }
    },

    csso: {
      all: {
        files: {
          'html/build/styles.min.css': ['html/build/styles.css']
        }
      }
    },

    watch: {
      dev: {
        files: ['js/**/*', 'css/**/*'],
        tasks: ['dev'],
        options: {
          debounceDelay: 250,
        },
      }
    },
  });

  // JavaScript.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // CSS.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-csso');

  // Other.
  grunt.loadNpmTasks('grunt-contrib-watch');

  var devTasks = ['clean', 'concat:dev', 'uglify:all', 'sass:all', 'csso:all', 'watch'];
  var releaseTasks = ['clean', 'concat:release', 'ngmin:release', 'uglify:release', 'uglify:all', 'sass:all', 'csso:all'];

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('release', releaseTasks);
};
