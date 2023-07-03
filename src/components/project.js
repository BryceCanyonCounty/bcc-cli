const CLI = require("clui");
const chalk = require("chalk");

const Spinner = CLI.Spinner;

const file = require("../handlers/files");

const prompts = require("../prompts/general");

module.exports = {
  ProjectSetup: async () => {
    let setup = await prompts.askProjectSetup();
    const status = new Spinner("Creating Project...");
    status.start();

    let ServerScripts = []
    let ClientScripts = []
    let SharedScripts = []

    const CurrentDirectory = file.getCurrentDirectory();
    let Name = setup["Project Name"];
    let Version = setup["Project Version"];
    let Components = setup["Project Components"];
    let Plugins = setup["Project Plugins"];
    let CreatedBy = setup["Project Created By"];

    const directory =
      CurrentDirectory + "/" + Name.replaceAll(" ", "-").toLowerCase();
    let fxmanifest = file.openTemplate("fxmanifest.lua").toString()

    // Create/setup the required folders and content.
    file.createFolderIfExists(directory)

    if (Plugins.find(element => element == "dataview")) {
        file.createFolderIfExists(directory+'/client')
        file.createFolderIfExists(directory+'/client/plugins')
        file.copyTemplateToResource("dataview.lua", directory+'/client/plugins/dataview.lua')
   
        ClientScripts.push('client/plugins/dataview.lua')
    }
    
    if (Plugins.find(element => element == "oxmysql")) {
        ServerScripts.push('@oxmysql/lib/MySQL.lua')
    }

    if(Components.find(element => element == "client")) {
        file.createFolderIfExists(directory+'/client')

        file.copyTemplateToResource("client.lua", directory+'/client/main.lua')
        ClientScripts.push('client/main.lua')

    }

    if(Components.find(element => element == "server")) {
        file.createFolderIfExists(directory+'/server')
        file.copyTemplateToResource("server.lua", directory+'/server/main.lua')

        ServerScripts.push('server/main.lua')
    }

    if(Components.find(element => element == "shared")) {
        file.createFolderIfExists(directory+'/shared')
    }


    function GetResources(name, resourcelist) {
        let scripts = `${name}_scripts {`
        for (let index = 0; index < resourcelist.length; index++) {
            const script = resourcelist[index];
            scripts += `
   '${script}'${index < resourcelist.length ? ',' : ''}`
        }
        scripts += `
}`

        return scripts
    }


    fxmanifest = fxmanifest.replaceAll("{CLIENTSCRIPTS}", GetResources('client', ClientScripts))
    fxmanifest = fxmanifest.replaceAll("{SERVERSCRIPTS}", GetResources('server', ServerScripts))
    fxmanifest = fxmanifest.replaceAll("{SHAREDSCRIPTS}", GetResources('shared', SharedScripts))



    file.copyTemplateToResource("README.md", directory+'/README.md');
    file.copyTemplateToResource("LICENSE", directory+'/LICENSE');

    
    fxmanifest = fxmanifest
        .replaceAll("{VERSION}", Version)
        .replaceAll("{AUTHOR}", CreatedBy)

    file.saveNewResource(directory+'/fxmanifest.lua', fxmanifest)
    

    status.stop();
    console.log(chalk.green("Project Created!"), chalk.yellow(`(${directory})`));
  },
};
