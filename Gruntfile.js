'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var appConfig = {
    app : require('./bower.json').appPath || 'client/app'
  };

  grunt.initConfig({

    admin:appConfig,

    clean: {
      local: {
        files: [
          {
            dot: true,
            src: [
              '.tmp'
            ]
          }
        ]
      }
    },

    includeSource: {
      options: {
        basePath: 'client/app',
        baseUrl: '/admin/',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" href="{filePath}" />'
          }
        }
      },
      local: {
        files: {
          '<%= admin.app %>/index.html': '<%= admin.app %>/index.tpl.html'
        },
        options: {
          baseUrl: '/admin/'
        }
      },
      dist: {
        files: {
          '<%= admin.dist %>/index.html': '<%= admin.app %>/index.tpl.html'
        }
      }
    },

    wiredep: {
      local: {
        src: [
          '<%= admin.app %>/index.html'
        ],
        ignorePath: /\.\.\//
      },
    }


  });

  grunt.registerTask('build', [
    'clean:local',
    'includeSource:local',
    'wiredep:local'
  ]);


};
