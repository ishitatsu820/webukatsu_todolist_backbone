//plug-in
var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');


// gulpタスクの作成
function build(done) {
  browserify({
    entries: ['src/app.js'] // ビルド元のファイルを指定
  }).bundle()
    .pipe(source('bundle.js')) // 出力ファイル名を指定
    .pipe(gulp.dest('dist/')); // 出力ディレクトリを指定
    done();
}


function browser_sync(done) {
  browserSync.init({
    server: {
      baseDir: "./", // 対象ディレクトリ
      index: "index.html" //indexファイル名
    }
  });
  done();
    
}
  
function bs_reload(done) {
  browserSync.reload();
  done();
}
  
exports.build = build;
exports.browser_sync = browser_sync;
exports.bs_reload = browser_sync;


// Gulpを使ったファイルの監視
function watch() {
  gulp.watch('./src/*.js', build);
  gulp.watch("./*.html", bs_reload);
  gulp.watch("./dist/*.+(js|css)", bs_reload);
}
exports.watch = watch;
