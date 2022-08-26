#!/usr/bin/env node
const path = require('path');
const AdmZip = require('adm-zip');
const parse = require('yargs-parser');
const log = require('./log');
const cwd = process.cwd();
const rawArgv = parse(process.argv.slice(2));
console.log('rawArgv', rawArgv);
const zipName = rawArgv.name;
if (!zipName) {
  log.error("block's name is required，please add name. eq: node publish.js --name [BLOCK NAME]");
  process.exit(1);
}
const zip = new AdmZip();
zip.addLocalFolder(path.resolve(cwd, './block'));
zip.writeZip(path.resolve(cwd, `./${zipName}.zip`));
