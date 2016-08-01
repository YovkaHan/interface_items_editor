module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'app_dir/public/css/action_area.css' : 'app_dir/public/scss/action_area.scss',
					'app_dir/public/css/dev_toolbar.css' : 'app_dir/public/scss/dev_toolbar.scss',
					'app_dir/public/css/body.css' : 'app_dir/public/scss/body.scss',
					'app_dir/public/css/my_container.css' : 'app_dir/public/scss/my_container.scss',
				}
			}
		},
		cssmin: {
			foo: {
				files: {
					'app_dir/public/css/main.min.css' : ['app_dir/public/css/action_area.css', 'app_dir/public/css/dev_toolbar.css', 'app_dir/public/css/body.css', 'app_dir/public/css/my_container.css']
				}
			}
		},
		uncss: {
			dist: {
				files : {
						'app_dir/public/css/main.min.css' : 'app_dir/index.html'
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