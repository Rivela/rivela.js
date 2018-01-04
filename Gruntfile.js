
'use strict'

module.exports = function (grunt) {
  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'components/**/*',
            'tests/**/*',
            '*.html'
          ]
        },
        options: {
          server: {
            baseDir: ''
          },
          directory: true
        }
      }
    },
    uglify: {
      dist: {
        options: {
        },
        files: {
          'dist/rivela.min.js': ['dist/rivela.js']
        }
      }
    },
    concat: {
      options: {
      },
      dist: {
        src: ['components/_common.js',
          'components/_helpers/*.js',
          'components/barchart/script.js',
          'components/bubblechart/script.js',
          'components/circlepack/script.js',
          'components/heatmap/script.js',
          'components/lineareachart/script.js',
          'components/mapchart/script.js',
          'components/piechart/script.js',
          'components/treemap/script.js'
        ],
        dest: 'dist/rivela.js'
      }
    },
    version: {
      dist: {
        src: ['dist/rivela.js']
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: {
          'dist/rivela.js': 'dist/rivela.js'
        }
      }
    },
    umd: {
      all: {
        options: {
          src: 'dist/rivela.min.js',
          dest: 'lib/rivela.js'
        }
      }
    },
    copy: {
      main: {
        src: 'components/_common.css',
        dest: 'lib/rivela.css'
      }
    }
  })

  // Actually load this plugin's task(s).
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-version')
  grunt.loadNpmTasks('grunt-browser-sync')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-umd')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['concat:dist', 'version:dist', 'babel:dist', 'uglify:dist', 'copy:main', 'umd'])
  grunt.registerTask('dev', ['browserSync:dev'])
  grunt.registerTask('umde', ['umd'])
}
