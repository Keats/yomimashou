var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");


var assets = [
  "./manifest.json",
  "./src/*.html"
];
var sassFiles = "./style/**/*.scss";

gulp.task("assets", function() {
  return gulp.src(assets)
    .pipe(gulp.dest("./build"));
});

gulp.task("sass", function() {
  return gulp.src(sassFiles)
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./build"))
});


gulp.task("watch", function() {
  gulp.watch(sassFiles, gulp.parallel("sass"));
  gulp.watch(assets, gulp.parallel("assets"));
});
