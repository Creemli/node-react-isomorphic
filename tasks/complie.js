const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('complie', () => {
	return gulp.src(buildPath.jsServer.src, {base: buildPath.jsServer.base})
		.pipe(babel({
			presets: ['es2015', 'stage-0', 'react'],
			plugins: ["add-module-exports", "transform-runtime", "transform-decorators-legacy"],
		}))
		.pipe(gulp.dest(buildPath.dest));
});
