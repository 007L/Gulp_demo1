var gulp = require('gulp');

var open = require('open');

var $ = require('gulp-load-plugins')();

gulp.task("jstask" , function () {
  return gulp.src('src/js/*.js')
    .pipe($.concat("built.js" , {newLine:";"}))
    .pipe(gulp.dest("dist/js"))
    .pipe($.rename({suffix:".min"}))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe($.connect.reload())
});

gulp.task('lesstask' , function () {
  return gulp.src('src/less/*.less')
    .pipe($.less())
    .pipe(gulp.dest('src/css'))
    .pipe($.connect.reload())
});

gulp.task("csstask" ,['lesstask'], function () {
  return gulp.src('src/css/*.css')
    .pipe($.concat('built.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe($.rename({suffix:".min"}))
    .pipe($.cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe($.connect.reload())
});


gulp.task('htmltask' , function () {
  return gulp.src('main.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"))
    .pipe($.connect.reload())
});



gulp.task("default" , ["jstask" ,"csstask" ,'htmltask']);

//注册live-reload任务
gulp.task('server',['default'], function () {
  //配置服务器选项
  $.connect.server({
    root : 'dist/',//监视的源目标文件路径
    livereload : true,//是否实时刷新
    port : 5000//开启端口号
  })
  open('http://localhost:5000/')

  //确认监视的目标并且绑定相应的任务
  gulp.watch('src/js/*.js', ['jstask'])
  gulp.watch(['src/css/*.css', 'src/less/*.less'], ['csstask'])
});
