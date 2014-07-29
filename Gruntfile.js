module.exports = function (grunt) {

  // grunt.loadTasks('../grunt-excision/tasks');
  grunt.loadNpmTasks('grunt-excision');

  grunt.initConfig({
    excision: {
      utils: {
        options: {
          validate: {
            lang: 'js',     // Language for validating (js|css, default: js)
            tolerant: true  // Write dest file despite the errors? (default: false)
          },
          ranges: {
            'bower_components/jquery/dist/jquery.js': {    // Src file path
              trim: { // nop
                '2.1.1': [ // nop
                  'define(function () { var utils = {};',  // Append string
                  'var ', ['14551', '14585'], ';',         // Decimal offset
                  'var ', ['0x3e28', '0x3e86'], ';',       // Hexademical offset
                  'var tmp = {', [396, 400], '};',         // Line numbers range
                  'utils.trim = tmp.trim;'
                ]
              }
            },
            'bower_components/lodash/dist/lodash.js': {
              defer: [
                // Regexp match
                /function isFunction\([\s\S]*?return[\s\S]*?\}/,
                /function slice\([\s\S]*?return[\s\S]*?\}/,
                'utils.defer = ', /function defer\([\s\S]*?return.*[\r\n]+.*\}/, ';',
                'return utils; });'
              ]
            }
          }
        },
        files: {
          'out/utils.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/lodash/dist/lodash.js'
          ]
        }
      },
      bootstrap: {
        options: {
          validate: {
            lang: 'css'  // Validate CSS syntax
          },
          ranges: {
            'bower_components/bootstrap/dist/css/bootstrap.css': {  // Src file path
              grid: [1420, 2059],                                   // Line numbers range
              table: [2060, 2293]                                   // Line numbers range
            }
          }
        },
        files: {
          'out/bootstrap.css': 'bower_components/bootstrap/dist/css/bootstrap.css'
        }
      },
      experimental: {
        options: {
          validate: true,
          ranges: {
            'bower_components/lodash/dist/lodash.js': [
              '@isNative',                    // AST name
              'var ', '@objectProto',   ';',  // (internal dependency)
              'var ', '@toString',      ';',  // (internal dependency)
              'var ', '@arrayClass',    ';',  // (internal dependency)
              'var ', '@reNative',      ';',  // (internal dependency)
              'var ', '@nativeIsArray', ';',  // (internal dependency)
              'var ', '@isArray',       ';'   // Yeah, finally got it
            ]
          }
        },
        files: {
          'out/experimental.js': 'bower_components/lodash/dist/lodash.js'
        }
      }
    }
  });

  grunt.registerTask('default', 'excision');

};
