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
let user = null;
let queue = [];
let queueNotify = [];

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
            user = msg.member.user;
            if(args[1] != null){
                const a = args[1];
                if(a == 'new')
                {
                    queue = [];
                    queue.push(user.username);
                    queueNotify.push(user);
                    msg.channel.send("here (this will become a tag later)" + `\nA new queue has been created!\nTo join the queue, type \'$q join\'!` + "\nCurrent Queue: \n" + queue);
                    user = null;
                } 
                else if(a == 'join')
                {
                    if(!queue.includes(user.username)){
                        queue.push(user.username);
                        queueNotify.push(user);
                        msg.channel.send(queueNotify + "\n" + user.username + " has been added to the queue!" + "\nCurrent Queue: \n" + queue);
                    } else {
                        msg.reply("You are already in the queue!");
                    }
                    user = null;
                } 
                else if(a == 'clear')
                {
                    queue = [];
                    queueNotify = [];
                    msg.reply("Queue has been cleared.");
                }
                else if(a == 'remove'){
                    let q = queue.indexOf(user.username);
                    queue.splice(q);
                    let z = queueNotify.indexOf(user);
                    queueNotify.splice(z);
                    msg.reply("You have been removed from the queue.")
                    msg.channel.send("Current queue: " + queue);
                }
            }
            if(args[1] == null){
                if(queue.length == 0){
                    msg.channel.send("No queue yet. Create a new queue!");
                } else {
                    msg.channel.send("Current queue: \n" + queue);
                }
            }
            break;
    }
})

function queueEmpty(){
    if(queue.length == 0){
    }
}
// Richard's Code (Only Richard will edit)



// Alice's Code (Only Alice will edit)


//Don't edit anything below this!
bot.login(token);