This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install
$ ionic serve
```

Then, to run it, cd into `myTabs` and run:

```bash
$ npm install promise-polyfill --save --save-exact (if promise.js error)
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.
```bash
$ ionic cordova rm android
$ ionic cordova add android
$ ionic cordova rm ios
$ ionic cordova add ios
$ cd platforms/ios/cordova && npm install ios-sim@latest (ios emulate not run)

```

