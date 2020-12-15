//Gulp dependencies
import { src, dest, watch, series, parallel } from 'gulp';

//Utilities
import rename from 'gulp-rename'

//CSS
import sass from '@selfisekai/gulp-sass';
import cleanCss from 'gulp-clean-css';
import stylelint from 'gulp-stylelint';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import header from 'gulp-header';

//Both JS and CSS
import sourcemaps from 'gulp-sourcemaps';

/** The destination paths. */
const destPaths = {
    css: './',
}

/** Creates a comment heading at the top of the .css file, as 
 * mandated by Wordpress. This uses package.json data.
 */
let pkg = require('./package.json');
pkg.name = pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1);
const comment = [
    '/**',
    ' * Theme Name: <%= pkg.name %>',
    ' * Description: <%= pkg.description %>',
    ' * Author: <%= pkg.author %>',
    '*/',
    ''
].join('\n');

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
    .pipe(postcss([autoprefixer]))
    .pipe(cleanCss({ compatibility:'*'}))
    .pipe(header(comment, { pkg: pkg }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write())
    .pipe(dest(destPaths.css))
}

