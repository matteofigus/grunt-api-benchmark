grunt-api-benchmark
=============
[![Build Status](https://secure.travis-ci.org/matteofigus/grunt-api-benchmark.png?branch=master)](http://travis-ci.org/matteofigus/grunt-api-benchmark)

> A grunt plugin that takes a config.json file like [this](https://github.com/matteofigus/grunt-api-benchmark/blob/master/test/fixtures/input2.json), makes some performance tests, and creates an html export like [this](http://htmlpreview.github.io/?https://github.com/matteofigus/grunt-api-benchmark/blob/master/generated/output.html)! 

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-api-benchmark --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-api-benchmark');
```

## The "api_benchmark" task

### Overview
In your project's Gruntfile, add a section named `api_benchmark` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  api_benchmark: {
    options: {
      output: 'generated'
    },
    files: {
      'report.html': 'config.json'
    }
  },
})
```

### Options

#### options.output
Type: `String`
Default value: ``

The destination dir where to save the report file

### Files

Just specify the name of the output for each config. It supports multiple configurations.
AnyFile.html as output will produce the html, AnyFile.json will just save the data in a json file.


### The config file

Needs to be something like [this](https://github.com/matteofigus/grunt-api-benchmark/blob/master/test/fixtures/input2.json).

#### config.service

Needs to be an object containing the Name and the base http url of your api

#### config.endpoints

Needs to be an object containing your routes. Supports multiple verbs, data, headers, and everything. Look at [here](https://github.com/matteofigus/api-benchmark) to see more examples

#### config.options

Supports a lot of options. Look at [here](https://github.com/matteofigus/api-benchmark#options) for the complete list.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/matteofigus/grunt-api-benchmark/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

