var jsFiles = [
  'lib/angular.js',
  'js/*.js',
  'js/**/*.module.js',
  'js/**/*.js'
];

var htmlFiles = {
  'build/layout.html': 'html/layout.html'
};

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean : ['build/'],

    concat: {
      dev: {
        src: jsFiles,
        dest: 'build/scripts.min.js'
      },
      release: {
        src: jsFiles,
        dest: 'build/scripts.concat.js'
      }
    },

    ngmin: {
      release: {
        src: 'build/scripts.concat.js',
        dest: 'build/scripts.ngmin.js'
      }
    },

    uglify : {
      release: {
        src: 'build/scripts.ngmin.js',
        dest: 'build/scripts.min.js'
      },
      all: {
        src: 'lib/modernizr.js',
        dest: 'build/modernizr.min.js'
      }
    },

    sass: {
      all: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/styles.css': 'css/styles.scss'
        }
      }
    },

    csso: {
      all: {
        files: {
          'build/styles.min.css': ['build/styles.css']
        }
      }
    },

    htmlmin: {
      dev: {
        options: {},
        files: htmlFiles
      },
      release: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true
        },
        files: htmlFiles
      }
    },

    watch: {
      dev: {
        files: ['js/**/*', 'css/**/*', 'html/**/*'],
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
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  var devTasks = ['clean', 'concat:dev', 'uglify:all', 'sass:all', 'csso:all', 'htmlmin:dev', 'watch'];
  var releaseTasks = ['clean', 'concat:release', 'ngmin:release', 'uglify:release', 'uglify:all', 'sass:all', 'htmlmin:release', 'csso:all'];

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('release', releaseTasks);
};
