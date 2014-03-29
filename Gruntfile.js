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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var devTasks = ['clean', 'concat:dev', 'uglify:all'];
  var releaseTasks = ['clean', 'concat:release', 'ngmin:release', 'uglify:release', 'uglify:all'];

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('release', releaseTasks);
};
