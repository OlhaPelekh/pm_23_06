
const { series } = require("gulp");
var gulp = require("gulp");

gulp.task("testTask", function () {
  console.log("This is a test task!");
});

var sass = require("gulp-sass"),
  cssnano = require("gulp-cssnano"), 
  autoprefixer = require("gulp-autoprefixer"), 

  imagemin = require("gulp-imagemin"), 
  concat = require("gulp-concat"), 
  uglify = require("gulp-uglify"), 
  rename = require("gulp-rename"); 

gulp.task("html", function () {
  return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp
    .src("src/sass/*.sass")
    .pipe(concat("styles.sass"))
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", function () {
  return (
    gulp
      .src("src/js/*.js") 
      .pipe(concat("scripts.js")) 
      .pipe(uglify()) 
      .pipe(rename({ suffix: ".min" })) 
     
      .pipe(gulp.dest("dist/js"))
  ); 
});


gulp.task("imgs", function () {
  return gulp
    .src("src/images/*.+(jpg|jpeg|png|gif)")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/images"));
});


gulp.task("watch", function () {
  gulp.watch("src/*.html", gulp.series("html"));
  gulp.watch("src/js/*.js", gulp.series("scripts"));
  gulp.watch("src/sass/*.sass", gulp.series("sass"));
  gulp.watch("src/images/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});


gulp.task("default", gulp.series("html", "sass", "scripts", "imgs", "watch"));
