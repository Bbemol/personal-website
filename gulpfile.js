var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var del = require('del');



// gulp.task('delete', function(){
// 	del([
// 		'css/bundle.css'
// 		])
// });




gulp.task('watch', function(){
	gulp.watch('scss/*.scss',['default']);
});

// gulp.task('clean', function(cb) {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   return del(['./css/bundle.css'], cb);
// });

gulp.task('concat', function(){
 return gulp.src(['./css/*.css'])
		.pipe(concatCss('bundle.css'))
		.pipe(gulp.dest('./css'));
});

gulp.task('sass',function(){
	return gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

gulp.task('default',['sass','concat'],function(){

	

});