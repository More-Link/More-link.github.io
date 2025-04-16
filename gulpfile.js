const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins({
  postRequireTransforms: {
    'sass': function (Sass) {
      const sass = require('sass');
      return Sass(sass);
    },
  },
});
const reload = browserSync.reload;

let dev = !process.env.CI;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
      .pipe(gulp.dest('app/styles'))
      .pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('lib',function () {
    return gulp.src('app/lib/**/**/**/*.js')
        .pipe(gulp.dest('dist/lib'));
});

const glob = require('glob');
const fs = require('fs');
gulp.task('data:pre', () => {
    const DEFAULT_LANG = ['default', 'cn', 'en'];
    const DEFAULT_OBJ = {
        products: {
            finished: [ ],
            unfinished: [ ]
        },
        solutions: {
            hardware: [ ],
            software: [ ]
        }
    };
    const filelist = glob.sync(`${__dirname}/app/data/{product,solution}s/*/*`);
    const _ = require('lodash');
    let obj = { };
    let promiseList = [ ];

    filelist.forEach((filepath) => {
        let ref = filepath.match(/([\w_-]+)[\\\/]([\w_-]+)[\\\/]([\w_-]+)$/);
        let model = ref[1];
        let type = ref[2];
        let lang = ref[3];
        if (obj[lang] == null) {
            obj[lang] = { };
        }
        if (obj[lang][model] == null) {
            obj[lang][model] = { };
        }
        if (obj[lang][model][type] == null) {
            obj[lang][model][type] = [ ];
        }
        let jsonList = glob.sync(`${filepath}/*.json`).map(require);
        obj[lang][model][type] = jsonList;
    });
    // 自动填充缺失的结构
    let ref;
    for(let i in DEFAULT_LANG) {
        let lang = DEFAULT_LANG[i];
        ref = obj[lang];
        if (ref == null) {
            obj[lang] = DEFAULT_OBJ;
            continue;
        }
        for(let model in DEFAULT_OBJ) {
            ref = obj[lang][model];
            if (ref == null) {
                obj[lang][model] = DEFAULT_OBJ[model];
                continue;
            }
            for(let type in DEFAULT_OBJ[model]) {
                ref = obj[lang][model][type];
                if (ref == null) {
                    obj[lang][model][type] = DEFAULT_OBJ[model][type];
                }
            }
        }
    }

    // 合并默认值
    for (let lang in obj) {
        if(lang == 'default')
            continue;
        obj[lang] = _.defaultsDeep(obj[lang], obj.default);
    }

    for (let lang in obj) { for (let model in obj[lang]) {
        let arr = [ ];
        let _obj = { };
        for (let type in obj[lang][model]) { arr.push(type) };
        arr = require('lodash').sortBy(arr);
        for (let type in arr) {
          type = arr[type];
          _obj[type] = obj[lang][model][type];
      }
        obj[lang][model] = _obj;
    }}

    for(let lang in obj) { for(let model in obj[lang]) {
        if(lang == 'default') continue;
        let targetPath = `${__dirname}/app/data/${lang}`;
        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }
        promiseList.push(new Promise((resolve) => {
            let targetFilePath = `${targetPath}/${model}_all.json`;
            let data = JSON.stringify(obj[lang][model]);
            fs.writeFile(targetFilePath, data, resolve);
        }));
    }}
    return Promise.all(promiseList);
});

gulp.task('data', ['data:pre'], () => {
  return gulp.src(['app/data/**/*.json', '!app/data/{product,solution}s'])
      .pipe(gulp.dest('dist/data'));
})

gulp.task('scripts',['data'], () => {
  return gulp.src(['app/scripts/**/*.js'])
    .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe($.wait(500))
    // .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/scripts'))
      .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({stream: true})).on('end', function () {
          gulp.run(['lib']);
      });
});

gulp.task('bowerFiles',()=>{
    return gulp.src('bower.json').pipe($.mainBowerFiles()).pipe(gulp.dest('app/lib'))
})

function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.{html,pug}')
    .pipe($.if(/\.pug$/, $.pug()))
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    // .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('.tmp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.{html,pug}',
    '!app/scripts/**/*.js'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
gulp.task('clean:tmp', del.bind(null, ['.tmp']));

gulp.task('serve', () => {
  runSequence(['clean:tmp', 'wiredep'], ['html', 'styles', 'scripts', 'bowerFiles', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch([
      'app/*.html',
      'app/*.pug',
      'app/layout/*.pug',
      'app/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/**/*.pug', ['html']);
    gulp.watch('app/styles/**/**/**/*.scss', ['styles']);
    gulp.watch('app/data/**/*.json', ['data']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'bowerFiles', 'fonts']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], 'build', resolve);
  });
});
