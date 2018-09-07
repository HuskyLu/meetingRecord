module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'app/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},

		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					args: [],
					nodeArgs: [],
					ignore: ['README.md', 'node_modules/**', '.DS_Store', 'public/**'],
					ext: 'js',
					watch: ['./'],
					delayTime: 1000,
					env: {
						PORT: 4567
					},
					cwd:__dirname
				}
			}
		},

		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')

	grunt.option('force', true)
	grunt.registerTask('default', ['concurrent'])
}