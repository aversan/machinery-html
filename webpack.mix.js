const mix = require('laravel-mix');

require('laravel-mix-tailwind');
require('laravel-mix-purgecss');


const tailwindcss = require('tailwindcss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/frontend/js/app.js')
   
   // .postCss('resources/css/app.css', 'public/css')
   // .tailwind('./tailwind.config.js')
    // .styles(['public/css/app.css','public/css/bootstrap.css'],'public/css/admin.css');

mix.sass('resources/scss/main.scss', 'public/frontend/css/style.css')
  .options({
    processCssUrls: false,
    postCss: [ tailwindcss('./tailwind.config.js') ],
  })

// if (mix.inProduction()) {
//   mix
//    .version()
//    // .purgeCss();
// }
