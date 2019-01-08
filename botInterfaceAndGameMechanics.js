const botSettings = require("./auth.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});


//EMOJI FOR number;
var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]

//Start of the game


//assign clock positions with no _clock. Variables that have _clock will store the position in 2D array.
let playerPosition = random(), hourPosition = random(), minPosition = random(), secPosition = random();
start(currTB, playerPosition, ":large_blue_circle")
//SetUp Values
let life = 2, flashlight = 5, level = 1, difficulty = 0;

//assign different positions for bots
var a = [1,2,3,4,5,6,7,8,9,10,11,12];
var pos_clock = [
	[3, 5],
	[4, 6],
	[5, 7],
	[6, 6],
	[7, 5],
	[8, 4],
	[7, 3],
	[6, 2],
	[5, 1],
	[4, 2],
	[3, 3],
	[2, 4]
]

var n;
var r=[];
for (n=1; n<=5; ++n)
  {
    var i = Math.floor((Math.random() * (12-n)) + 1);
    r.push(a[i]);
    a[i] = a[12-n];
  }
let bot1 = r[0], bot2 = r[1], bot3 = r[2], bot4 = r[3], bot5 = r[4];
var bot1_clock = pos_clock[bot1 - 1], bot2_clock = pos_clock[bot2 - 1], bot3_clock = pos_clock[bot3 - 1], bot4_clock = pos_clock[bot3 - 1], bot5_clock = pos_clock[bot5 - 1];

//assign different positions for snake/flashlight
var r=[];
for (n=1; n<=3; ++n)
  {
    var i = Math.floor((Math.random() * (12-n)) + 1);
    r.push(a[i]);
    a[i] = a[12-n];
  }
let snake1 = r[0], snake2 = r[1], flash = r[2];
var snake1_clock = pos_clock[snake1 - 1], snake2_clock = pos_clock[snake2 - 1], flash = pos_clock[flash - 1];


var instruction_1 = "🤖: Okay, let's go over some rules. You are trapped inside a clock 🕰️(The position goes from 1~12).Your goal is to survive certain amount of levels (depending on the difficutly).";
var instruction_2 = "There are 3️⃣ main things to avoid. An hour-hand clock moves up once, a minute-hand moves up twice, a second-hand moves up three times every turn. If your position matches with any of the clock at the end of the turn, you will die 💀.";
var instruction_3 = "Before the clock moves, you get to choose either to move up ☝️ or down 👇, and either by once 1️⃣ or twice 2️⃣ every turn.";
var instruction_4 = "Tip on how to survive 💁 : you would need to be aware of where the clock hands are, and your current position. To help you with survival, you are given 3 flashlights 💡. You get to use flashlight to check your surroundings.";
var instruction_5 = "All animals 🐖 have different abilities and tell you different things. They are there to either help you or harm you. You find out which one is the bad one! 😉 Lastly, when you walk around, you might step on something 🤔.";
var instruction_6 = "It could be another flashlight or a snake🐍 You probably don't want to get bit by a snake because they are painful! 😥 This game will test your decision making and how smart you are 🧠";
var instruction_7 = "If you think you are brave enough to test your knowledge, let's try it 🤩 !!! . -This game will shut down in 5 minutes if you don't respond";
var instruction_8 = "Press 1 to move up one time, 2 to move up twice, 3 to move down one time and 4 to move down twice";


var content = "";
//Functions

//Generates random values from 1~12

//Game mechanics
function random() {
  return Math.floor(Math.random() * 11)+1
}
function random3() {
  return Math.floor(Math.random() * 2)+1
}

