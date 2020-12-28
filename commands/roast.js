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

module.exports = {
    name: 'roast',
    description: 'Roast people - Made for Alice\'s birthday',
    aliases: ['r'],
    guildOnly: true,
    args: true,
    usage: '<tagged user>',
    execute(msg, args){
        let mention = msg.mentions.users.first();
        if (args[0] ==  null || mention == null){
            msg.reply("Please tag a valid user to roast.");
        } else if (mention.tag == "Pandakidz2#0384"){
            msg.reply("I cannot roast my creator.");
        } else {
            msg.channel.send(mention.username + ", " + roastList[randomNumber(0, roastList.length - 1)]);
        }
    }
}

function randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}