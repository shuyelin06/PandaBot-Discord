/* Between this comment and the comment below, DO NOT CHANGE ANY OF THIS! 
This code is neccessary to link with the bot online, editing it will BREAK THE BOT*/
const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = '$';

// Allows the bot to go online
bot.on('ready', () =>{
    bot.channels.cache.get('716378365216686184').send('I am online!');
    console.log('Bot is online!');
})
/* DO NOT EDIT ANYTHING ABOVE THIS CODE. LEAVE THIS CODE AS IS. 
THIS CODE MUST REMAIN THE SAME.*/

// Josh's Code (Only Josh will edit)

let user = null;
let queue = [];

const guild = new Discord.Guild(bot);

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'test':
            msg.reply('Hello, I am online!');
            break;
        case 'clear':
            if(!args[1]){
                return msg.reply('Error, please include how many messages you would like to clear.');
            }
            msg.channel.bulkDelete(args[1]);
            msg.reply(args[1] + ' messages have been deleted');
            break;
        case 'q':
            user = msg.member.user.tag;
            if(args[1] != null){
                const a = args[1];
                if(a == 'help'){
                    msg.reply('new: Create a new queue \n join: Join an existing queue \n clear: Clear an existing queue');
                }
                if(a == 'new'){
                    queue = [];
                    queue.push(user);
                    msg.reply("A new queue has been created!" + "\n Current Queue: " + queue);
                    user = null;
                } else if(a == 'join'){
                    queue.push(user);
                    msg.reply(user + " has been added to the queue!" + "\n Current Queue: " + queue);
                    user = null;
                } else if(a == 'clear'){
                    queue = [];
                    msg.reply("Queue has been reset.");
                }
            }
            if(args[1] == null){
                if(queue.length == 0){
                    msg.reply("No queue yet. Create a new queue!");
                } else {
                    msg.reply("Current queue: " + queue);
                }
            }
            break;
    }
})

// Richard's Code (Only Richard will edit)



// Alice's Code (Only Alice will edit)


//Don't edit anything below this!
bot.login(token);