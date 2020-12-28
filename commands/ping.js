module.exports = {
    name: 'ping',
    description: 'Check if the bot is online',
    aliases: ['p'],
    execute(msg, args){
        msg.reply("I am online!");
    }
}