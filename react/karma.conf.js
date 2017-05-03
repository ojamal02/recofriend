module.exports = function(config) {
  config.set({
    // use the PhantomJS browser
    browsers: ['PhantomJS'],

    // use the Jasmine testing framework
    frameworks: ['jasmine'],

    // files that Karma will server to the browser
    files: [
      // use Babel polyfill to emulate a full ES6 environment in PhantomJS
      '../node_modules/babel-polyfill/dist/polyfill.js',
      // entry file for Webpack
      'test/testHelper.js'
    ],

    // before serving test/testHelper.js to the browser
    preprocessors: {
      'test/testHelper.js': [
        // use karma-webpack to preprocess the file via webpack
        'webpack',
        // use karma-sourcemap-loader to utilize sourcemaps generated by webpack
        'sourcemap'
      ]
    },

    // webpack configuration used by karma-webpack
    webpack: {
      // generate sourcemaps
      devtool: 'eval-source-map',
      // enzyme-specific setup
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        loaders: [
          // use babel-loader to transpile the test and src folders
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
          },
          // use isparta-loader for ES6 code coverage in the src folder
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|test)/,
            loader: 'isparta'
          }
        ]
      },

      // relative path starts out at the src folder when importing modules
      resolve: {
        root: path.resolve(__dirname, 'src'),
      }
    },

    webpackMiddleware: {
      // do not output webpack build information to the browser's console
      noInfo: true
    },

    // test reporters that Karma should use
    reporters: [
      // use karma-spec-reporter to report results to the browser's console
      'spec',
      // use karma-coverage to report test coverage
      'coverage'
    ],

    // karma-spec-reporter configuration
    specReporter: {
      // remove meaningless stack trace when tests do not pass
      maxLogLines: 1,
      // do not print information about tests that are passing
      suppressPassed: true
    },

    // karma-coverage configuration
    coverageReporter: {
      // output coverage results to the coverage folder in the project's root
      dir: 'coverage',
      subdir: '.',
      // output coverage results as html
      type: 'html'
    }
  })
}