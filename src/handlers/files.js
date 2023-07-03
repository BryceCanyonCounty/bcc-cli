const fs = require("fs");
const path = require("path");

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  getCurrentDirectory: () => {
    return process.cwd();
  },

  directoryExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  createFolderIfExists: (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  },

  openTemplate: (template) => {
    let dir = path.resolve(__dirname, `../templates/${template}`)

    return fs.readFileSync(dir, "utf8");
  },

  saveNewResource: (dir, content) => {
    fs.writeFileSync(dir, content, "utf8");
  },

  copyTemplateToResource(template, dir) {
    let from = path.resolve(__dirname, `../templates/${template}`)
    fs.copyFileSync(from, dir);
  }
};
