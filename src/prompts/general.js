const inquirer = require("inquirer");

module.exports = {
  askProgram: async () => {
    const questions = [
        {
          name: "Program Select",
          type: "list",
          message: "What program would you like to run?",
          choices: [
            "Script Template",
            "CFX Parser"
          ]
        }
      ];
      return inquirer.prompt(questions);
  },
  askProjectSetup: async () => {
    const questions = [
      {
        name: "Project Name",
        type: "input",
        message: "Enter a project name:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a project name.";
          }
        }
      },
      {
        name: "Project Created By",
        type: "input",
        message: "Created By:",
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter a name.";
          }
        }
      },
      {
        name: "Project Version",
        type: "input",
        message: "Enter a Project Version:",
        default: "0.0.1",
        validate: function (value) {
            if (value.length) {
              return true;
            } else {
              return "Please enter a project version example: 0.0.1";
            }
          }
      },
      {
        name: "Project Components",
        type: "checkbox",
        message: "Select what components you would like to use:",
        choices: ["server", "client", "shared"],
        default: ["client"]
      },
      {
        name: "Project Plugins",
        type: "checkbox",
        message: "Select what plugins you would like to use:",
        choices: ["oxmysql", "dataview"],
        default: []
      },
    ];
    return inquirer.prompt(questions);
  }
};
