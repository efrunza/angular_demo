const sass = require('node-sass');
const fs = require('fs');
const autoPrefixer = require('autoprefixer');
const postcss = require('postcss');
const fsExtra = require('fs-extra');
const path = require('path');
const compiledCSSFile = 'styles.css';
const targetFile = 'main.scss';
const rootPath = path.resolve(__dirname, '../..');
const inputFolderPath = path.resolve(rootPath, 'src/app/azure-pages');
const outputFolderPath = path.resolve(rootPath, 'src/assets/b2c-auth');
const domainURL =
  process.env.domainURL || 'https://iap-sbx-web.azurewebsites.net';

const injectedBaseUrl = {
  'base-url': `${domainURL}/assets/b2c-auth`
};

const signupEntryPath = `./pages/signup`;
const loginEntryPath = `./pages/login`;
const baseEntryPath = `./base/base`;
const resetPasswordPath = `./pages/reset-password`;
const appRulesPath = `./pages/application-rules`;

const dataString =
  sassVariables(injectedBaseUrl) +
  sassImport(signupEntryPath) +
  sassImport(loginEntryPath) +
  sassImport(resetPasswordPath) +
  sassImport(appRulesPath) +
  sassImport(baseEntryPath);

console.log(`${inputFolderPath}/styles/${targetFile}`);

sass.render(
  {
    includePaths: [`${inputFolderPath}/styles`],
    outFile: `${outputFolderPath}/${compiledCSSFile}`,
    outputStyle: 'compressed',
    data: dataString
  },
  (error, result) => {
    if (error) {
      console.error(
        `cannot compile SCSS from Azure pages due to ${error.message}`
      );
      process.exit(1);
    } else {
      postcss([
        autoPrefixer({
          browsers: [
            '> 0.3%',
            'last 7 versions',
            'Android >= 4',
            'Firefox >= 20',
            'iOS >= 8'
          ],
          flexbox: true
        })
      ])
        .process(result.css.toString(), {
          from: `${outputFolderPath}/${compiledCSSFile}`
        })
        .catch(err => {
          console.error(`cannot apply prefix due to ${err.message}`);
          process.exit(1);
        })
        .then(result => {
          fs.writeFile(
            `${outputFolderPath}/${compiledCSSFile}`,
            result.css,
            () => true
          );
          console.log(`${outputFolderPath}/${compiledCSSFile} created`);
        });

      fsExtra
        .copy(`${inputFolderPath}`, `${outputFolderPath}`, {
          filter: src => {
            return path.extname(src).toLowerCase() === 'html';
          }
        })
        .then(() => {
          console.log(
            `templates folder copied from ${inputFolderPath} to ${outputFolderPath}`
          );
          formatURL('login.html');
          formatURL('signup.html');
          formatURL('forgot-password.html');
          formatURL('application-rules.html');
        })
        .catch(err => {
          console.error(
            `cannot copy  ${inputFolderPath} to ${outputFolderPath} due to ${
              err.message
            }`
          );
          process.exit(1);
        });
      fsExtra
        .copy(`${inputFolderPath}/images`, `${outputFolderPath}/images`)
        .then(() => {
          console.log(
            `images folder copied from ${inputFolderPath} to ${outputFolderPath}`
          );
        })
        .catch(err => {
          console.error(
            `cannot copy  ${inputFolderPath}/images to ${outputFolderPath}/images due to ${
              err.message
            }`
          );
          process.exit(1);
        });
    }
  }
);

function sassVariable(name, value) {
  return `$${name}: '${value}';`;
}

function sassVariables(variablesObj) {
  return Object.keys(variablesObj)
    .map(function(name) {
      return sassVariable(name, variablesObj[name]);
    })
    .join('\n');
}

function sassImport(path) {
  return `@import '${path}';`;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function formatURL(fileName) {
  fs.readFile(`${inputFolderPath}/${fileName}`, 'utf8', (err, content) => {
    if (err) {
      console.error(`cannot format ${fileName} url due to ${err.message}`);
      process.exit(1);
    } else {
      content = content.replace(
        new RegExp(escapeRegExp('./'), 'g'),
        `${domainURL}/assets/b2c-auth/`
      );
      fs.writeFile(`${outputFolderPath}/${fileName}`, content, () =>
        console.log(`${fileName} is formatted`)
      );
    }
  });
}
