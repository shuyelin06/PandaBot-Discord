const Discord = require('discord.js');
const data = require('./events.json');
const fs = require("fs");

module.exports = {
    name: 'event',
    description: 'Create and manage discord server events!',
    aliases: ['e', 'events'],
    execute(msg, args){
        class Event {
            constructor(admin){
                this.admins = [admin];
                this.players = [];
                this.spectators = [];
            }
        }
        switch(args[0].toLowerCase()){
            case "help":
                msg.reply("This command is still a WIP. Go annoy Pandakidz2 to get it finished faster");
                break;
            case "new":
                if(!args[1]){
                    msg.reply("Please provide a valid name.")
                    break;
                } else if(data[args[1]] != null){
                    msg.reply("An event with that name already exists!");
                    break;
                }
                let id = Object.keys(data).length;
                for(var key in data){
                    if(data[key]["id"]==id) id++;
                }
                if(!isNaN(args[1])){
                    msg.reply("Your name cannot begin with a number.")
                    break;
                }
                let name = args.slice(1, args.length).join(" ");
                console.log(name);
                data[name] = {
                    "list": new Event(msg.author.username),
                    "time": "",
                    "id": id,
                    "description": "Admins, Players, and Spectators of this event."
                };
                writeFile();
                msg.reply("Success! Your event " + name + " has been created!");
                break;
            case "show":
                const embed = new Discord.MessageEmbed()
                    .setColor("NAVY");

                if(!args[1]){
                    embed
                        .setTitle('All Current Events')
                        .setDescription("Every current event that is ongoing!");
                    for(var key in data){
                        let temp = []
                        for(var i in data[key]["list"]["admins"]){
                            temp.push(data[key]["list"]["admins"][i])
                        }
                        embed.addField(key + " - ID: " + data[key]["id"], temp.join(", ") + "'s Event");
                    }
                    msg.channel.send(embed);
                    break;
                }
                try{
                    if(!isNaN(args[1])){
                        args[1] = eventID(parseInt(args[1],10));
                    } else if(args.length > 2){
                        args[1] = args.slice(1, args.length).join(" ");
                    }
                    embed
                        .setTitle("Event: " + args[1])
                        .setDescription(data[args[1]]["description"]);
                    for(var key in data[args[1]]["list"]){
                        if(data[args[1]]["list"][key].length == 0) embed.addField(key, "Empty");
                        else embed.addField(key.toUpperCase() + " (" + data[args[1]]["list"][key].length + ")", data[args[1]]["list"][key].join("\n"));
                    }
                    if(data[args[1]]["time"] != ""){
                        embed.setFooter("Time of event: " + data[args[1]]["time"]);
                    }
                    msg.channel.send(embed);
                } catch(error){
                    msg.reply("There was an error in running that command.")
                }
                break;
            case "join":
                if(!args[1]){
                    msg.reply("Please include a valid event.");
                    break;
                }
                try {
                    if(!isNaN(args[1])){
                        args[1] = eventID(parseInt(args[1],10));
                    } else if(args.length > 2){
                        args[1] = args.slice(1, args.length).join(" ");
                    }
                    for(var i in data[args[1]]["list"]["players"]){
                        if(data[args[1]]["list"]["players"][i] == msg.author.username){
                            msg.reply("You are already participating in the event!");
                            break;
                        }
                    }
                    data[args[1]]["list"]["players"].push(msg.author.username);
                    writeFile();
                    msg.reply("You have been added to event " + args[1] + "!");
                } catch(error) {
                    msg.reply("There was an error in running that command.");
                }
                break;
            case "spectate":
                if(!args[1]){
                    msg.reply("Please include a valid event.");
                    break;
                }
                try {
                    if(!isNaN(args[1])){
                        args[1] = eventID(parseInt(args[1],10));
                    } else if(args.length > 2){
                        args[1] = args.slice(1, args.length).join(" ");
                    }
                    let spectating = false;
                    for(var i in data[args[1]]["list"]["spectators"]){
                        if(data[args[1]]["list"]["spectators"][i] == msg.author.username){
                            msg.reply("You are already spectating this event!");
                            spectating = true;
                            break;
                        }
                    }
                    if(spectating == true) break;
                    data[args[1]]["list"]["spectators"].push(msg.author.username);
                    writeFile();
                    msg.reply("You are now spectating event " + args[1] + "!");
                } catch(error) {
                    msg.reply("There was an error in running that command.");
                }
                break;
            case "clear":
                if(msg.author.username != "Pandakidz2") break;
                if(!args[1]){
                    for(var key in data){
                        delete data[key];
                    }
                    writeFile();
                    msg.reply("All events have been cleared.");
                    break;
                } else {
                    try{
                        if(!isNaN(args[1])){
                            args[1] = eventID(parseInt(args[1],10));
                        } else if(args.length > 2){
                            args[1] = args.slice(1, args.length).join(" ");
                        }
                        delete data[args[1]]
                        writeFile();
                        msg.reply("Event " + args[1] + " has been cleared.");
                    } catch(error){
                        msg.reply("There was an error in running that command.");
                    }
                }
                break;
            case "leave":
                if(!args[1]){
                    msg.reply("Please include a valid event.");
                    break;
                }
                try{
                    if(!isNaN(args[1])){
                        args[1] = eventID(parseInt(args[1],10));
                    } else if(args.length > 2){
                        args[1] = args.slice(1, args.length).join(" ");
                    }
                    let j = data[args[1]]["list"]["players"].indexOf(msg.author.username);
                    if(j == -1){
                        msg.reply("You are not in this event!");
                        break;
                    }
                    data[args[1]]["list"]["players"].splice(j, 1);
                    writeFile();
                    msg.reply("You have stopped participating in event " + args[1]);
                } catch(error){
                    msg.reply("There was an error in running that command.")
                }
                break;
            case "!spectate":
                if(!args[1]){
                    msg.reply("Please include a valid event.")
                    break;
                }
                try{
                    if(!isNaN(args[1])){
                        args[1] = eventID(parseInt(args[1],10));
                    } else if(args.length > 2){
                        args[1] = args.slice(1, args.length).join(" ");
                    }
                    let j = data[args[1]]["list"]["spectators"].indexOf(msg.author.username);
                    if(j == -1){
                        msg.reply("You are not spectating this event!");
                        break;
                    }
                    data[args[1]]["list"]["spectators"].splice(j,1);
                    writeFile();
                    msg.reply("You have stopped spectating event " + args[1]);
                } catch(error){
                    msg.reply("There was an error in running that command.")
                }
                break;
        }
        if(!isNaN(args[0])){
            args[0] = eventID(parseInt(args[0],10));
        } 
        if(eventExists(args[0])){
            let admin = false;
            for(var i in data[args[0]]["list"]["admins"]){
                if(data[args[0]]["list"]["admins"][i] == msg.author.username) admin = true;
            }
            if(!admin){
                msg.reply("You are not an admin!");
                return;
            }
            switch(args[1].toLowerCase()){
                case "time":
                    try{
                        let time = args.slice(2, args.length).join(" ");
                        data[args[0]]["time"] = time;
                        writeFile();
                        msg.reply("Your event's time has been set to " + time);
                    } catch(error){
                        msg.reply("There was an error in running that command.")
                    }
                    break;
                case "admin":
                    try{
                        let mention = msg.mentions.users.first();
                        data[args[0]]["list"]["admins"].push(mention.username);
                        writeFile();
                        msg.reply("User " + mention.tag + " has been added as an admin!");
                    } catch(error){
                        msg.reply("There was an error in running that command.")
                    }
                    break;
                case "describe":
                    try{
                        let description = args.slice(2, args.length).join(" ");
                        data[args[0]]["description"] = description;
                        writeFile();
                        msg.reply("You have set a description for your event " + args[0]);
                    } catch(error){
                        msg.reply("There was an error in running that command.");
                    }
                    break;
                case "delete":
                    delete data[[args[0]]];
                    writeFile();
                    msg.reply("Event " + args[0] + " has been deleted.");
                    break;
            }
        }
    }
}

function eventExists(input){
    for(var key in data){
        if(input==key) return true;
    }
    return false;
}

function writeFile(){
    fs.writeFile('./commands/events.json', JSON.stringify(data), err => {
        if (err) console.log('Error writing file'); 
    })
}

function eventID(id){
    for(var key in data){
        if(data[key]["id"] == id) return key;
    }
}