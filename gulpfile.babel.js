//Gulp dependencies
import { src, dest, watch, series, parallel } from 'gulp';

//Utilities
import rename from 'gulp-rename'

//CSS
import stylelint from 'gulp-stylelint';

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
    .pipe(rename('style.css'))
    .pipe(dest(destPaths.css))
}

