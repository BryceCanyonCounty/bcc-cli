#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

// Import Components to be called
const general = require('./src/components/general');
const project = require('./src/components/project');

// Clear the terminal to have a clean slate
clear();

console.log(
  chalk.blueBright(
    figlet.textSync('BCC CLI', { horizontalLayout: 'full', font: 'alligator2' })
  )
);

const run = async () => {
  try {
    let programToRun = await general.ProgramCheck();
    
    switch (programToRun) {
        case "Script Template":
            await project.ProjectSetup()
            break;
        case "CFX Parser":
            console.log(chalk.green("Comming Soon..."))
            break;
        default:
            break;
    }


  } catch(err) {
      if (err) console.log(chalk.red(err));
  }
};

run();
