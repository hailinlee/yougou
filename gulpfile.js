const gulp = require("gulp"),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    htmlmin = require("gulp-htmlmin"),
    connect = require("gulp-connect");
    
    //启动webserve
    gulp.task("conn", function() {
        connect.server({
            root:"dist",
            livereload:true
        });
      });
       

    //编译sass
    gulp.task("sass",function(){
        gulp.src("src/sass/*.scss")
            .pipe(sass({outputStyle:"compressed"}))
            .pipe(gulp.dest("dist/css"))
            .pipe(connect.reload());
    })
    //压缩html
    gulp.task('htmlmin', function() {
        gulp.src('src/**/*.html')
          .pipe(htmlmin({collapseWhitespace: true}))
          .pipe(gulp.dest('dist'))
          .pipe(connect.reload());
      });
      
      //压缩js
      gulp.task('js',function(){
        gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    });

    //复制lib
    gulp.task("copy-lib",function(){
        gulp.src("src/lib/**/*.*")
            .pipe(gulp.dest("dist/lib"));
    });
        //复制imgs
        gulp.task("copy-imgs",function(){
            gulp.src("src/imgs/**/*.*")
                .pipe(gulp.dest("dist/imgs"));
        });
          //复制mock
          gulp.task("copy-mock",function(){
            gulp.src("src/mock/**/*.*")
                .pipe(gulp.dest("dist/mock"))
                .pipe(connect.reload());
        });      
    //综合复制任务
    gulp.task("copy",["copy-lib","copy-imgs","copy-mock"]);

      //监视任务
      gulp.task("watch",function(){
          gulp.watch("src/sass/*.scss",["sass"]);
          gulp.watch("src/**/*.html",["htmlmin"]);
          gulp.watch("src/js/*.js",["js"]);
          gulp.watch("src/mock/*.json",["copy-mock"])
      });
    //定义默认任务
    gulp.task("default",["sass","htmlmin","js","copy","conn","watch"]);