module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//压缩
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
			},
			common: {
				files: {
					'./src/static/js/base.min.js': [
						"./src/static/js/jquery1.10.js",
						"./src/static/js/public.js"
					],
					'./src/static/js/dialog.min.js': [
						"./src/static/js/dialog.js"
					]
				}
			}
		},
		//压缩css
		cssmin: {
			options: {
				//清除所有的注释
				keepSpecialComments: 0
			},
			compress: {
				files: {
					'./src/static/css/base.min.css': [
						"./src/static/css/global.css"
					],
					'./src/static/css/dialog.min.css': [
						"./src/static/css/dialog.css"
					]
				}
			}
		}
	});

	//载入所依赖的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// 定义默认需要执行的任务
    grunt.registerTask('default', ['uglify', 'cssmin']);
};