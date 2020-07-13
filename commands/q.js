let queue = [];
let queueNotify = [];
let user = null;
module.exports = {
    name: 'q',
    description: 'Create and manage a queue to play games with others!',
    aliases: ['queue'],
    guildOnly: true,
    args: true,
    usage: 'show, new, join, clear, or remove',
    execute(msg, args){
        user = msg.member.user;
        const a = args[0];
        switch(args[0]){
            case 'show':
                msg.channel.send("Current queue: \n" + queue);
                break;
            case 'new':
                queue = [];
                queue.push(user.username);
                queueNotify.push(user);
                msg.channel.send("@here" + `\nA new queue has been created!\nTo join the queue, type \'$q join\'!`);
                showQueue();
                user = null;
                break;
            case 'join':
                if(!queue.includes(user.username)){
                    queue.push(user.username);
                    queueNotify.push(user);
                    msg.channel.send(queueNotify + "\n" + user.username + " has been added to the queue!");
                    showQueue();
                } else {
                    msg.reply("You are already in the queue!");
                }
                user = null;
                break;
            case 'clear':
                queue = [];
                queueNotify = [];
                showQueue();
                break;
            case 'remove':
                let q = queue.indexOf(user.username);
                delete queue[q];
                let z = queueNotify.indexOf(user);
                queueNotify.splice(z);
                msg.reply("You have been removed from the queue.")
                showQueue();
                break;
        }
        function showQueue(){
            if(queue.length == 0){
                msg.channel.send("No queue yet. Create a new queue with $q new!");
            } else {
                let display = []
                display.push("Current queue: ");
                queue.forEach(element => display.push(element));
                msg.channel.send(display);
            }
        }
    }
}

/* 
Add reactions to join queues,
Make people queued show up as a list
*/