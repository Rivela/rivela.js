# Rivelajs

A collection of reusable d3.js components and chart templates

![](https://travis-ci.org/Rivela/rivela.js.svg?branch=master)

## Include the library

### Using NPM

You can install in your project as a npm module:

```
npm install rivelajs
```

### Using the CDN

You can include the hosted version from unpkg.com, with the following code:

```html
<script src="https://unpkg.com/rivelajs/lib/rivela.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/rivelajs/lib/rivela.min.css">
```

## Getting started

Here the code to create the default barchart

```js
var chart = rivela.barchart()

d3.select('svg')
	.datum([3, 6, 2, 7])
	.call(chart)
```


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


## License

MIT License

Copyright (c) 2017-2018 Fabio Franchino. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

