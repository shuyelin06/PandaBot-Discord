let dict = {
};
module.exports = {
    name: 'q',
    description: 'A test version of the new queue',
    aliases: ['queue'],
    execute(msg, args){
        class Queue {
            constructor(client){
                this.list = []
                this.client = client;
                this.notify = [];
            }
        }

        switch(args[0]){
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
                        msg.reply("You have created a new queue called " + args[1] + "!");
                    }
                    else {
                        let lengthCheck = 0;
                        for(var key in dict){
                            if(key != args[1]) lengthCheck++;
                        }
                        if(lengthCheck == Object.keys(dict).length){
                            dict[args[1]] = new Queue(msg.author.tag);
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
                    dict[args[1]].list.push(msg.author.username);
                    msg.reply("You have been added to queue " + args[1]);
                } else msg.reply("Queue could not be found. Please try again.");
                break;
        }
    }
}

function display(list){
    let display = [];
    display.push("Current queue: ");
    if(Array.isArray(list)){
        for(var key in list){
            display.push(list[key]);
            console.log(key);
        }
    } 
    else {
        for(var key in list){
            display.push(key);
            console.log(key);
        }
    }
    display.push("Note: To access a specific queue, type $q show followed by the queue name!");
    return display;
}

function inQueue(){
    
}
function keyExists(args){
    for(var key in dict){
        if(args == key) return true;
    }
    return false;
}