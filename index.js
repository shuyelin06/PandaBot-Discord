const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = '$';

var lastMessage;
bot.on('ready', () =>{
    console.log('Bot is online!');
})

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(" ");
    
    switch(args[0]){
        case 'smite':
            msg.reply('You have been outsmitted by a yuumi jungle. #Feelsbadman');
            break;
        case 'clear':
            if(!args[1]){
                return msg.reply('Error, please include how many messages you would like to clear.');
            }
            msg.channel.bulkDelete(args[1]);
            msg.reply(args[1] + ' messages have been deleted.').then(m => m.delete(3000));
            break;
    }
})

bot.login(token);
