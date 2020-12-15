//Gulp dependencies
import { src, dest, watch, series, parallel } from 'gulp';

//Utilities
import yargs from 'yargs';
import rename from 'gulp-rename'

//CSS
import sass from '@selfisekai/gulp-sass';
import cleanCss from 'gulp-clean-css';
import stylelint from 'gulp-stylelint';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import header from 'gulp-header';

//Both JS and CSS
import sourcemaps from 'gulp-sourcemaps';

/** Defines the opstring for signifying whether a task needs to 
 * run additional steps for production.
 */
const PRODUCTION = yargs.argv.prod;

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
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer])))
    .pipe(gulpif(PRODUCTION, cleanCss({ compatibility:'*'})))
    .pipe(gulpif(PRODUCTION, header(comment, { pkg: pkg })))
    .pipe(gulpif(PRODUCTION, rename('style.css')))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest(destPaths.css))
}

