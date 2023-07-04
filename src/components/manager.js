// A Script manager (Run this in the resource directory and you can add/remove scripts via common github urls)
const chalk = require("chalk");
const CLI = require("clui");
const Spinner = CLI.Spinner;
const axios = require("axios");
const AdmZip = require("adm-zip");

const prompts = require("../prompts/general");
const file = require("../handlers/files");

const AvailableResources = require("../data/resources.json");

async function get(url) {
  const options = {
    method: "GET",
    url: url,
    responseType: "arraybuffer",
  };
  const { data } = await axios(options);
  return data;
}

module.exports = {
  ManagerSetup: async () => {
    let setup = await prompts.askManagerPrompt();

    if (file.getCurrentDirectoryBase() == "resources") {
      let Action = setup["Resource Action"];
      let Choices = setup["Resource Choice"];

      for (let index = 0; index < Choices.length; index++) {
        const choice = Choices[index];
        let resource = AvailableResources[choice];
        let dir = file.getCurrentDirectory() + resource.directory;

        switch (Action) {
          case "add":
            file.createFolderIfExists(
              file.getCurrentDirectory() + resource.directory
            );

            if (!file.directoryExists(dir + choice)) {
              try {
                const status = new Spinner(`Downloading ${choice}...`);
                status.start();
                const zipFileBuffer = await get(resource.zip);
                const zip = new AdmZip(zipFileBuffer);

                zip.extractAllTo(dir, /*overwrite*/ true);
                file.renameDirectory(
                  dir + choice + "-" + resource.tag,
                  dir + choice
                );
                status.stop();
                console.log(chalk.green("Resource added. " + dir + choice));
              } catch (error) {
                console.log(chalk.red(error));
              }
            } else {
              console.log(
                chalk.yellow(
                  `Resource ${choice} is already installed. Try removing it first.`
                )
              );
            }

            break;
          case "remove":
            if (file.directoryExists(dir + choice)) {
              const status = new Spinner(`Downloading ${choice}...`);
              status.start();
              file.removeDirectory(dir + choice);
              status.stop();
              console.log(chalk.green("Resource Removed"));
            } else {
              console.log(chalk.yellow("Resource is already removed."));
            }
            break;
          default:
            break;
        }
      }
    } else {
      console.log(
        chalk.red(
          "You must be in your servers 'resources' folder to modify resource"
        )
      );
    }
  },
};
