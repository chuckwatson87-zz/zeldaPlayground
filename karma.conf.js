"use strict";
const path = require('path');
const project = require('./aurelia_project/aurelia.json');
const CLIOptions = require('aurelia-cli').CLIOptions;

const externalVendorFiles = require('./test/tdd-resources/karma-vendor-files.json');

let tdd = CLIOptions.hasFlag('source');
let coverage = CLIOptions.hasFlag('coverage');

let testSrc = [];
let files = [];
let exclude = [];
let preprocessors = {};
let proxies = {};
let babelPreprocessor = { options: mergeObject(Object.assign({}, project.transpiler.options), project.unitTestRunner.babelOptions) };

function mergeObject(original, toMerge) {
  for (let key in toMerge) {
    let value = toMerge[key];
    if (original[key]) { //If the option exists already, try and merge
      if (Array.isArray(value)) {
        original[key] = original[key].concat(value);
      } else if (typeof value === 'string') {
        original[key] = value;
      } else if (typeof value === 'object') {
        mergeObject(original[key], value);
      }
      else {
        original[key] = value;
      }
    } else { //Add it to the options
      original[key] = value;
    }
    return original;
  }
}

if (tdd) {
  testSrc = [
    { pattern: 'test/unit/setup.js', included: false },
    { pattern: 'test/unit/resources/**/*.*', included: false, watch: false },
    { pattern: project.unitTestRunner.source, included: false },
    { pattern: 'scripts/text.js', included: false },
    'test/aurelia-karma.js'
  ];

  let appSrc = [
      { pattern: project.markupProcessor.source, included: false },
      { pattern: 'src/**/*!(.test).js', included: false}// project.transpiler.source[0], included: true },
  ];

    files = ['node_modules/requirejs/require.js', 'test/tdd-resources/karma-require-config.js'].concat(externalVendorFiles).concat(testSrc).concat(appSrc);
    //console.log(files);
    exclude = ['node_modules/**/*.{test,Test,spec,Spec}.js']; // Node modules sometimes publish their test files, we want to exclude any test file that might be caught up in our tests
    preprocessors = {
        //[project.unitTestRunner.source]: [project.transpiler.id], //Test files are already under the src folder
        [project.transpiler.source]: [project.transpiler.id], //Since we are now including source code, we need babel to transpile our source files on the fly
        ['test/unit/setup.js']: [project.transpiler.id],
        ['test/unit/resources/images/sprites.js']: [project.transpiler.id],
        ['test/data/**/*.js']: [project.transpiler.id]
    };

    proxies = {
        '/src/': '/base/src/'
    };

} else {

    testSrc = [
      { pattern: 'test/resources/**/*.svg', included: false, watch: false },
      { pattern: 'src/resources/**/*.svg', included: false, watch: false },
      { pattern: project.unitTestRunner.source, included: false }, //"source": "src/**/*.spec.js" // "source": "test/unit/**/*.js"
      { pattern: 'test/unit/setup.js', included: false },
      { pattern: 'wwwroot/dist/**/*.map', included: false },
      'test/aurelia-karma.js'
    ];

    let output = project.platform.output;
    let appSrc = project.build.bundles.map(x => path.join(output, x.name));
    let entryIndex = appSrc.indexOf(path.join(output, project.build.loader.configTarget));
    let entryBundle = appSrc.splice(entryIndex, 1)[0];
    //let aureliaIndex = appSrc.indexOf(path.join(output, project.build.loader.aureliaTarget));
    //let aureliaBundle = appSrc.splice(entryIndex, 1)[0];
    files = [entryBundle].concat(testSrc).concat(appSrc);

    preprocessors = {
          [project.unitTestRunner.source]: [project.transpiler.id], //"source": "src/**/*.spec.js" // "source": "test/unit/**/*.js"
          ['test/unit/setup.js']: [project.transpiler.id],
          ['test/NavigationInstructionStub.js']: [project.transpiler.id],
          ['test/RouterStub.js']: [project.transpiler.id],
          ['test/data/**/*.js']: [project.transpiler.id]
    };
    proxies = {
        '/dist/': '/base/wwwroot/dist/'
    };
}

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine-jquery', project.testFramework.id, 'jasmine-matchers'],
        files: files,
        exclude: exclude,
        preprocessors: preprocessors,
        'babelPreprocessor': babelPreprocessor,
        proxies: proxies,
        reporters: ['progress'],
        port: 9876,
        waitSeconds: 0,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
