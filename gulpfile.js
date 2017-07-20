/**
*作者：曾灿心
*版本： v1.0.0
*用途：自动化压缩CSS, JS , 自动生成雪碧图
*注意：在配置属于自己的生成环境时候要注意SRC 读取的路径是否正确和 dest 输出的路径
*/

//gulpfile.js
var gulp = require('gulp');
var concat = require('gulp-concat'); // 文件合并
var minifycss = require('gulp-minify-css'); // css 压缩
var rename = require('gulp-rename'); // 文件更名
var watch  = require('gulp-watch');    //文件监听
var notify = require('gulp-notify'); //提示信息
var uglify = require('gulp-uglify'); //压缩JS
var spritesmith = require('gulp.spritesmith');  //图片合成文件

// 合并压缩成雪碧图
gulp.task('spritesmith', function() {
    return gulp.src('./source/img/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的名字
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding: 6,//合并时两个图片的间距
            algorithm: 'top-down' //有五个方向选择有top-down（从上至下）,left-right（从左至右）, diagonal（从左上至右下）, alt-diagonal （从左下至右上）和 binary-tree（二叉树排列） 五种供选择，默认 binary-tree；参考 Layout
        }))
        .pipe(gulp.dest('./dist/img/')); // 输出到
});

// 合并压缩css 文件
gulp.task('minCss', function(){
    return gulp.src('./source/css/*.css') // 可选择的合并也可以写多个指令
    .pipe(concat('index.css')) // 合并为
    .pipe(gulp.dest('/dist/css/')) 
    .pipe(rename({ suffix: '.min' })) // 重新命名
    .pipe(minifycss()) // 压缩
    .pipe(gulp.dest('./dist/css/')) // 输出至
    // .pipe(notify({ message: 'css index is ok' })); //提示信息
});


//压缩js 文件
gulp.task('minJS', function(){
	return  gulp.src('./source/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js/'));
});

 
//合并指令 一次性打包生产
gulp.task('default',['minJS','minCss', 'spritesmith']);

