// 载入外挂
var gulp = require('gulp');
var fileincluder = require('gulp-file-includer');
var fileinclude = require('gulp-file-include');
// var sass = require('gulp-sass');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
// var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
// var jshint = require('gulp-jshint');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
// var livereload = require('gulp-livereload');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var cssnano = require('gulp-cssnano');
// var imagemin = require('gulp-imagemin');
// var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
//var chinese2unicode = require('gulp-chinese2unicode');
var str2hex = require('gulp-str2hex');
// var changed = require('gulp-changed');
var debug = require('gulp-debug');
var plumber = require('gulp-plumber');

var mockServer = require('gulp-mock-server')
// 添加版本号
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var sourceURL = {
    'dev': {
        'css': [
            'dev/**/css/**/*'
        ],
        'js': [
            'dev/**/js/**/*'
        ],
        'images': [
            'dev/**/images/**/*'
        ],
        'source': [
            'dev/**/source/**/*'
        ]
    },
    'dist': {
        'css': [
            'dist/**/css/**/*'
        ],
        'js': [
            'dist/**/js/**/*'
        ],
        'images': [
            'dist/**/images/**/*'
        ],
        'source': [
            'dist/**/source/**/*'
        ]
    },
    'view': {
        'css': [
            'view/**/css/**/*'
        ],
        'js': [
            'view/**/js/**/*'
        ],
        'images': [
            'view/**/images/**/*'
        ],
        'source': [
            'view/**/source/**/*'
        ]
    }
}

