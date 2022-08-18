const fs = require('fs');
const path = require('path');

const fileHeaven = fs.readFileSync(
  path.resolve(
    __dirname,
    '..',
    'node_modules/@perfma/heaven/es/style/vars.less',
  ),
  'utf8',
);
const vars = {};
fileHeaven.split('\n').forEach((line) => {
  if (line.indexOf('@import') !== 0) {
    if (line.indexOf('@') === 0) {
      line = line.split('//')[0].replace(';', '');
      const temp = line.split(':');
      const name = temp[0];
      const value = temp[1];
      vars[name] = value;
    }
  }
});
// vars['@ant-prefix'] = 'heaven'; // 可在此处自定义 ant-prefix，默认值 heaven

module.exports = vars;