grunt-api-benchmark 
=============

[![Greenkeeper badge](https://badges.greenkeeper.io/matteofigus/grunt-api-benchmark.svg)](https://greenkeeper.io/)

> A grunt plugin based on the nodejs module [api-benchmark](https://github.com/matteofigus/api-benchmark) that takes a config.json file like [this](https://github.com/matteofigus/grunt-api-benchmark/blob/master/test/fixtures/input2.json), makes some performance tests to your api, and creates an html export like this:

![https://raw.github.com/matteofigus/api-benchmark-www/master/public/images/screen-shot.png](https://raw.github.com/matteofigus/api-benchmark-www/master/public/images/screen-shot.png)

Node version: **0.10.0** required

Build status: [![Build Status](https://secure.travis-ci.org/matteofigus/grunt-api-benchmark.png?branch=master)](http://travis-ci.org/matteofigus/grunt-api-benchmark)

[![NPM](https://nodei.co/npm/grunt-api-benchmark.png?downloads=true)](https://npmjs.org/package/grunt-api-benchmark)


## Getting Started
This plugin requires Grunt `^1.0.0`

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
    my_api: {
      options: {
        output: 'generated'
      },
      files: {
        'report.html': 'config.json'
      }
    }
  }
});
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

Needs to be an object containing your routes. Supports multiple verbs, data, headers, and everything. Look at [here](https://github.com/matteofigus/api-benchmark#route-object) for the full documentation

#### config.options

Supports a lot of options. Look at [here](https://github.com/matteofigus/api-benchmark#options-object) for the complete list.

# Contributing

For the latest updates and release information follow [@matteofigus](https://twitter.com/matteofigus) on twitter.
Feel free to open new Issues in case of Bugs or Feature requests. 
Pull requests are welcome, possibly in new branches.

### Tests

```shell
grunt test
```

### TODO

* History analysis report ([ask for details](https://twitter.com/matteofigus))

# License

MIT