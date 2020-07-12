module.exports = {
    name: 'test',
    description: 'Check if the bot is online',
    aliases: ['t'],
    execute(msg, args){
        msg.reply("I am online!");
    }
}