/* Between this comment and the comment below, DO NOT CHANGE ANY OF THIS! 
This code is neccessary to link with the bot online, editing it will BREAK THE BOT*/
const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = 'pp';

// Allows the bot to go online
bot.on('ready', () =>{
    console.log('Bot is online!');
})
/* DO NOT EDIT ANYTHING ABOVE THIS CODE. LEAVE THIS CODE AS IS. 
THIS CODE MUST REMAIN THE SAME.*/

var lastMessage;

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(" ");
    
    switch(args[0]){
        case 'smite':
            msg.reply('Alice has been outsmitted by a yuumi jungle. #Feelsbadman');
            break;
        case 'clear':
            if(!args[1]){
                return msg.reply('Error, please include how many messages you would like to clear.');
            }
            msg.channel.bulkDelete(args[1]);
            msg.reply(args[1] + ' messages have been deleted, just like Alices will to live').then(m => m.delete(3000));
            break;
        case 'whosucks':
            return msg.reply("Alice sucks");
            break;
        case 'alice':
            return msg.reply('Alice sucks');

    }
})

bot.login(token);
