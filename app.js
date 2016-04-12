#!/usr/bin/env node
var asciitree = require('ascii-tree');

var data = '';
var PREFIX = "#";

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  data += chunk;
});

process.stdin.on('end', function() {
  show(data);
});

function findChild(node, childId) {
  if(node && node.length) {
    if(node[childId]) {
      return node[childId];
    }
    else {
      for(var i=0,l=node.length; i<l; i++) {
        var child = findChild(node[i], childId);
        if(child) return child;
      }
    }
  }
  return null;
}

function generateTreeString(parent, depth) {
  var output = "";

  if(!parent) return "";

  var depth_increment = Object.keys(parent).length == 1 ? 0 : 1;

  for (var child in parent) {
    if(child === "deleted") continue;

    output += "\r\n" + (PREFIX.repeat(depth)) + child;
    if(parent[child].deleted === true) output += " (deleted)";
    if(parent[child].deleted === false) output += " (active)";

    output += generateTreeString(parent[child], depth + depth_increment);
  }

  return output;
}


function buildTreeObject(data) {
  var root = {};

  for(var i=0,l=data.length; i<l; i++) {
    var leaf = data[i];
    var leaf_revisions = leaf.ok['_revisions'];
    leaf_revisions.ids.reverse();
    var numberOfRevisions = leaf_revisions.ids.length;
    var depth = leaf_revisions.start - numberOfRevisions + 1;
    var parentNodeId = depth + '-' + leaf_revisions.ids[0];

    var parent = findChild(root, parentNodeId);
    if(!parent) {
      parent = {};
      root[parentNodeId] = parent;
    }

    for(var j=1; depth < leaf_revisions.start; j++) {
      var full_rev = ++depth + '-' + leaf_revisions.ids[j];

      var node = findChild(root, full_rev);
      if(!node) {
        node = {};
        parent[full_rev] = node;
      }
      parent = node;

      if(full_rev == leaf.ok['_rev']) {
        node['deleted'] = !!leaf.ok['_deleted'];
      }
    }
  }

  return root;
}


function show(json) {
  var data = JSON.parse(json);

  var id = data[0].ok['_id'];

  var root = buildTreeObject(data);

  var output = PREFIX + id;
  output += generateTreeString(root, 2);
  var tree = asciitree.generate(output);

  process.stdout.write(tree + '\n');
}