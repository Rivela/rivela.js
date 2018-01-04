# Rivela.js

Collection of reusable d3.js components and chart templates

![](https://api.travis-ci.org/abusedmedia/Rivela.svg?branch=master)

## Include the library

### Standalone download

You can download the latest version from here:


### Using NPM

You can install in your project as a npm module:

```
npm install rivela
```

### Using the CDN

You can include the hosted version from unpkg.com, with the following code:

```html
<script src="https://unpkg.com/rivela/umd/rivela.js"></script>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/rivela/umd/rivela.css">
```

## Getting started

Here the code to create the default barchart

```js
var chart = rivela.barchart()

d3.select('svg')
	.datum([3, 6, 2, 7])
	.call(chart)
```

Learn more through the examples and the API documentation.

---

# Contribute

The library is still in progress and not in a stable stage.
If you are an adventerous person and may want to contribute, here the basic development commands:

## First setup

```
npm install
```

## Build

```
grunt
```

## Dev

```
grunt dev
```

