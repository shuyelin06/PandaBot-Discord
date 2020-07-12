const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NzI3NTkxNzY4MDY1MDQ4NjU2.XvuFEw.s6FYCfJB-yVmu1T8WDpRfbh_ODE';

const prefix = '$';

bot.on('ready', () =>{
    bot.channels.cache.get('716378365216686184').send('I am online!');
    console.log('Bot is online!');
    bot.user.setActivity("$help");
})
/* DO NOT EDIT ANYTHING ABOVE THIS CODE. LEAVE THIS CODE AS IS. 
THIS CODE MUST REMAIN THE SAME.*/

// User Data (Not sure if I'm gonna use this yet)

// Josh's Code (Only Josh will edit)
let user = null;
let queue = [];
let queueNotify = [];
var roastList = [
    "you're as useless as the \'ueue\' in the \'queue\'.", 
    "you're the reason the gene pool needs a lifeguard.",
    "your only chance of getting laid is to crawl up a chicken's butt and wait.",
    "some day you'll go far.. and I hope you stay there.",
    "if laughter is the best medicine, your face must be curing the world.",
    "is your ass jealous of the amount of shit that just came out of your mouth?",
    "if I wanted to kill myself, I would climb to your ego and jump to your IQ.",
    "when I see your face, there\'s not a thing I would change.. except the direction I was walking in.",
    "when you were born the doctor threw you out the window and the window threw you back.",
    "some kids were dropped as a baby. But you were clearly thrown in the air, smacked by a ceiling fan, and tossed out the window.",
    "mirrors don\'t lie. Lucky for you, they can\'t laugh either.",
    "keep rolling your eyes, maybe you'll find your brain back there.",
    "let me know when you\'re available so I can make sure I\'m busy.",
    "I would make a joke about your life, but I see life already beat me to it"
];

bot.on('message', msg =>{
    let args = msg.content.substring(prefix.length).split(" ");
    switch(args[0].toLowerCase()){
        case 'help':
            msg.reply("no.");
            break;
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
                    msg.channel.send("@here" + `\nA new queue has been created!\nTo join the queue, type \'$q join\'!`);
                    showQueue();
                    user = null;
                } 
                else if(a == 'join')
                {
                    if(!queue.includes(user.username)){
                        queue.push(user.username);
                        queueNotify.push(user);
                        msg.channel.send(queueNotify + "\n" + user.username + " has been added to the queue!");
                        showQueue();
                    } else {
                        msg.reply("You are already in the queue!");
                    }
                    user = null;
                } 
                else if(a == 'clear')
                {
                    queue = [];
                    queueNotify = [];
                    showQueue();
                }
                else if(a == 'remove'){
                    let q = queue.indexOf(user.username);
                    delete queue[q];
                    let z = queueNotify.indexOf(user);
                    queueNotify.splice(z);
                    msg.reply("You have been removed from the queue.")
                    showQueue();
                }
            }
            if(args[1] == null){
                showQueue();
            }
            break;
        case 'roast':
            let mention = msg.mentions.users.first();
            if(msg.member.user.tag != "alice#0520"){
                msg.reply("Unfortunately, you are too beta for me to listen to.");
            } else if (args[1] ==  null || mention == null){
                msg.reply("Please tag a valid user to roast.");
            } else if (mention.tag == "Pandakidz2#0384"){
                msg.reply("I cannot roast my creator.");
            } else {
                msg.channel.send(mention.username + ", " + roastList[randomNumber(0, roastList.length-1)]);
            }
            break;
    }
    function showQueue(){
        if(queue.length == 0){
            msg.channel.send("No queue yet. Create a new queue with $q new!");
        } else {
            msg.channel.send("Current queue: \n" + queue);
        }
    }
})
function randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Don't edit anything below this!
bot.login(token);