gulp.task('html', function() {
    return gulp.src(['dev/*.htm', 'dev/*.html'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('fileinclude', function(){
    gulp.src(['./dev/*.html', '!dev/include/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './dev/include'
        }))
        .pipe(gulp.dest('./dist'));
})

gulp.task('fileincluder-html', function() {
    return gulp.src(['dev/ *.htm', 'dev/ *.html'])
        .pipe(fileincluder({
            prefix: '@@',
            basepath: './file'
        }))
        .pipe(gulp.dest('dist/include'));
});

gulp.task('csslib', function() {
    return gulp.src(['dev/**/lib/**/*.css'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function() {
    return gulp.src(['dev/**/*.css', 'dev/**/*.scss', '!dev/**/lib/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(plumber())
        /*outputStyle: nested, expanded, compact, compressed*/
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'));
});
gulp.task('less', function () {
    var init = function() {
        gulp.src(['dev/**/*.css', '!dev/**/lib/**/*.css'])
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/'));
        gulp.src('dev/**/*.less')
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(less())
            .pipe(cleanCSS({compatibility: 'ie7'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist/'));
    }
    return init();
});

gulp.task('styles', function() {
    runSequence('less', 'csslib');
});

// 检查js
// gulp.task('lint', function() {
//   return gulp.src('dev/**/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(notify({ message: 'lint task ok' }));
// });

//lib文件输出
gulp.task('jslib', function() {
    return gulp.src(['dev/**/*.js', 'dev/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
    runSequence('fileincluder-js', 'fileincluder-js-uncompress', 'jslib');
});

gulp.task('js-debug', function() {
    runSequence('fileincluder-js-debug', 'jslib');
});

gulp.task('fileincluder-js', function() {
    return gulp.src(['dev/**/*.js', '!dev/**/lib/**/*.js', '!dev/**/uncompress/**/*.js', '!dev/**/uncompress-splice/**/*.js'])
        .pipe(babel())
        .pipe(fileincluder({
            prefix: '@@',
            basepath: './'
        }))
        .pipe(sourcemaps.init())
        .pipe(plumber())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('fileincluder-js-debug', function() {
    return gulp.src(['dev/**/*.js', '!dev/**/lib/**/*.js', '!dev/**/uncompress/**/*.js'])
        .pipe(babel())
        .pipe(fileincluder({
            prefix: '@@',
            basepath: './'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('fileincluder-js-uncompress', function() {
    return gulp.src('dev/**/uncompress-splice/**/*.js')
        .pipe(babel())
        .pipe(fileincluder({
            prefix: '@@',
            basepath: './'
        }))
        .pipe(gulp.dest('dist/'));
});

//js功能集合
gulp.task('scripts', function() {
    gulp.src('dev/**/*.js')
        .pipe(babel())
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('dist/'))
});

gulp.task('scripts-debug', ['js-debug'], function() {
});

gulp.task('images', function() {
    return gulp.src('dev/**/images/**/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('source', function() {
    return gulp.src('dev/**/source/**/*')
        .pipe(gulp.dest('dist/'));
});

// 中文转码
gulp.task('str2hex', function() {
    return gulp.src(['dist/**/*.js', '!dist/**/lib/**/*.js', '!dist/**/uncompress/**/*.js', '!dist/**/uncompress-splice/**/*.js'])
        .pipe(plumber())
        .pipe(str2hex())
        .pipe(gulp.dest('view/'));
});


gulp.task('revCss', function(){
    return gulp.src(['dist/css/*.css','!dist/**/*.css.map'])
                .pipe(rev())
                .pipe(rev.manifest())
                .pipe(gulp.dest('./dist/rev/css'))
})
gulp.task('revJs', function(){
    return gulp.src(['dist/js/*.js','!dist/**/*.js.map'])
                .pipe(babel())
                .pipe(rev())
                .pipe(rev.manifest())
                .pipe(gulp.dest('dist/rev/js'))
})
//Html替换css、js版本
gulp.task('revHtml',function(){
    return gulp.src(['dist/rev/**/*.json','dist/*.html'])
           .pipe(revCollector())
           .pipe(gulp.dest('dist'));
})

// 启动服务器
gulp.task("connect", function() {
    return connect.server({
        root : "dev",
        livereload : true
    });
});

// 最终打包到view文件夹
gulp.task('cdn', function(){
    gulp.src('dist/**/images/**/*')
        // .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('view/'))
        .on('end', function() {
            setTimeout(function() {
                gulp.start('str2hex');
            }, 1000);
        });
});

gulp.task('clean-dev', function() {
    return gulp.src(['dist/*', '!/*/.svn/*'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-cdn', function() {
    return gulp.src(['view/*', '!/*/.svn/*'], {
            read: false
        })
        .pipe(clean());
});

// 构建一次
gulp.task('dev', ['clean-dev'], function() {
    // runSequence(['images', 'source', 'styles', 'html',  'scripts'], 'fileinclude',['revCss' ,'revJs'],'revHtml');
    runSequence(['images', 'source', 'styles', 'html',  'scripts'], 'fileinclude');
    console.log('dev mode');
});

// 构建一次，不压缩js
gulp.task('dev-debug', ['clean-dev'], function() {
    runSequence('images', 'source', 'styles', 'scripts-debug', 'fileinclude');
    console.log('dev mode');
});

// 构建一次并替换cdn
gulp.task('dev-cdn', function() {
    runSequence('clean-cdn', 'cdn');
    console.log('dev cdn mode');
});

// 监视修改
gulp.task('listen', function() {
    gulp.watch('dev/**/*.css', ['less']);
    gulp.watch('dev/**/*.less', ['less']);
    gulp.watch('dev/**/*.js', ['scripts']);
    gulp.watch('dev/**/images/**/*', ['images']);
    gulp.watch('dev/**/source/**/*', ['source']);
    gulp.watch(['dev/**/*.htm', 'dev/**/*.html'], ['fileinclude']);
});

gulp.task('listen-debug', function() {
    gulp.watch('dev/**/*.css', ['less']);
    gulp.watch('dev/**/*.less', ['less']);
    gulp.watch('dev/**/*.js', ['scripts-debug']);
    gulp.watch('dev/**/images/**/*', ['images']);
    gulp.watch('dev/**/source/**/*', ['source']);
    gulp.watch(['dev/**/*.htm', 'dev/**/*.html'], ['fileinclude']);
});

// 以监视模式开发
gulp.task('watch', ['dev', 'listen'], function() {
    console.log('watch mode');
});

// 以监视模式开发，不压缩js
gulp.task('watch-debug', ['dev-debug', 'listen-debug'], function() {
    console.log('watch mode');
});

//监视修改+reload
gulp.task('live', ['connect', 'listen'], function() {
    console.log('live mode');
});

gulp.task('default', function() {
    console.log('FUCK IE!');
});

// mock服务
gulp.task('mock', function() {
    gulp.src('.')
        .pipe(mockServer({
            port: 8090,
            allowCrossOrigin: true,
            host: '172.16.0.26'
        }))
})

// 启用反向代理
// http://blog.csdn.net/xyjawq1/article/details/54235245
var proxy = require('http-proxy-middleware');
gulp.task('dev-proxy', function() {
    connect.server({
        root: './',
        port: 1000,
        middleware: function(connect, opt) {
            return [
                proxy('/', {
                    target: 'http://localhost:8090',
                    changeOrigin: true,
                    secure:false,
                    cookieDomainRewrite:{

                    }
                }),
            ]
        }

    });
});
