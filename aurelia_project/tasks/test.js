import gulp from 'gulp';
import path from 'path';
import fs from 'fs';

import sass from 'gulp-sass';
import through from 'through2';
import open from 'gulp-open';

import {Server as Karma} from 'karma';
import {CLIOptions, build} from 'aurelia-cli';

import project from '../aurelia.json';

//These are the tasks that are run in the `build.js` file
import transpile, {transpileForTestCoverage} from './transpile';
import processMarkup from './process-markup';
import processImages from './process-images';

let unit;

let source = CLIOptions.hasFlag('source');
let coverage = CLIOptions.hasFlag('coverage');
let watch = CLIOptions.hasFlag('watch');

if (source) {
    unit = gulp.series(
      readProjectConfiguration,
      gulp.parallel(
        transpile,
        processMarkup
      ),
      createLoaderConfig,
      function (done) {
          runDefaultTests(done);
      }
    );
} else if (coverage && !source && !watch) {
    unit = gulp.series(
      readProjectConfiguration,
      gulp.parallel(
        transpileForTestCoverage,
        processMarkup
      ),
      writeBundles,
      function (done) {
         runTestsWithCoverage(done)
      },
      openCoverageFile
    )

} else {
    unit = runDefaultTests;
}


function runDefaultTests(done) {
        new Karma({
            configFile: __dirname + '/../../karma.conf.js',
            singleRun: !watch
        }, done).start();
}

function runTestsWithCoverage(done) {
      new Karma({
          configFile: __dirname + '/../../karma.conf.js',
          reporters: ['progress', 'coverage'],
          coverageReporter: {
              type : 'html',
              dir : 'coverage/',
              subdir: '.'
          },
          singleRun: true
      }, done).start();
}

function writeBundles() {
  return build.dest();
}

function readProjectConfiguration() {
    return build.src(project);
}

function openCoverageFile() {
    return gulp.src('./coverage/index.html')
        .pipe(open());
}

function createLoaderConfig() {
    let proj = project;
    proj.build.loader.includeBundleMetadataInConfig = false; //Don't create bundle config
    return build.createLoaderConfig(proj).then(config => {
        //Do any modifications to the config here.
        //In this case, we're increasing the `waitSeconds` due to the amount of node modules Karma will be looking at
        config.waitSeconds = 200;
        //Write out karma config for tests to use
        for(var key in config.paths){
            config.paths[key] = config.paths[key].replace(/\\/g, '/');
        }
        return new Promise((resolve, reject) => {
            console.log('Writing require config');
            fs.writeFile('test/tdd-resources/karma-require-config.js', 'requirejs.config('+JSON.stringify(config)+')',()=>{
                fs.writeFile('test/tdd-resources/karma-require-config-object.json', JSON.stringify(config), writeKarmaVendorSourceFiles(config, resolve));
            });
        });
    });
}

function writeKarmaVendorSourceFiles(config, done){
    //Get the vendor source files that Karma needs
    let sources = [];
    let unique = [];
    for(var key in config.paths){

        let loc = path.normalize(config.paths[key].replace(/^\.\.\//g, '') + '/..').replace(/\\/g, '/');// path.normalize(loc.replace(/^\.\.\//g, '') + '/..').replace(/\\/g, '/');
        let normalizedProjectOutput = path.posix.normalize(project.platform.output).replace(/\\/g, '/');

        if(!loc.match('^' + normalizedProjectOutput) && !loc.match('^' + project.platform.baseUrl)){
            sources.push(loc)
        }
    }
    for(var value of config.packages){
        let loc = value.location;// + '/' + value.main;
        loc = path.normalize(loc.replace(/^\.\.\//g, '')).replace(/\\/g, '/');

        sources.push(loc);
    }

    unique = Array.from(new Set(sources));//Make sources unique
    //console.log(unique);
    unique = unique.map(loc => {
        //Configure the array to tell Karma how to process the files
        //let pat = loc.split('/');
        //if (pat[pat.length - 1].indexOf('.js') == -1) {
        //    pat[pat.length - 1] = pat[pat.length - 1] + '.js';
        //}
        return {pattern: loc + "/**/*", included: false, watched: false}
    });
    console.log('Writing vendor files array');
    return fs.writeFile('test/tdd-resources/karma-vendor-files.json', JSON.stringify(unique), done);
}



export default unit;
