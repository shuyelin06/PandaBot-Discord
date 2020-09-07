const Discord = require('discord.js');
const games = [
    'League',
    'Minecraft',
    'AmongUs',
    'DST'
]

module.exports = {
    name: 'queue',
    description: 'Create a queue for an easier way to set up games (or anything else)! Type $q help for all of the specific commands!',
    aliases: ['q'],
    execute(msg, args){
        msg.channel.send("Please react to what game you would like to make a queue for.");
        for(var i in games){
            const game = msg.guild.emojis.cache.find(emoji => emoji.name === games[i]);
            msg.react(game);
        }

        reactions = msg.awaitReactions((reaction, user) => 
            games.includes(reaction.emoji.name) && user.id == msg.author.id, {max: 1, time: 30000})
            .then(collected => {
                try{
                    const embed = new Discord.MessageEmbed()
                        .setTitle(msg.author.username + "'s Queue: " + collected.first().emoji.name)
                        .setFooter("React to let " + msg.author.username + " know you're down to play!");
                    msg.channel.send(embed).then((m) => {
                        m.react(collected.first().emoji)
                    });
                    msg.delete();
                } catch(error){
                    msg.reply("An error occurred.");
                    console.log(error);
                }
            });
    }
}