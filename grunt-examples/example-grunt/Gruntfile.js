module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {	//合并
			domop: {
				src: ['src/ajax.js', 'src/selector.js'],
				dest: 'dest/domop.js'
			}
		},
		uglify: {	//压缩
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dest/domop.js',
				dest: 'dest/domop.min.js'
			}
		}
	});
	//载入concat和uglify插件，分别对于合并和压缩
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//注册任务
	grunt.registerTask('default', ['concat', 'uglify']);
};