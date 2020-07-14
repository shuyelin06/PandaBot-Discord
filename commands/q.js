let dict = {
};
let gameSelection ={ 
    "League": "league icon",
};
module.exports = {
    name: 'q',
    description: 'Create and manage queues for an easier way to set up games (or anything else)! Type $q help for all of the specific commands!',
    aliases: ['queue'],
    execute(msg, args){
        class Queue {
            constructor(client){
                this.list = []
                this.client = client;
                this.notify = [];
                this.time = new Date();
            }
        }
        
        switch(args[0]){
            case 'help':
                let qhelp = [];
                qhelp.push(`**PandaBot Queue ($q) Commands: **`);
                qhelp.push("\n**Ordinary Comands: **");
                qhelp.push("**new**: Create a new queue that others can join (limit one queue per person)!");
                qhelp.push("**show [queue name]**: Show all of the existing queues, as well as their creator! Add the queue name after 'show' to get a list of the people in a specific queue!");
                qhelp.push("**join <queue name>**: Join an existing queue. Make sure you type the correct nme of the queue.");
                qhelp.push("**leave <queue name>**: Leave an existing queue. Make sure you type the correct queue name");

                qhelp.push(`\n**Queue Creator Commands: **`);
                qhelp.push("These commands can be used by those that have created their queue. They allow for some extra permissions for you to manage your queue.");
                qhelp.push("**delete**: Delete your current queue.");
                qhelp.push("**add <user>**: Add a user to your current queue.");
                qhelp.push("**remove <user>**: Remove a user from your current queue.");
                msg.channel.send(qhelp);
                break;
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
                        dict[args[1]] = new Queue(msg.author.tag);
                        dict[args[1]].list.push(msg.author.username);
                        dict[args[1]].notify.push(msg.author);
                        msg.reply("You have created a new queue called " + args[1] + "!");
                    }
                    else {
                        let lengthCheck = 0;
                        for(var key in dict){
                            if(key != args[1]) lengthCheck++;
                        }
                        if(lengthCheck == Object.keys(dict).length){
                            dict[args[1]] = new Queue(msg.author.tag);
                            dict[args[1]].list.push(msg.author.username);
                            dict[args[1]].notify.push(msg.author);
                            msg.reply("You have created a new queue called " + args[1] + "!");
                        }
                        else msg.reply("A queue with this name already exists!");
                    }
                }
                break;
            case 'show':
                if(!args[1] && Object.keys(dict).length != 0){
                    msg.channel.send(display(dict));
                } else if (args[1] && keyExists(args[1])){
                    msg.channel.send(display(dict[args[1]].list));
                } else {
                    msg.channel.send("Nothing could be found. Please try again.");
                }
                break;
            case 'join':
                if(!args[1]) msg.reply("Please provide the name of the queue you would like to join.");
                else if (args[1] && keyExists(args[1])){
                    if(!inQueue(dict[args[1]].list, msg.author.username)){
                        dict[args[1]].list.push(msg.author.username);
                        dict[args[1]].list.push(msg.author);
                        msg.channel.send(notify(args[1]) + "\n" + msg.author.username + " has joined queue " + args[1]);
                        msg.channel.send(display(dict[args[1]].list));
                    } else {
                        msg.reply("You are already in the queue!");
                    }
                } else msg.reply("Queue could not be found. Please try again.");
                break;
            case 'leave':
                if(!args[1]) msg.reply("Please provide the name of the queue you would like to leave.");
                else if (args[1] && keyExists(args[1])){
                    if(dict[args[1]].client == msg.author.tag){
                        deleteQueue(args[1]);
                        msg.channel.send(msg.author.username + "\'s queue has been deleted.");
                    } else if(inQueue(dict[args[1]].list, msg.author.username)){
                        var i = dict[args[1]].list.indexOf(msg.author.username);
                        var z = dict[args[1]].notify.indexOf(msg.author);
                        delete dict[args[1]].notify[z];
                        delete dict[args[1]].list[i];
                        msg.reply(notify(args[1]) + "\n" + msg.author.username + " has left queue " + args[1]);
                        msg.channel.send(display(dict[args[1]].list));
                        if(dict[args[1]].list.length == 0){
                            deleteQueue(args[1]);
                            msg.channel.reply("As " + args[1] + " is now empty, it has been deleted.");
                        }
                    } else msg.reply("You are not in the queue!");
                } else msg.reply("Queue could not be found. Please ty again.");
                break;
        }
        // If the author has a queue, they will have special permissions over their own queue
        if(checkIfClient(msg.author.tag)){
            switch(args[0]){
                case 'delete':
                    let tempD = findQueue(msg.author.tag);
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
                        msg.channel.send(display(dict[tempA].list));
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
                        let i = dict[tempR].list.indexOf(mentionR.username);
                        let z = dict[tempR].notify.indexOf(mentionR);
                        delete dict[tempR].notify[z];
                        delete dict[tempR].list[i];
                        msg.channel.send(notify(tempR) + "\n" +"<@"+mentionR.id+">" + " has been removed from queue " + tempR);
                        msg.channel.send(display(dict[tempR].list));
                    }
                    break;
                case 'time':
                    let argT = msg.content.slice(1).split(/ +/);
                    let time = argT[2].split(/:/);
                    var tempT;
                    for(var key in dict){
                        if(dict[key].client == msg.author.tag) tempT = key;
                    }
                    
                    //Setting the queue time
                    if(argT[3] && argT[3].toLowerCase() == "pm"){
                        time[0] = parseInt(time[0],10)+12;  
                        time[0] = time[0].toString();  
                    }
                    dict[tempT].time.setHours(time[0]);
                    if(time[1] == null) time.push(0); 
                    dict[tempT].time.setMinutes(time[1]);
                    dict[tempT].time.setSeconds(0);
                    dict[tempT].time.setMilliseconds(0);

                    //Displaying the queue time
                    var hour = dict[tempT].time.getHours();
                    let minute = dict[tempT].time.getMinutes();
                    let pm = " AM ";
                    if (hour > 12){
                        hour -= 12;
                        pm = " PM "
                    }
                    if(minute == 0) minute = "00";
                    msg.channel.send(notify(tempT) + "\n" + msg.author.username + "'s queue time has been set to " + hour + ":" + minute + pm + "EST");   
                    console.log(dict[tempT].time);                 
                    break;
                case 'game':

                    break;
            }
        }
    }
}

function display(list){ 
    let display = [];
    if(Array.isArray(list)){
        display.push("Current queue: ");
        for(var key in list){
            display.push(list[key]);
        }
    } 
    else {
        display.push("Current queues: ");
        for(var key in list){
            display.push(key + "  --  " + dict[key].client + "\'s Queue");
        }
    }
    display.push("\nNote: To access a specific queue, type $q show followed by the queue name!");
    return display;
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
    return false;
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