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
    let ConfigValues = []

    const CurrentDirectory = file.getCurrentDirectory();
    let Name = setup["Project Name"];
    let Version = setup["Project Version"];
    let Components = setup["Project Components"];
    let Plugins = setup["Project Plugins"];
    let CreatedBy = setup["Project Created By"];
    let KeyName = Name.replaceAll(" ", "-").toLowerCase()

    const directory =
      CurrentDirectory + "/" + KeyName;
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

        file.copyTemplateToResource("config.lua", directory+'/shared/config.lua')
        SharedScripts.push('shared/config.lua')
    }

    if(Components.find(element => element == "language")) {
        let config = file.openTemplate("config.lua").toString()
        file.createFolderIfExists(directory+'/shared')
        file.createFolderIfExists(directory+'/languages')
        file.copyTemplateToResource("/languages/en_lang.lua", directory+'/languages/en_lang.lua')
        file.copyTemplateToResource("locale.lua", directory+'/shared/locale.lua')

        SharedScripts.push('shared/locale.lua')
        SharedScripts.push('languages/en_lang.lua')
        if(!Components.find(element => element == "shared")) {
            SharedScripts.push('shared/config.lua')
        }
        ConfigValues.push('Config.defaultLang = "en_lang"')
        config = config.replaceAll("CONFIGLANG", ConfigValues)
        file.saveNewResource(directory+'/shared/config.lua', config)
    }

    if(Components.find(element => element == "nui (simple)")) {
        file.copyTemplateFolderToResource('nui/simple', directory+'/ui')
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



    let readme = file.openTemplate("README.md")
    readme = readme
        .replaceAll("{TITLE}", Name)
        .replaceAll("{SCRIPTNAME}", KeyName)

    file.saveNewResource(directory+'/README.md', readme)



    file.copyTemplateToResource("LICENSE", directory+'/LICENSE');


    fxmanifest = fxmanifest
        .replaceAll("{VERSION}", Version)
        .replaceAll("{AUTHOR}", CreatedBy)

    file.saveNewResource(directory+'/fxmanifest.lua', fxmanifest)


    status.stop();
    console.log(chalk.green("Project Created!"), chalk.yellow(`(${directory})`));
  },
};
