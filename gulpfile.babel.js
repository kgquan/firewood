//Gulp dependencies
import { src, dest, watch, series, parallel } from 'gulp';
import rename from 'gulp-rename'

/** The destination paths. */
const destPaths = {
    css: './',
}

/** 
 * Prepares .scss files by linting the file and generating the 
 * sourcemaps. */
export const styles = () => {
    return src('static/scss/style.scss')
    .pipe(rename('style.css'))
    .pipe(dest(destPaths.css))
}

