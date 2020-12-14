//Gulp dependencies
import { src, dest, watch, series, parallel } from 'gulp';

//Utilities
import rename from 'gulp-rename'

//CSS
import sass from '@selfisekai/gulp-sass';
import stylelint from 'gulp-stylelint';

//Both JS and CSS
import sourcemaps from 'gulp-sourcemaps';

/** The destination paths. */
const destPaths = {
    css: './',
}

/** 
 * Prepares .scss files by linting the file and generating the 
 * sourcemaps. */
export const styles = () => {
    return src('static/scss/style.scss')
    .pipe(stylelint({
        configFile: './.stylelintscssrc',
        reporters: [
            { formatter: 'string', console: true }
        ]
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(dest(destPaths.css))
}

