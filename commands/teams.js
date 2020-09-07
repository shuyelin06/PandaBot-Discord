const Discord = require('discord.js');

module.exports = {
    name: 'teams',
    description: 'Check if the bot is online',
    aliases: [],
    execute(msg, args){
        const embed = new Discord.MessageEmbed()
            .setTitle("Hunter and Runner Teams")
            .addField("Runners", "Yellow Guy \nitsyaboi_edchoi",)
            .addField("Hunters", "CuppsuSensei\nNawchill\nalice\nTiedyEPIC\nLucasW888\nSushreee\nRoldy9000\nPandakidz2\nkszed\nkookie")
            .addField("Spectators", "maymaymusic\nesget")
            .setFooter("Winners obtain a special role (that they can name themselves)! Winners include: the runners or the hunters who killed the runners.");
        msg.channel.send(embed);
    }
}
