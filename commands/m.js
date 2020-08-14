const Discord = require('discord.js');
const data = require('./minecraft.json');
const fs = require("fs");
module.exports = {
    name: 'm',
    description: 'Minecraft stuf',
    aliases: ['minecraft', 'mine'],
    execute(msg, args){
        switch(args[0]){
            case 'join':
                for(var i in data["Players"]){
                    if (data["Players"][i] == msg.author.username){
                        msg.channel.send("You are already in the list of players!")
                        return;
                    }
                }
                let input = msg.author.username;
                data["Players"].push(input);
                fs.writeFile("./commands/minecraft.json", JSON.stringify(data), err => {
                    if (err) throw err;
                    console.log("Done.");
                });
                msg.channel.send(showList());
                break;
            case 'show':
                msg.channel.send(showList());
                break;
        }
    }
}
function showList(){
    const embed = new Discord.MessageEmbed()
        .setColor("NAVY")
        .setTitle('Minecraft Competition')
        .setDescription("List of people that are going to spectate/play");
    for(var key in data){
        let list = [];
        for(var i in data[key]){
            list.push(data[key][i]);
        }
        embed.addField(key, list.join('\n'));
    }
    return embed;
}