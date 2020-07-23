const Discord = require('discord.js');
let dict = {
};
const queueVar = require('./queue.json');
let IDlist = [0];

module.exports = {
    name: 'q',
    description: 'Create and manage queues for an easier way to set up games (or anything else)! Type $q help for all of the specific commands!',
    aliases: ['queue'],
    execute(msg, args){
        class Queue {
            constructor(client, id, list, notify){
                this.id = id; // Stores the queue id
                this.list = [list] // List that contains all of the queue members
                this.client = client; // Stores who created the queue
                this.notify = [notify]; // Notifies people if a change occurs to the queue
                this.time = new Date(0); // Create a queue time
                this.timeChanged = false; // Store if the queue time has been changed.
                this.game = null; // Stores the game of the queue, if available
            }
        }
        switch(args[0].toLowerCase()){
            // Contains a list of all of the commands 
            case 'help':
                const qhelp = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle('PandaBot $q help commands')
                    .setAuthor('PandaBot $q help')
                    .setDescription("Below are all of the commands for the queues!");
                
                if(!args[1] || (args[1] != 1 && args[1] != 2)){
                    qhelp.addField("Ordinary Commands: ", "Type $q help 1 for commands that everyone can use!");
                    qhelp.addField("Queue Creator Commands: ", "Type $q help 2 for commands that queue creators can use!");
                } else if (args[1] == 1){
                    for(var h in queueVar.helpOrdinary){
                        qhelp.addField(h, queueVar.helpOrdinary[h]);
                    }
                } else if (args[1] == 2){
                    for(var q in queueVar.helpCreator){
                        qhelp.addField(q, queueVar.helpCreator[q]);
                    }
                } 
                msg.channel.send({embed: qhelp});
                break;
            // Create a new queue
            case 'new':
                if(!args[1]) msg.reply("Please provide a name for your queue");
                else {
                    for(var key in dict){
                        if(dict[key].client == msg.author.tag){
                            msg.reply("You already have a queue! End it to start another");
                            return;
                        }
                    }
                    if(Object.keys(dict).length == 0){
                        dict[args[1]] = new Queue(msg.author.tag, queueID(), msg.author.username, msg.author);
                        if(msg.guild.roles.cache.has('733398205198237716')){
                            const role = msg.guild.roles.cache.find(r => r.name === 'Queue Gang');
                            msg.channel.send("Queue Gang Notification: " + role.members.map(m => m.user).join('\n'));
                        }
                        msg.reply("You have created a new queue called " + args[1] + "!");
                    }
                    else {
                        let lengthCheck = 0;
                        for(var key in dict){
                            if(key != args[1]) lengthCheck++;
                        }
                        if(lengthCheck == Object.keys(dict).length){
                            dict[args[1]] = new Queue(msg.author.tag, queueID(), msg.author.username, msg.author);
                            if(msg.guild.roles.cache.has('733398205198237716')){
                                const role = msg.guild.roles.cache.find(r => r.name === 'Queue Gang');
                                msg.channel.send("Queue Gang Notification: A new queue has been created! \n" + role.members.map(m => m.user).join('\n'));
                            }
                            msg.reply("You have created a new queue called " + args[1] + "!");
                        }
                        else msg.reply("A queue with this name already exists!");
                    }
                }
                break;
            // Show existing queues
            case 'show':
                if(!args[1] && Object.keys(dict).length != 0){
                    msg.channel.send({embed: queueListEmbed()});
                } else if (args[1] && keyExists(args[1])){
                    msg.channel.send({embed: queueEmbed(findKey(args[1]))});
                } else {
                    msg.channel.send("No queues available. Create a new one!");
                }
                break;
            // Join existing queues
            case 'join':
                if(!args[1]) msg.reply("Please provide the name of the queue you would like to join.");
                else if ( args[1] && keyExists(args[1]) ){
                    let a = findKey(args[1]);
                    if(!inQueue(dict[a].list, msg.author.username)){
                        dict[a].list.push(msg.author.username);
                        dict[a].notify.push(msg.author);
                        msg.channel.send(notify(a) + "\n" + msg.author.username + " has joined queue " + a);
                        msg.channel.send({embed: queueEmbed(a)});
                    } else {
                        msg.reply("You are already in the queue!");
                    }
                } else {
                    msg.reply("Queue could not be found. Please try again.");
                }
                break;
            // Leave existing queues
            case 'leave':
                if(!args[1]) msg.reply("Please provide the name of the queue you would like to leave.");
                else if ( args[1] && keyExists(args[1]) ){
                    let a = findKey(args[1]);
                    if(dict[a].client == msg.author.tag){
                        delete IDlist[IDlist.indexOf(dict[a].id)];
                        deleteQueue(a);
                        msg.channel.send(msg.author.username + "\'s queue has been deleted.");
                    } else if(inQueue(dict[a].list, msg.author.username)){
                        var i = dict[a].list.indexOf(msg.author.username),
                            z = dict[a].notify.indexOf(msg.author);
                        delete dict[a].notify[z];
                        delete dict[a].list[i];
                        msg.reply(notify(a) + "\n" + msg.author.username + " has left queue " + a);
                        msg.channel.send({embed: queueEmbed(a)});
                        if(dict[a].list.length == 0){
                            delete IDlist[IDlist.indexOf(dict[a].id)];
                            deleteQueue(a);
                            msg.channel.reply("As " + a + " is now empty, it has been deleted.");
                        }
                    } else msg.reply("You are not in the queue!");
                } else msg.reply("Queue could not be found. Please ty again.");
                break;
            case 'gamelist':
                const gameEmbed = new Discord.MessageEmbed()
                    .setColor("NAVY")
                    .setTitle('Game List: ')
                    .setAuthor('PandaBot $q')
                    .setDescription("Below are a list of games that you can add to your queue!")
                    .setFooter('To set a game for your queue, type $q game <gameName>!');
                let list = [];    
                for(var g in queueVar.gameList){
                    list.push(g);
                }
                list.join(", ");
                gameEmbed.addField(list, '\u200b');
                msg.channel.send({embed: gameEmbed});
                break;
            case 'role':
                const role = msg.guild.roles.cache.find(r => r.name === 'Queue Gang');
                if(!msg.member.roles.cache.has('733398205198237716')){
                    msg.member.roles.add(role);
                    msg.reply("You will be notified everytime a queue is created!");
                } else if(msg.member.roles.cache.has('733398205198237716')){
                    msg.member.roles.remove(role);
                    msg.reply("You will no longer be notified everytime a queue is created.");
                } else msg.reply("Either you have this role, or your server does not have this role!");
                break;
        }
        // If the author has a queue, they will have special permissions over their own queue
        if(checkIfClient(msg.author.tag)){
            switch(args[0].toLowerCase()){
                case 'delete':
                    let tempD = findQueue(msg.author.tag);
                    delete IDlist[IDlist.indexOf(dict[tempD].id)];
                    deleteQueue(tempD);
                    msg.reply("Your queue, " + tempD + ", has been deleted.");
                    break;
                case 'add':
                    var mentionA = msg.mentions.users.first();
                    if(mentionA == null) msg.reply("Please tag a valid user to add to your queue");
                    else {
                        var tempA = findQueue(msg.author.tag);
                        dict[tempA].list.push(mentionA.username);
                        dict[tempA].notify.push(mentionA);
                        msg.channel.send(notify(tempA) + "\n" + mentionA.username + " has been added to queue " + tempA + "!");
                        msg.channel.send({embed: queueEmbed(tempA)});
                    }
                    break;
                case 'remove':
                    var mentionR = msg.mentions.users.first();
                    if(mentionR == null){
                        msg.reply("Please tag a valid user to remove from your queue");
                        return;
                    }
                    var tempR = findQueue(msg.author.tag);
                    if(inQueue(dict[tempR].list, mentionR.username)){
                        let i = dict[tempR].list.indexOf(mentionR.username),
                            z = dict[tempR].notify.indexOf(mentionR);
                        delete dict[tempR].notify[z];
                        delete dict[tempR].list[i];
                        msg.channel.send(notify(tempR) + "\n" +"<@"+mentionR.id+">" + " has been removed from queue " + tempR);
                        msg.channel.send({embed: queueEmbed(tempR)});
                    }
                    break;
                case 'time':
                    let argT = msg.content.slice(1).split(/ +/);
                    let time = argT[2].split(/:/);
                    var tempT = findQueue(msg.author.tag);
                    if(args[1] == 'clear'){
                        dict[tempT].timeChanged = false;
                        msg.reply("Queue time has been cleared.");
                        return;
                    }
                    
                    //Setting the queue time
                    if(argT[3] && argT[3].toLowerCase() == "pm"){
                        time[0] = parseInt(time[0],10)+12;  
                        time[0] = time[0].toString();  
                    }
                    dict[tempT].time.setHours(parseInt(time[0],10)-2);
                    if(time[1] == null) time.push(0); 
                    dict[tempT].time.setMinutes(time[1]);
                    dict[tempT].time.setSeconds(0);
                    dict[tempT].time.setMilliseconds(0);
                    dict[tempT].timeChanged = true;

                    //Displaying the queue time
                    var hour = dict[tempT].time.getHours();
                    let minute = dict[tempT].time.getMinutes();
                    let pm = " AM ";
                    if (hour > 12){
                        hour -= 12;
                        pm = " PM "
                    }
                    if(minute == 0) minute = "00";
                    msg.channel.send(notify(tempT) + "\n" + msg.author.username + "'s queue time has been set to " + hour + ":" + minute + pm + "MDT");         
                    break;
                case 'game':
                    let tempG = findQueue(msg.author.tag);
                    if(args[1].toLowerCase() == 'clear' && dict[tempG].game != null){
                        dict[tempG].game = null;
                        msg.reply("Your queue game has been cleared");
                        return;
                    }
                    else if(args[1].toLowerCase() == 'clear' && dict[tempG].game == null)
                        msg.reply("You have no game set for your queue!");
                    for(var g in queueVar.gameList){
                        if(g.toLowerCase() == args[1].toLowerCase()){
                            dict[tempG].game = g;
                            msg.reply("You have set your queue game to: " + g);
                        }
                    }
                    break;
            }
        }
    }
}

