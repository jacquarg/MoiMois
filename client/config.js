exports.config = {
  // See docs at http://brunch.readthedocs.org/en/latest/config.html.
    "files": {
        "javascripts": {
            "joinTo": {
                'scripts/app.js': /^app/,
                'scripts/vendor.js': /^vendor/
            },
            "order": {
                "before": [
                  'vendor/scripts/jquery-2.0.3.min.js',
                  'vendor/scripts/underscore-1.5.2.min.js',
                  'vendor/scripts/backbone-1.0.0.min.js'
                ]
            }
        },
        "stylesheets": {
            "joinTo": {
                "stylesheets/app.css": /app\/styles\/custom.less/
            }
//            "order": {
//                "before": [
//                    "app/styles/bootsrap.less"
////                    "vendor/styles/bootstrap.css",
////                    "vendor/styles/bootstrap-responsive.css"
//                ]
//            }
        },
        "templates": {
            "joinTo": 'scripts/app.js'
        }
    }
}
