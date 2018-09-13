//目前的作用：
// 1，构建出app.js到"src/hbuilderApp/concatApp.js"
// 2，配合cooking 一键发布app.js跟app包。并把他们拷贝到/D/coding/HBuilderProjects/jfxh5_hotel_app/dist中

module.exports = function(grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';

	//获取命令行进来的值:grunt deploy --buildTo=xx
	// var buildTo = grunt.option('buildTo');
	// var dist = buildTo ? (buildTo + '/') : 'dist/';

	//流程是这样的:编译css到指定dist/css下 然后autoprefixer是不会生成新文件的 是在原本的文件上修改的
	//编译后的css目录
	var dist = 'dist/';//'static/';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Metadata.
		meta: {
			tempJsPath: 'src/hbuilderApp/',//同目录编码比较方便 //'dist_temp/',
			distPath: dist,
			htmlPath: "html_src/",
			htmlTplPath: "html_tpl/",
			jsPath: 'js/',
			lessPath: 'less/',
			distHtmlPath:"html/",
			distJsPath: dist ,//this.distPath + this.jsPath, //static/js/
			distCssPath: dist + 'css/' //static/css/
		},

		//先转es5 ，
		babel: {
			options: {
				sourceMap: !true,
				presets: ['babel-preset-es2015']
			},
			dist: {
				files: {
					'<%= meta.tempJsPath %>app.js':"src/hbuilderApp/app.js",
				}
			}
		},
        //多个合一起
        concat: {
            hbuildApp: {
                options: {
                    // banner: '<%= banner %>;$.smVersion = "<%= pkg.version %>";'
                },
                src: [

                    'src/hbuilderApp/app.js',//'<%= meta.tempJsPath %>app.js',
                    'node_modules/jfxh5/dist/app.js',
                ],
                dest: '<%= meta.tempJsPath %>concatApp.js'
            }
        },

        //压缩
        // uglify: {
        //     options: {
        //         banner: '/*!\n' +
        //         ' * lkm\n' +
        //         ' */\n',
        //         compress: {
        //             warnings: false
        //         },
        //         mangle: true,
        //         preserveComments: false
        //     },
        //     //针对hbuildApp的
        //     hbuildApp: {
        //         src: '<%= concat.hbuildApp.dest %>',
        //         dest: '<%= meta.distJsPath %>app.min.js'
        //     }
        // },

		shell: {
			cooking:{
				command:'cooking build '
			},
            cpToApp:{
                command:[
                    'rm -rf /D/coding/HBuilderProjects/jfxh5_hotel_app/dist/ ',
                    'cp -rf dist/ /D/coding/HBuilderProjects/jfxh5_hotel_app/dist/ ',
                ].join('&&')
			}

			,
			delete_dist:{
                	command:'rm -rf dist'
			}

		}
	});

	// Load the plugin that provides the "replace" task.
	//	grunt.loadNpmTasks('grunt-string-replace');

	// Load the plugins 代替所有的loadNpmTasks
	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	// grunt.registerTask('build-appjs', ['babel','concat', 'uglify',"shell:cp"]);

	//构建出app.js "src/hbuilderApp/concatApp.js"
    // grunt.registerTask('build-appjs', ['babel','concat']);目前不用babel 交由cooking了
    grunt.registerTask('build-appjs', ['concat']);//目前不用babel 交由cooking了

	//先构建出"src/hbuilderApp/concatApp.js"，然后交由cooking统一打包。
	grunt.registerTask('build', ['build-appjs',"shell:cooking"]);

    // 打包后，顺便发布出去。
    grunt.registerTask('release', ["build",'shell:cpToApp']);

    grunt.registerTask('default', ["release"]);

    //构建基本项目的
    // grunt.registerTask('base', ["shell:delete_dist",'build-appjs']);


	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

}