function setUp(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
 	const filt = (msg) => (msg.author.id === message.author.id) && ["1","2","3"].includes(msg.content);
	const opts = { maxMatches: 1, time: 60000, errors: [ 'time' ] }

	//Decides the difficulty
 	message.channel.send("🤖: 'Please select the difficulty. " + "\n1: Easy👶[5 Levels, Tells your starting and clock positions, +1,000 EXP]" + "\n2: Normal👦[5 Levels, Tells your starting position, +5,000 EXP]" + "\n3: Hard👹[10 Levels, Does not tell you anything, +10,000 EXP]" +  "\n`You have a minute to decide`");

	message.channel.awaitMessages(filt, opts)
	.then(col => {
		const m = col.first().content
		const val1 = m === "1";
		const val2 = m === "2";
		const val3 = m === "3";
	if(val1) {
		message.channel.send("🤖: 'You have selected an easy difficulty👶'" + `\n🤖: 'You have spawned on position ${playerPosition}, hour-hand on position ${hourPosition}, minute-hand on position ${minPosition}, second-hand on position ${secPosition},'`);
		difficulty = 0;
	 	}
		else if(val2) {
	 	message.channel.send("🤖: 'You have selected a normal difficulty🧑'" + `\n🤖: 'You have spawned on position ${playerPosition}'`);
	 	difficulty = 1;
		if (playerPosition == hourPosition || playerPosition == minPosition || secPosition == hourPosition || playerPosition-1 == hourPosition || playerPosition-1 == minPosition || playerPosition-1 == secPosition || playerPosition+1 == hourPosition || playerPosition+1 == minPosition || playerPosition+1 == secPosition){
			message.channel.send(`🤖: ⚠️!!! WARNING!!!⚠️` + `\n'Watch out! There is something near you'`);
			message.channel.send(`😣: I can hear the clock... but I can't tell if it's coming from above, below, or here because of echo...'`);
		}
		else{
		 	message.channel.send(`🤖: 'It seems like there isn't anything near you yet'`);
		 	}
		}
	 else {
			message.channel.send("🤖: 'You have selected a hard difficulty👹'" + `\n🤖: 'No extra hints will be given'`);
			difficulty = 2;
		}
		check(snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
	})
	.catch(err => {
		 message.channel.send("🤖: 'You took too long! The game has ended 😥'");
	})
}

function quote1(bot1) {
  	if (bot1 % 1 == 0){
      message.channel.send("🐮: 'Now I'm ANGRY!'" + "\n😨: 'Okay... Chill there big cow'");
    }
    else {
      message.channel.send("😱: 'I see a dead Alistar over there...'");
    }
}

function quote2(bot2, hourPosition, minPosition, secPosition) {
    if (bot2 % 1 == 0){
    	if (bot2+1 == hourPosition ||bot2+1 == minPosition || bot2+1 == secPosition){
        message.channel.send("🐵: 'Been waiting for this!'" + "\n🐵: 'I will tell you that something is right above me!'" + "\n😁: 'OMG Thank you Wukong!'");
      }

      else if (bot2-1 == hourPosition ||bot2-1 == minPosition || bot2-1 == secPosition){
        message.channel.send("🐵: 'Been waiting for this!'" + "\n🐵: 'I will tell you that something is right below me!'" + "\n😁: 'OMG Thank you Wukong!'");
      }

      else {
       	message.channel.send("🐵: 'Hey there! I will tell you that nothing has passed me recently'" + "\n😁: 'OMG Thank you Wukong!'");
      }
    }
    else {
      message.channel.send("😱: 'I see a dead Wukong over there...'");
    }
}

function quote3(bot3) {
  	if (bot3 % 1 == 0){
      message.channel.send("🧟: 'Mundo!'" + "\n😌: 'Oh it's just Mundo..'");
    }
    else {
      message.channel.send("😱: 'I see a dead Mundo over there...'" + "\n🧟: 'MUNDO TOO STRONG FOR YOU!'" + "\n😮: 'Dr.Mundo revived...'");
      bot3 = random();
    }
}

function quote4(bot4, hourPosition, minPosition, secPosition) {
    if (bot4 % 1 == 0){
      let highest = 0;
      if (hourPosition > minPosition && hourPosition > secPosition){
      	highest = hourPosition;
      }
      if (minPosition > hourPosition && minPosition > secPosition){
        highest = minPosition;
      }
      if (secPosition > minPosition && secPosition > hourPosition){
        highest = secPosition;
      }
    	message.channel.send("👁️: 'What do you see up there?'" + `\n🦅: 'I will tell you the highest number the clock is pointing.'` + `'\n I see something at ${highest}'` + "\n😍: 'Sweet! Thanks Quinn!'");
    	}
    else {
      message.channel.send("😱: 'I see a dead Quinn over there...'");
    }
}

function quote5(bot5, life) {
    if (bot5 % 1 == 0){
      message.channel.send("🐀: 'It's me! Hahahahaa!!'" + "\n🤢: 'YIKES!!! Not good... I got poisoned...'");
      life--;
      return life;
    }
    else {
      message.channel.send("😱: 'I see a dead Twitch over there...'");
    }
}

//Interface of the game

//Construct the the clock
function makeTb(){
	var array = new Array(11);
	for(var i=0; i < array.length; i++){
		array[i] = new Array(9).fill(":orange_book:");
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
		array[currR][currC] = ":black_circle:";
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

	return array;
}
//End of the construction

//get the position of every characters
//Movement
function play(array, num, emoji){

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
		var currIndex = array[i].indexOf(":large_blue_circle:");
		if(currIndex == -1){
			if(i == 8)
				throw "error";
		} else {
			currBR = i;
			currBC = currIndex;
			break;
		}
  }
	array[currBR][currBC] = ":black_circle:";

	if(num < 0){
		side = -1;
	}
	do{
		if(num > 0){
			if(fR < currBR && currBR <= sR && fC <= currBC && currBC < sC){
					currBR += -side;
					currBC += side;
			}
			else if(fR <= currBR && currBR < sR && sC <= currBC && currBC < tC){
					currBR += side;
					currBC += side;
			}
			else if(sR <= currBR && currBR < tR && sC < currBC && currBC <= tC){
					currBR += side;
					currBC += -side;
			}
			else if(sR < currBR && currBR <= tR && fC < currBC && currBC <= sC){
					currBR += -side;
					currBC += -side;
			}
		} else {
			if(fR <= currBR && currBR < sR && fC < currBC && currBC <= sC){
					currBR += -side;
					currBC += side;
			}
			else if(fR < currBR && currBR <= sR && sC < currBC && currBC <= tC){
					currBR += side;
					currBC += side;
			}
			else if(sR < currBR && currBR <= tR && sC <= currBC && currBC < tC){
					currBR += side;
					currBC += -side;
			}
			else if(sR <= currBR && currBR < tR && fC <= currBC && currBC < sC){
					currBR += -side;
					currBC += -side;
			}
		}
		nom = nom - 1;
		console.log(currBR, currBC);
	} while (nom > 0);

	array[currBR][currBC] = emoji;
}
//End of movement in the clock

function start(array, pos){
// Position 9 is the first place for every characters to appear in the clock before taking notice of their real assigned positions.
	array[5][1] = ":large_blue_circle:";
	//var randomMoves = Math.abs(Math.random() * 12);
	//play(currTB, randomMoves);
	var position_on_the_clock = pos - 9;
	play(currTB, position_on_the_clock);
}

//End of the interface

//End of Functions

// Initialize the embeded message
var currTB = makeTb();
// const embedIns = new Discord.RichEmbed()
// 	.setTitle("DeadClock")
// 	.setAuthor("By Chocolate Rose")
// 	.setFooter("Fun strategy game on Discord")
// 	.setDescription("These are things you should know to beat the game")
// 	.addField("RULES", instruction_1)
// 	.addField("RULES", instruction_2)
// 	.addField("RULES", instruction_3)
// 	.addField("TIP", instruction_4)
// 	.addField("INFOR", instruction_5)
// 	.addField("INFOR", instruction_6)
// 	.addField("INFOR", instruction_7)
// 	.addField("GAMEPLAY", instruction_8)

const embed = new Discord.RichEmbed()
	.setTitle("This is your title, it can hold 256 characters")
	.setAuthor("Huan Ho (Bruce)")
	.setColor(0x00AE86)
	.setDescription(currTB)
	.addBlankField(true);
	.setFooter(content);
////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////



bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.generateInvite(["ADMINISTRATOR"]).then(link => {
		console.log(link);
	}).catch(err => {
		console.log(err.stack);
	});
});

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
			if(argsM[1]){
				play(currTB, parseInt(argsM[1]));
			embed.setDescription(currTB);
			message.channel.send({embed})
		}
		else
			message.channel.send("Please enter the steps after \"play\"");
		} catch(err){
			message.channel.send(err);
		}
	}

	if(cmd === `${prefix}check`){
		currTB = makeTb();
		embed.setDescription(currTB);
		message.channel.send({embed});
	}

	if(cmd === `${prefix}gameinfor`){
		const embedInstruction = new Discord.RichEmbed()
			.setTitle("DeadClock")
			.setAuthor("By Chocolate Rose")
			.setColor(0x00AE86)
			.setFooter("Fun strategy game on Discord")
			.addField("RULES", instruction_1)
			.addField("RULES", instruction_2)
			.addField("RULES", instruction_3)
			.addField("TIP", instruction_4)
			.addField("INFOR", instruction_5)
			.addField("INFOR", instruction_6)
			.addField("INFOR", instruction_7)
			.addField("GAMEPLAY", instruction_8)
		message.channel.send({embedInstruction});
	}

	if(cmd === 	`${prefix}game`){
		currTB = makeTb();
		start(currTB);
		embed.setDescription(currTB);
		message.channel.send({embed}).then(message => {
			message.react(reaction_numbers[1]).then(MessageReaction => {
				message.react(reaction_numbers[2]).then(MessageReaction => {
					message.react(reaction_numbers[3]).then(MessageReaction =>{
						message.react(reaction_numbers[4]).then(MessageReaction => {
							message.react("🤚").then(MessageReaction => {
								message.react(":no_entry:").then(MessageReaction => {
									message.react(":a:").then(MessageReaction => {

									}).catch();
								}).catch();
							}).catch();
						}).catch();
					}).catch();
				}).catch();
			}).catch();
		})
	}

	if(cmd === `${prefix}emoji`){
		const emoji = client.emojis.find(emoji => emoji.name === "ayy");
		message.channel.send(`${emoji} is a emoji`);
	}

	if(cmd === `${prefix}update`){
		message.channel.edit(sampleEmbed.setDescription(argsM[1]));
	}
});

bot.on("messageReactionAdd",(messageReaction) => {
	if(messageReaction.emoji.name == reaction_numbers[1]){
		play(currTB, 1);
	}
	else if (messageReaction.emoji.name == reaction_numbers[2]){
		play(currTB, 2);
	}
	else if (messageReaction.emoji.name == reaction_numbers[3]){
		play(currTB, -1);
	}
	else if (messageReaction.emoji.name == reaction_numbers[4]){
		play(currTB, -2);
	}
	// else if (messageReaction.emoji.name == "🤚"){
	//
	// }

	embed.setDescription(currTB);
	messageReaction.message.edit({embed});
});

bot.login(botSettings.token);