function queueListEmbed(){
    const queueList = new Discord.MessageEmbed()
        .setColor("NAVY")
        .setTitle('Available Queues')
        .setAuthor("PandaBot $q")
        .setDescription("Below are a list of available queues!")
        .addField("<id> -- <queue name> -- <game name (if available)>", "Both id and name can be used to join and leave queues!")
        .setFooter("Type $q show followed by the name of the queue to see more details about it!");

    for(var key in dict){
        let game = " -- " + "{no game selected}";
        if(dict[key].game != null){
            game = " -- " + dict[key].game;
        }
        queueList.addField(dict[key].id + " -- " + key + game, dict[key].client + "'s Queue");
    }
    return queueList;
}
function queueEmbed(q){
    const queue = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('List of people in ' + dict[q].client + "'s queue: " + q)
        .setDescription("Below are the list of members in the queue!")
        .setFooter("Type $q join " + q + " in order to join this queue!");
    // Change this after switching timezones back to EST
    if(dict[q].timeChanged == true) {
        let hour = dict[q].time.getHours()+2;
        let minute = dict[q].time.getMinutes();
        let pm = " am "
        if(hour>12){
            hour -= 12;
            pm = " pm ";
        }
        if(minute == 0) minute = "00";
        queue.setAuthor("Queue Time: " + hour + ":" + minute + pm + "Eastern Standard Time");
    }
    if(dict[q].game != null){
        queue.setThumbnail(queueVar.gameList[dict[q].game]);
    }
    let tempList = []
    for(var key in dict[q].list){
        tempList.push(dict[q].list[key]);
    }
    tempList.join(", ")
    queue.addField(tempList, '\u200b');
    return queue;
}
function notify(key){
    let notify = [];
    dict[key].notify.forEach(element => notify.push(element));
    return notify;
}
function inQueue(queue, person){
    for(var key in queue){
        if(queue[key] == person){
            return true;
        }
    }
    return false;
}
function keyExists(args){
    for(var key in dict){
        if(args == key) return true;
    }
    for(let i in dict){
        if(dict[i].id == args) return true;
    }
    return false;
}
function findKey(args){
    for(let k in dict){
        if(k == args) return k;
        else if(dict[k].id == args) return k;
    }
}
function checkIfClient(user){
    for(var key in dict){
        if(dict[key].client == user) return true;
    }
    return false;
}
function deleteQueue(name){
    for(var key in dict){
        if(key == name){
            delete dict[key];
        }
    }
}
function findQueue(client){
    for(var key in dict){
        if(dict[key].client == client) return key;
    }
}
function queueID(){
    for(var i = 0; i < IDlist.length + 1; i++){
        if(i!=IDlist[i]){
            IDlist[i]=i;
            return i;
        }
    }
}