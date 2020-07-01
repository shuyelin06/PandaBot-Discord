const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = '$';

bot.on('ready', () =>{
    console.log('Bot is online!');
})

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(" ");
    
    switch(args[0]){
        case 'smiteall':
            msg.channel.sendMessage('You have all been smitten');
            break;
        case 'clear':
            if(!args[1]){
                return msg.reply('Error, please include how many messages you would like to clear.');
            }
            msg.channel.bulkDelete(args[1]);
            setTimeout(function(){
                msg.reply(args[1] + ' messages hvae been deleted.');
            }, 5000);
            break;
    }
})

bot.login(token);
