const CLI = require("clui");
const Spinner = CLI.Spinner;
const prompts = require("../prompts/general");
const store = require("../store");

module.exports = {
  ProgramCheck: async () => {
    let answer = await prompts.askProgram()
    return answer ? answer["Program Select"] : ''
  }
};
