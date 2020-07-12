const { prefix } = require('../config.json');
let c = require("../index.js");


module.exports = {
    name: 'help',
    description: 'List all commands or describe a specific command',
    aliases: ['h'],
    usage: '<command name>',
    execute(msg, args){
        const data = [];
        let commandCollection = c.commandCollection;

        if(!args.length){
            data.push('All of the PandaBot commands: ')
            data.push(commandCollection.map(command => command.name).join(', '));
            data.push('\nUse this command followed by another command name to get specific info on that command!')

            return msg.author.send(data, { split: true })
	            .then(() => {
		            if (msg.channel.type === 'dm') return;
		                msg.reply('I\'ve sent you a DM with all my commands!');
                }) 
                .catch(error => {
		            console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
		            msg.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
	            });
        }

        const name = args[0].toLowerCase();
        const command = commandCollection.get(name) || commandCollection.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return msg.reply('That\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        msg.channel.send(data, { split: true });
    }
}
