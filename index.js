const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = '!p ';

bot.on('ready', () =>{
    console.log('Bot is online!');
})

bot.on('message', msg =>{
    let args = msg.content.substring(PREFIX.length).split(" ");
    
    switch(args[0]){
        case 'smiteall':
            message.channel.sendMessage('You have all been smitten');
            break;
        case 'clear':
            if(!args[1]){
                return message.reply('Error, please include how many messages you would like to clear.');
            }
            message.channel.bulkdelete(arg[1]);
            setTimeout(function(){
                message.reply(arg[1] + ' messages hvae been deleted.');
            }, 5000);
            break;
    }
})

bot.login(token);
