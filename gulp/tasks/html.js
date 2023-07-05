import fileinclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';

// fileinclude({
//     context: {
//         arr: ['test1', 'test2']
//     }
// });

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Eror: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fileinclude({
        context: {
          arr: ['For Business', 'For Customers'],
          link: ['index.html', 'index.html'],
        },
      }),
    )
    .pipe(app.plugins.replace(/@img\//g, './img/'))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        }),
      ),
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
