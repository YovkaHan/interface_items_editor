module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/base.css' : 'scss/base.scss',
					'css/microsoft_nav.css' : 'scss/microsoft_nav.scss',
					'css/drop_box_hero.css' : 'scss/drop_box_hero.scss',
					'css/invision_signin.css' : 'scss/invision_signin.scss',
					'css/oculus_div.css' : 'scss/oculus_div.scss',
					'css/apple_footer.css' : 'scss/apple_footer.scss'
				}
			}
		},
		cssmin: {
			foo: {
				files: {
					'css/main.min.css' : ['css/base.css', 'css/microsoft_nav.css', 'css/drop_box_hero.css', 'css/invision_signin.css', 'css/oculus_div.css', 'css/apple_footer.css']
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