module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/action_area.css' : 'scss/action_area.scss'
				}
			}
		},
		cssmin: {
			foo: {
				files: {
					'css/main.min.css' : ['css/action_area.css']
				}
			}
		},
		uncss: {
			dist: {
				files : {
						'css/main.min.css' : 'index.html'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'cssmin:foo']
			}
		} 
	});
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
}