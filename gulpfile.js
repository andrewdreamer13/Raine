// подключение плагинов через переменые
const gulp = require('gulp'); // подключение GULP
const scss = require('gulp-sass')(require('sass')); // препроцесор SASS
const rename = require('gulp-rename'); // склеивает и переименовывает файлы CSS
const cleanCss = require('gulp-clean-css'); // сжимает  css код для продакшена
const babel = require('gulp-babel'); // позволяет читать JS код старыми браузерами
const uglify = require('gulp-uglify'); // сжимает JS код для продакшена
const uglifyEs = require('gulp-uglify-es').default; // сжимает JS код для продакшена
const concat = require('gulp-concat'); // склеивает и переименовывает файлы JS наподобии rename css
const sourcemaps = require('gulp-sourcemaps'); // показывает в инспекторе кода файлы из папки src
const autoprefixer = require('gulp-autoprefixer'); // дописывает в CSS префиксы для старых браузеров
const imagemin = require('gulp-imagemin'); // сжимает изображения
const del = require('del'); // удаляет не нужные папки и файлы
const htmlmin = require('gulp-htmlmin'); // сжимает файлы HTML
const size = require('gulp-size'); // показывает размер файлов в терминале
const newer = require('gulp-newer'); // фильтрует файлы чтобы сжимать только новые
const fileinclude = require('gulp-file-include'); // добавляет части html кода в общий index.html.например header footer
const webp = require('gulp-webp'); // переводит изображения в формат webp
const replace = require('gulp-replace'); // меняет маску @img на 'img/'
const browserSync = require('browser-sync').create(); // окно в браузере
const ttf2woff = require('gulp-ttf2woff'); // преобразовывает формат шрифтов
const ttf2woff2 = require('gulp-ttf2woff2'); // преобразовывает формат шрифтов
const groupCssMediaQueries = require('gulp-group-css-media-queries'); //собирает медиа запросы в одну папку
const svgSprite = require('gulp-svg-sprite'); // преобразовывает svg в спрайты
const svgmin = require('gulp-svgmin'); // сжимает svg изображения
const webpack = require('webpack'); //
const webpackStream = require('webpack-stream'); //
const ghPages = require('gulp-gh-pages');// загружает сборку на git hub pages
let isProd = false; // dev by default


// пути от изначальных файлов к файлам назначения
const paths = {
  html: {
    // src: 'src/**/*.html',
     src: 'src/*.html',
     dest: 'dist'
  },
  styles: {
    // src: 'src/styles/**/*.scss',
     src: 'src/styles/style.scss',
    dest: 'dist/css/'
  },
  scripts: {
    //src: 'src/scripts/*.js',
     src: 'src/scripts/main.js',
    dest: 'dist/js/'
  },
  libs: {
    src: 'src/libs/**/*.js',
    dest: 'dist/libs/'
  },

  images: {
    src: 'src/img/**/*.{jpg,jpeg,png,gif,ico,webp,mp4}',
    dest: 'dist/img'
  },

  // videos: {
  //   src: 'src/img/**/*.{mp4}',
  //   dest: 'dist/img/video'
  // },

  svgSprites: {
    src: 'src/img/svg/*.svg',
    dest: 'dist/img/svg'
  },
  fonts: {
    src: 'src/fonts/**/*.*',
    dest: 'dist/fonts/'
  },
  pages: {
    src: 'src/**/*.*',
    dest: './dist/**/*'
  },
 
}


//задача для загрузки  на git hub pages   gulp deploy
gulp.task('deploy', function() {
  return gulp.src(paths.pages.dest)
    .pipe(ghPages());
});

// задача для удаления папки dist
function clean() {
  return del(['dist/*', '!dist/img']) //'!dist/img'  '!dist/fonts'
}

// задача для работы со шрифтами
function fonts() {
  gulp.src(paths.fonts.src)
    .pipe(ttf2woff())
    .pipe(gulp.dest(paths.fonts.dest))
  return gulp.src(paths.fonts.src)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(paths.fonts.dest))
}

// задача для работы со шрифтами без woff
// function fonts() {
//   return gulp.src(paths.fonts.src)
//   .pipe(gulp.dest(paths.fonts.dest))
//   .pipe(browserSync.stream())
// }

// задача для работы с файлами HTML
function html() {
  return gulp.src(paths.html.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(replace(/@img\//g, 'img/'))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(size())
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream())
    
}
// задача для работы со стилями
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(scss({
      outputStyle: 'expanded'
    }).on('error', scss.logError))
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 10 versions"],
      cascade: true
    }))
    .pipe(cleanCss({
      level: 2,
    }))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(size())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

// задача для работы со скриптами
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
       //devtool: !isProd ? 'source-map' : true
    }))
    .pipe(sourcemaps.init())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(uglify())
    .pipe(uglifyEs())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(size())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
    
}

// задача для библиотек
function libs() {
  return gulp.src(paths.libs.src)
    .pipe(gulp.dest(paths.libs.dest))
    .pipe(browserSync.stream())
}

// задача для работы с изображениями
function img() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(webp())
    .pipe(gulp.dest(paths.images.dest))

    .pipe(gulp.src(paths.images.src))
    .pipe(newer(paths.images.dest))
    .pipe(imagemin({
      optimizationLevel: 3,
      interlaced: true,
      progressive: true
    }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
}

//svg sprite
const svgSprites = () => {
  return gulp.src(paths.svgSprites.src)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(replace('&gt;', '>'))

    .pipe(gulp.dest(paths.svgSprites.dest))
}


// наблюдатель
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
 
}

gulp.watch(paths.html.src).on('change', browserSync.reload)
gulp.watch(paths.html.src, html)
gulp.watch(paths.styles.src, styles)
gulp.watch(paths.scripts.src, scripts)
gulp.watch(paths.libs.src, scripts)
gulp.watch(paths.images.src, img)
gulp.watch(paths.svgSprites.src, svgSprites)
gulp.watch(paths.fonts.src, fonts)


// const build = gulp.series(clean, fonts, gulp.parallel(html, styles, scripts, libs, img, svgSprites), watch);
const build = gulp.series(clean, html, fonts, gulp.parallel(styles, scripts, libs, img, svgSprites), watch);
// экспорт задач
exports.clean = clean;
exports.img = img;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;




