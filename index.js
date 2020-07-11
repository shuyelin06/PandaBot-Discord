const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = '$';

bot.on('ready', () =>{
    bot.channels.cache.get('716378365216686184').send('I am online!');
    console.log('Bot is online!');
})
/* DO NOT EDIT ANYTHING ABOVE THIS CODE. LEAVE THIS CODE AS IS. 
THIS CODE MUST REMAIN THE SAME.*/

// User Data (Not sure if I'm gonna use this yet)

// Josh's Code (Only Josh will edit)
const Joshua = new Discord.User(bot, {
    "id": "428943449333694484"
});
const Richard = new Discord.User(bot, {
    "id": "472470907135328257"
});
const Julie = new Discord.User(bot, {
    "id": "330514479424995328"
});
const Alice = new Discord.User(bot, {
    "id": "622598371693166603"
});
const Meilin = new Discord.User(bot, {
    "id": "622221751190814734"
});

let user = null;
let queue = [];

const guild = new Discord.Guild(bot, {
    "id": "666456999466237984",
    "name": "Cool Kidz"
    

});

console.log(bot.guilds);

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(" ");
    switch(args[0].toLowerCase()){
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
                if(a == 'new'){
                    queue = [];
                    queue.push(user);
                    msg.reply(user.id);
                    msg.channel.send("${user} A new queue has been created!" + "\n Current Queue: " + queue);
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
                    msg.channel.send("No queue yet. Create a new queue!");
                } else {
                    msg.channel.send("Current queue: " + queue);
                }
            }
            break;
    }
})

// Richard's Code (Only Richard will edit)



// Alice's Code (Only Alice will edit)


//Don't edit anything below this!
bot.login(token);