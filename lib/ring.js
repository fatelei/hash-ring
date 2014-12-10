/**
 * Hash ring
 */

var util = require('util');

var hashFunc = require('./hash_func');

/**
 * Ring
 * @param {Object} options The config
 */
function Ring(options) {
  this.replicas = 3;

  if (options !== undefined) {
    this.replicas = options.replicas || this.replicas;
  }

  this.sortedKeys = [];

  this.nodes = {};

  if (options && options.hasOwnProperty('nodes')) {
    var i = 0;

    if (!(options.nodes instanceof Array)) {
      throw new Error('Nodes must be an array format');
    }

    for (i = 0; i < options.nodes.length; i++) {
      this.addNode(options.nodes[i]);
    }
  }
}

module.exports = Ring;

/**
 * Add a node to hash ring
 * @param {String} node A string represent a node
 */
Ring.prototype.addNode = function (node) {
  var that = this;
  var i = 0;
  var key = null;

  for (i = 0; i < that.replicas; i++) {
    key = util.format('%s:%s', node, i);
    key = hashFunc.md5HashFunc(key);

    that.nodes[key] = node;
    that.sortedKeys.push(key);
  }
  that.sortedKeys.sort();
};

/**
 * Remove a node from hash ring
 * @param  {String} node A string represent a node
 */
Ring.prototype.removeNode = function (node) {
  var that = this;
  var i = 0;
  var key = null;
  var index = -1;

  for (i = 0; i < that.replicas; i++) {
    key = util.format('%s:%s', node, i);
    key = hashFunc.md5HashFunc(key);

    delete that.nodes[key];
    index = that.sortedKeys.indexOf(key);
    if (index !== -1) {
      that.sortedKeys.splice(index, 1);
    }
  }
};

/**
 * Get a node from hash ring
 * @param  {String} node A string represent a node
 * @return The node if it exits, else return null
 */
Ring.prototype.getNode = function (node) {
  var that = this;

  if (that.sortedKeys.length === 0) {
    return null;
  }

  var key = hashFunc.md5HashFunc(node);
  var i = 0;

  for (i = 0; i < that.sortedKeys.length; i++) {
    if (key >= that.sortedKeys[i]) {
      return that.nodes[that.sortedKeys[i]];
    }
  }

  return that.nodes[that.sortedKeys[0]];
};