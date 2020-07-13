const fs = require('fs');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const { prefix, token } = require('./config.json');

bot.on('ready', () =>{
    bot.channels.cache.get('716378365216686184').send('I am online!');
    console.log('Bot is online!');
    bot.user.setActivity("$help");
})
/* DO NOT EDIT ANYTHING ABOVE THIS CODE. LEAVE THIS CODE AS IS. 
THIS CODE MUST REMAIN THE SAME.*/

// Allows for a dynamic help command
exports.commandCollection = bot.commands;

bot.on('message', msg =>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    let args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if(!command) return;
    
    if (command.guildOnly && msg.channel.type !== 'text'){
        return msg.reply('I cannot execute that command inside DMs!');
    }

    if (command.args && !args.length){
        let reply = `You didn't provide any arguments, ${msg.author}`;

        if(command.usage){
            reply += `\nThe proper usage would be: \'${prefix}${command.name} ${command.usage}\'`
        }
        
        return msg.channel.send(reply);
    }
    
    try {
        command.execute(msg, args);
    } catch (error){
        console.error(error);
        msg.reply("There was an error in executing that command.");
    }
});

bot.login(token);