hash-ring
=========

[![Build Status](https://travis-ci.org/fatelei/hash-ring.svg?branch=master)](https://travis-ci.org/fatelei/hash-ring)

Hash ring implemented in JavaScript. Inspired by [http://www.tom-e-white.com//2007/11/consistent-hashing.html](http://www.tom-e-white.com//2007/11/consistent-hashing.html)

- - -

# Install

```
npm install hash-ring
```

# APIs

## HashRing

Initialize hash ring instance.

+ nodes {Array}: Nodes
+ options {Object}: Config
	+ hashMethod {String}: Specific hash method, `crc32` or `md5`, default is `crc32`
	+ replicas {Int}: Virtual nodes number,. default is `128`

### Usage

```
const HashRing = require('HashRing');
let ring = new HashRing([
	'1',
	'2'
], {
	hashMethod: 'crc32',
	replicas: 1
});
```

## addNode

Add a node to hash ring, node should a string.

+ node {String}: Node

### Usage

```
const node = '3';
ring.addNode(node);
```

## removeNode

Remove a node from hash ring, node should a string

+ node {String}: Node

### Usage

```
const node = '1';
ring.removeNode(node);
```
	
## getNode

Get a node by specific key.

+ key {String}: Query key

### Usage

```
const key = '5';
console.log(ring.getNode(key));
```

## Test

```
make test
```
