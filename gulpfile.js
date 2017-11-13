var gulp = require("gulp");
var rework = require("gulp-rework");
var reworkUrl = require("rework-plugin-url");

gulp.task("default", function() {
  return gulp
    .src("dist/css/app.css")
    .pipe(
      rework(
        reworkUrl(function(url) {
          url = "../" + url;
          return url;
        })
      )
    )
    .pipe(gulp.dest("dist/css"));
});
