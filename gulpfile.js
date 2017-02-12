//组件

let gulp = require('gulp'),
    browserSync = require('browser-sync').create(), //监听刷新
    reload = browserSync.reload,
    ftp = require('gulp-ftp'), // ftp上传
	plumber = require('gulp-plumber'), // 使用plumber 模块可以在纠正错误后继续执行任务
    gutil = require('gulp-util'),
    sass = require('gulp-sass'), // sass
    cleancss = require('gulp-clean-css'), // CSS压缩
    autoprefixer = require("gulp-autoprefixer"),
    uglify = require('gulp-uglify'), // js压缩
    concat = require('gulp-concat'), // 合并文件
    rename = require('gulp-rename'), // 重命名
    clean = require('gulp-clean'), //清空文件夹
    imagemin = require('gulp-imagemin'), //压缩图片
    zip = require('gulp-zip'), //打包文件
    rev = require('gulp-rev-append'), //添加MD5
    htmlmin = require('gulp-htmlmin'), // 压缩html
    git = require('gulp-git'),     //git
    babel = require("gulp-babel"); //ES6 转es5


// =========== 开发构建流程 [单文件输出] ==============

//dev
gulp.task('sass:dev', () => {
    gulp.src('src/sass/*.scss')
		.pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(reload({ stream: true }))
});

// 合并、重命名css
gulp.task('css:dev', ['sass:dev'], () => {
    gulp.src(['src/css/*.css', '!src/css/areaMap.css'])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css/'))
});

// 合并、重命名js
gulp.task('js:dev', () => {
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        })) //ES6转ES5
        .pipe(concat('all.js')) 
        .pipe(gulp.dest('dist/js/'))
        .pipe(reload({ stream: true }))
});

// HTML

gulp.task('html:dev', () => {
    gulp.src('src/tpl/*.html')
        .pipe(gulp.dest('dist'))
});


// 将lib的库文件对应到指定位置
gulp.task('lib:dev', () => {
    gulp.src('./src/lib/*')
        .pipe(gulp.dest('./dist/lib/'));
});



//开发构建
gulp.task('dev', ['css:dev', 'js:dev', 'html:dev', 'img','copyFonts','lib:dev'], () => {
    browserSync.init({
        server: {
            baseDir: "dist" // 设置服务器的根目录为dist目录
        },
        notify: false // 开启静默模式
    });
    // 我们使用gulp的文件监听功能，来实时编译修改过后的文件

    gulp.watch('src/js/*.js', ['js:dev']);
    gulp.watch('src/sass/*.scss', ['sass:dev']);
    gulp.watch('src/tpl/*.html', ['html:dev']);
    gulp.watch('src/fonts/**', ['copyFonts']);
    gulp.watch('src/images/**', ['img']);
    gulp.watch('src/lib/**', ['lib:dev']);
});





// =========== 正式构建 build [单文件输出] ==============

// sass解析
gulp.task('sass', () => {
    gulp.src('src/sass/*.scss')
        //输出为压缩
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sass())
        .pipe(gulp.dest('src/css/'))
});

// 合并、压缩、重命名css

gulp.task('css', ['sass'], () => {
    gulp.src(['src/css/*.css', '!src/css/areaMap.css'])
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: false //是否去掉不必要的前缀 默认：true
        }))
        .pipe(cleancss()) //压缩css
        .pipe(gulp.dest('dist/css'));
});

// 合并，压缩,重命名js文件

gulp.task('js', () => {
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        })) //ES6转ES5
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});



// 压缩HTML

gulp.task('html', () => {
    gulp.src('src/tpl/*.html')
        .pipe(rev())//记得在引用地址后面加后缀，插件原本是ver=@@hash ,这里改成了v=@@hash
        //<link rel="stylesheet" href="css/all.css?v=@@hash">
        //<script src="js/all.js?v=@@hash"></script>
        .pipe(htmlmin({
            removeComments: true, //清除HTML注释
            collapseWhitespace: true, //压缩HTML
            collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('dist'))
});

//压缩图片

gulp.task('img', () => {
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/images'));
});

//字体文件
gulp.task('copyFonts', function () {
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
});

// 清空图片、样式、js

gulp.task('clean', () => {
    gulp.src('dist', { read: false })
        .pipe(clean({ force: true }));
});

// 将bower的库文件对应到指定位置

gulp.task('lib', () => {
    gulp.src('./src/lib/*')
        .pipe(gulp.dest('./dist/lib/'));
});


//打包主体dist 文件夹并按照时间重命名
gulp.task('zip', function(){
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }

    var d=new Date();
    var year=d.getFullYear();
    var month=checkTime(d.getMonth() + 1);
    var day=checkTime(d.getDate());
    var hour=checkTime(d.getHours());
    var minute=checkTime(d.getMinutes());

    return gulp.src('./dist/**')
        .pipe(zip(year+month+day +hour+minute+'.zip'))
        .pipe(gulp.dest('./zip'));
});

//正式构建

gulp.task('build', ['clean','css', 'js', 'img', 'html','copyFonts','lib']);


// ================ 上传 upload ====


gulp.task('upload', () => {
    gulp.src('dist/**')
        .pipe(ftp({
            host: '8.8.8.8', // 远程主机ip
            port: 22, // 端口
            user: 'username', // 帐号
            pass: 'password', // 密码
            remotePath: '/project' // 上传路径，不存在则新建
        }))
        .pipe(gutil.noop())
})