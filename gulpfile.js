const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

function html() {
  return gulp
    .src("./src/templates/**/*.html")
    .pipe(concat("index.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(concat("main.css"))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src("./src/scripts/**/*.js")
    .pipe(concat("bundle.js"))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src("./src/assets/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
}

function sentinel() {
  gulp.watch("./src/templates/**/*.html", html);
  gulp.watch("./src/styles/**/*.scss", styles);
  gulp.watch("./src/scripts/**/*.js", scripts);
  gulp.watch("./src/assets/**/*", images);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.browser = browser;
exports.sentinel = sentinel;

exports.build = gulp.series(html, styles, scripts, images);
exports.default = gulp.parallel(html, styles, scripts, images, browser, sentinel);
