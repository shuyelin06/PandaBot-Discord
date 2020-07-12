module.exports = {
    name: 'clear',
    description: 'Clear a specific amount of messages from the channel!',
    aliases: ['c'],
    guildOnly: true,
    args: true,
    usage: '<number>',
    execute(msg, args){
        if(isNaN(args[0])){
            return msg.reply('Error, not a number.');
        } else {
            msg.channel.bulkDelete(Number(args[0]));
            msg.reply(args[0] + ' messages have been deleted');
        }
    }
}