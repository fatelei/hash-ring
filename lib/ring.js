/**
 * Hash ring
 */
'use strict';

const util = require('util');

const hashFunc = require('./hash_func');


class HashRing {
  constructor(nodes, options) {
    options = options || {};
    nodes = nodes || [];
    this.replicas = options.replicas || 128;
    this.sortedKeys = [];
    this.nodes = [];
    this.rings = {};

    let hashMethod = options.hashMethod ? options.hashMethod : 'crc32';
    this.hashFunc = hashMethod === 'crc32' ? hashFunc.crc32Func : hashFunc.md5Func;

    for (let node of nodes) {
      this.addNode(node);
    }
  }

  /**
   * Add node to hash ring.
   * @param {Object} node
   */
  addNode(node) {
    let i = 0;
    let key = null;

    this.nodes.push(node);
    for (i = 0; i < this.replicas; i++) {
      key = util.format('%s:%d', node, i);
      key = this.hashFunc(key);

      this.rings[key] = node;
      this.sortedKeys.push(key);
    }
    this.sortedKeys.sort();
  }

  /**
   * Remove node from hash ring.
   * @param  {Object} node
   */
  removeNode(node) {
    let i = 0;
    let key = null;
    let index = -1;

    this.nodes.splice(this.nodes.indexOf(node), 1);
    for (i = 0; i < this.replicas; i++) {
      key = util.format('%s:%s', node, i);
      key = this.hashFunc(key);

      delete this.rings[key];
      index = this.sortedKeys.indexOf(key);
      if (index !== -1) {
        this.sortedKeys.splice(index, 1);
      }
    }
  }

  /**
   * Get node by key.
   * @param  {String} key
   * @return A node or null.
   */
  getNode(key) {
    let length = this.sortedKeys.length;
    if (length === 0) {
      return null;
    }

    let hash = this.hashFunc(key);
    let i = 0;

    for (i = 0; i < length; i++) {
      if (key >= this.sortedKeys[i]) {
        return this.rings[this.sortedKeys[i]];
      }
    }

    return this.rings[this.sortedKeys[0]];
  }
}

module.exports = HashRing;
