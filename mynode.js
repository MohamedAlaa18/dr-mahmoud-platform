const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';

const envFile = `export const environment = {
    production: false,
    API_KEY: '${process.env.API_KEY}',
};
`;
const targetPath = path.join(__dirname, './src/environments/environment.ts');
const targetPathDevelopment = path.join(__dirname, './src/environments/environment.development.ts');

fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.ts`);
  }
});
fs.writeFile(targetPathDevelopment, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.ts`);
  }
});
