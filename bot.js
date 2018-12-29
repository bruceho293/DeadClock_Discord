const botSettings = require("./auth.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});


//EMOJI FOR number;
var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.generateInvite(["ADMINISTRATOR"]).then(link => {
		console.log(link);
	}).catch(err => {
		console.log(err.stack);
	});
});

function makeTb(){
	var array = new Array(11);
	for(var i=0; i < array.length; i++){
		array[i] = new Array(9).fill(":green_book:");
	}

	var indexR = Math.round(array[0].length / 2) - 1;
  var indexC = Math.round(array.length / 2) - 1;
	array[indexR + 1][indexC - 1] = ":white_circle:";


	var currR = 5;
	var currC = 1;
	var counter = 12;
 	var stepR = -1;
	var stepC = 1;
	while (counter > 0){
		array[currR][currC] = ":large_blue_circle:";
		if(currR == 2)
			stepR = 1;
		if(currR == array.length - 3)
			stepR = -1;
		if(currC == array[0].length - 2)
			stepC = -1;
		currR += stepR;
		currC += stepC;
		counter--;
	}

	// array[0].fill("#");
	// array[array.length - 1].fill("#");
	// for(var j = 1; j < array.length - 1; j++){
	// 	array[j][0] = "#";
	// 	array[j][array.length - 1] = "#";
	// }
	return array;
}


//How the player move around the clock
function play(array, num){

	var currBR, currBC;
	var side = 1;//Decide if the player is going clockwise or counter clockwise.
	var nom = Math.abs(num);//The number of move.
	var fR = 2;
	var sR = 5;
	var tR = 8;
	var fC = 1;
	var sC = 4;
	var tC = 7;



	for (var i = 2; i < 9; i ++){
		var currIndex = array[i].indexOf(":black_circle:");
		if(currIndex == -1){
			if(i == 8)
				throw "error";
		} else {
			currBR = i;
			currBC = currIndex;
			break;
		}
  }
	array[currBR][currBC] = ":large_blue_circle:";


	if(num < 0){
		side = -1;
	}


	do{
		if(num > 0){
			if(fR < currBR && currBR <= sR && fC <= currBC && currBC < sC){
					currBR += -side;
					currBC += side;
					console.log("FIRST");
			}
			else if(fR <= currBR && currBR < sR && sC <= currBC && currBC < tC){
					currBR += side;
					currBC += side;
					console.log("SECOND");
			}
			else if(sR <= currBR && currBR < tR && sC < currBC && currBC <= tC){
					currBR += side;
					currBC += -side;
					console.log("THRID");
			}
			else if(sR < currBR && currBR <= tR && fC < currBC && currBC <= sC){
					currBR += -side;
					currBC += -side;
					console.log("FOURTH");
			}
		} else {
			if(fR <= currBR && currBR < sR && fC < currBC && currBC <= sC){
					currBR += -side;
					currBC += side;
					console.log("FIRST");
			}
			else if(fR < currBR && currBR <= sR && sC < currBC && currBC <= tC){
					currBR += side;
					currBC += side;
					console.log("SECOND");
			}
			else if(sR < currBR && currBR <= tR && sC <= currBC && currBC < tC){
					currBR += side;
					currBC += -side;
					console.log("THRID");
			}
			else if(sR <= currBR && currBR < tR && fC <= currBC && currBC < sC){
					currBR += -side;
					currBC += -side;
					console.log("FOURTH");
			}
		}
		nom = nom - 1;
		console.log(currBR, currBC);
	} while (nom > 0);

	array[currBR][currBC] =":black_circle:";

}

function start(array){
	array[5][1] = ":black_circle:";
}

var currTB = makeTb();

// Initialize the embeded message
const embed = new Discord.RichEmbed()
	.setTitle("This is your title, it can hold 256 characters")
	.addBlankField(true)
	.setAuthor("Huan Ho (Bruce)")
	.setColor(0x00AE86)
	.setFooter("This is the footer text, 2048 characters")
	.addBlankField(true)
	.setDescription(currTB)


const sampleEmbed = new Discord.RichEmbed()
	.setTitle("This is a sample embed testing the changes when hit the react emoji")
	.addBlankField(true)
	.set

/////////////////////////////
bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let argsM = message.content.split(" ");
	let cmd = argsM[0];
	let args = argsM.slice(1);

	if(!cmd.startsWith(prefix)) return;


	if(cmd === `${prefix}start`){
		start(currTB);
		embed.setDescription(currTB)
		message.channel.send({embed});
	}

	if(cmd === `${prefix}play`){
		try {
			play(currTB, parseInt(argsM[1]));
			embed.setDescription(currTB);
			message.channel.send({embed});
		} catch(err){
			message.channel.send(err);
		}
	}

	if(cmd === `${prefix}check`){
		// const embed = new Discord.RichEmbed()
		// 	.setTitle("This is your title, it can hold 256 characters")
		// 	.setAuthor("Huan Ho (Bruce)")
		// 	.setColor(0x00AE86)
		// 	.setFooter("This is the footer text, 2048 characters")
		// 	.addBlankField(true)
		// 	.setDescription(currTB)
		currTB = makeTb();
		embed.setDescription(currTB);
		message.channel.send({embed});
	}

	if(cmd === 	`${prefix}game`){
		currTB = makeTb();
		embed.setDescription(currTB);
		message.channel.send({embed})
		.then(sentEmbed => {
			sentEmbed.react(reaction_numbers[0]);
			sentEmbed.react(reaction_numbers[1]);
			sentEmbed.react(reaction_numbers[2]);
			sentEmbed.react(reaction_numbers[3]);
			sentEmbed.react(reaction_numbers[4]);
		});

	}

	if(cmd === `${prefix}emoji`){
		const emoji = client.emojis.find(emoji => emoji.name === "ayy");
		message.channel.send(`${emoji} is a emoji`);
	}

});

bot.login(botSettings.token);
