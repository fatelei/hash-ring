/**
 * Ring test
 */

var assert = require('assert');

var Ring = require('../index');

describe('Test hash ring', function () {
  describe('Test constructor with nodes', function () {
    it('should be ok', function () {
      var options = {
        nodes: [
          '127.0.0.1:3001',
          '127.0.0.1:3002'
        ]
      };
      var ring = new Ring(options);
      assert.ok(ring instanceof Ring);
    });
  });

  describe('Test add a node', function () {
    it('should be ok', function () {
      var ring = new Ring();
      ring.addNode('127.0.0.1:3001');
      assert.ok(ring.sortedKeys.length > 0);
    });
  });

  describe('Test remove a node', function () {
    it('should be ok', function () {
      var ring = new Ring();
      var node = '127.0.0.1:3001';
      ring.addNode(node);
      ring.removeNode(node);
      assert.ok(ring.sortedKeys.length === 0);
    });
  });

  describe('Test get a node', function () {
    it('should be ok', function () {
      var ring = new Ring();
      var node = '127.0.0.1:3001';
      ring.addNode(node);
      var rst = ring.getNode(node);
      assert.ok(rst !== null);
    });
  });
});