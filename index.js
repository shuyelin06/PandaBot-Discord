const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

bot.on('ready', () =>{
    console.log('Bot is online!');
})

bot.on('message', msg=>{
    if (msg.content === "Hello"){
        msg.reply("Hello panda brother!");
    }
})
bot.on('message', msg=>{
    if (msg.content == "Who is the coolest of them all"){
        msg.reply('Pandakidz2 is obviously the coolest of them all');
    }
})
bot.login(token);
