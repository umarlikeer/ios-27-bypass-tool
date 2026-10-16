const fs = require('fs');
const path = require('path');
const bytenode = require('bytenode');

// Loads compiled bytecode (.jsc) in production, or source js in dev
const jscPath = path.join(__dirname, 'renderer.jsc');
const jsPath = path.join(__dirname, 'renderer.js');
const rawSrcPath = path.join(__dirname, 'renderer-src.js');

if (fs.existsSync(jscPath)) {
  bytenode.runBytecodeFile(jscPath);
} else if (fs.existsSync(jsPath)) {
  require(jsPath);
} else {
  require(rawSrcPath);
}
