hash-ring
=========

[![Build Status](https://travis-ci.org/fatelei/hash-ring.svg?branch=master)]

Hash ring implemented in JavaScript. Inspired by [http://www.tom-e-white.com//2007/11/consistent-hashing.html](http://www.tom-e-white.com//2007/11/consistent-hashing.html)

- - -

#### Install

```
npm install hash-ring

```

#### Test

```
make test
```

#### Usage

```
var nodes = [
  '127.0.0.1:8000',
  '127.0.0.1:8001'
];

var options = {
  nodes: nodes
};
var ring = new Ring(options);
console.log(ring.getNode(nodes[0])); 
```

#### API
+ addNodeAdd(node)

	Add a node to hash ring, node should a string.
	
	```
	var node = '127.0.0.1:8003';
	ring.addNode(node);
	```
	
+ removeNode(node)

	Remove a node from hash ring, node should a string
	
	```
	var node = '127.0.0.1:8003';
	ring.removeNode(node);
	```
	
+ getNode(key)

	Get a node by specific key.
	
	```
	var key = '127.0.0.1:9000';
	console.log(ring.getNode(key));
	```
