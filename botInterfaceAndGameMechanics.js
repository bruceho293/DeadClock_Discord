const botSettings = require("./auth.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});



bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	bot.generateInvite(["ADMINISTRATOR"]).then(link => {
		console.log(link);
	}).catch(err => {
		console.log(err.stack);
	});
});

//EMOJI FOR number;
var reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
var currTB;
//Start of the game


//assign clock positions with no _clock. Variables that have _clock will store the position in 2D array.
let playerPosition = random(), hourPosition = random1(playerPosition), minPosition = random1(playerPosition), secPosition = random1(playerPosition);

//SetUp Values
let life = 2, flashlight = 5, level = 1, difficulty = 0;

//assign different positions for bots
var a = [1,2,3,4,5,6,7,8,9,10,11,12];

var n;
var r=[];
for (n=1; n<=5; ++n)
  {
    var i = Math.floor((Math.random() * (12-n)) + 1);
    r.push(a[i]);
    a[i] = a[12-n];
  }
let bot1 = r[0], bot2 = r[1], bot3 = r[2], bot4 = r[3], bot5 = r[4];
// var bot1_clock = pos_clock[bot1 - 1], bot2_clock = pos_clock[bot2 - 1], bot3_clock = pos_clock[bot3 - 1], bot4_clock = pos_clock[bot3 - 1], bot5_clock = pos_clock[bot5 - 1];

//assign different positions for snake/flashlight
var r=[];
for (n=1; n<=3; ++n)
  {
    var i = Math.floor((Math.random() * (12-n)) + 1);
    r.push(a[i]);
    a[i] = a[12-n];
  }
let snake1 = r[0], snake2 = r[1], flash = r[2];
// var snake1_clock = pos_clock[snake1 - 1], snake2_clock = pos_clock[snake2 - 1], flash_clock = pos_clock[flash - 1];


var instruction_1 = "🤖: Okay, let's go over some rules. You are trapped inside a clock 🕰️(The position goes from 1~12).Your goal is to survive certain amount of levels (depending on the difficutly).";
var instruction_2 = "There are 3️⃣ main things to avoid. An hour-hand clock moves up once, a minute-hand moves up twice, a second-hand moves up three times every turn. If your position matches with any of the clock at the end of the turn, you will die 💀.";
var instruction_3 = "Before the clock moves, you get to choose either to move up ☝️ or down 👇, and either by once 1️⃣ or twice 2️⃣ every turn.";
var instruction_4 = "Tip on how to survive 💁 : you would need to be aware of where the clock hands are, and your current position. To help you with survival, you are given 3 flashlights 💡. You get to use flashlight to check your surroundings.";
var instruction_5 = "All animals 🐖 have different abilities and tell you different things. They are there to either help you or harm you. You find out which one is the bad one! 😉 Lastly, when you walk around, you might step on something 🤔.";
var instruction_6 = "It could be another flashlight or a snake🐍 You probably don't want to get bit by a snake because they are painful! 😥 This game will test your decision making and how smart you are 🧠";
var instruction_7 = "If you think you are brave enough to test your knowledge, let's try it 🤩 !!! . -This game will shut down in 5 minutes if you don't respond";
var instruction_8 = "Press 1 to move up one time, 2 to move up twice, 3 to move down one time and 4 to move down twice";


var content = "Welcome to DeadClock";
//Functions

//Generates random values from 1~12

//Game mechanics
function random() {
  return Math.floor(Math.random() * 11)+1;
}

function random1(playerPosition){
	var position = random();
	if(position == playerPosition)
		return position + Math.floor(Math.random() * 6) + 3;
}

function random3() {
  return Math.floor(Math.random() * 2)+1;
}

function setUp(snake1, snake2, bot1, bot2, bot3, bot4, bot5, life, playerPosition, hourPosition, minPosition, secPosition){
	var n;
	var r=[];
	for (n=1; n<=5; ++n)
	  {
	    var i = Math.floor((Math.random() * (12-n)) + 1);
	    r.push(a[i]);
	    a[i] = a[12-n];
	  }
	bot1 = r[0], bot2 = r[1], bot3 = r[2], bot4 = r[3], bot5 = r[4];

	var r=[];
	for (n=1; n<=3; ++n)
	  {
	    var i = Math.floor((Math.random() * (12-n)) + 1);
	    r.push(a[i]);
	    a[i] = a[12-n];
	  }
  snake1 = r[0], snake2 = r[1], flash = r[2];

	hourPosition = random1(playerPosition), minPosition = random1(playerPosition), secPosition = random1(playerPosition);
}

function check(tb, direction, snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition){
	var checkingFromPlayerPos = playerPosition + direction;
	if(checkingFromPlayerPos == 13){
		checkingFromPlayerPos = 1;
	} else if (checkingFromPlayerPos == 0){
		checkingFromPlayerPos = 12;
	}

	// var corrPosition = (checkingFromPlayerPos == bot1) ? bot1 :
	// ((checkingFromPlayerPos == bot2) ? bot2 :
	// ((checkingFromPlayerPos == bot3) ? bot3 :
	// ((checkingFromPlayerPos == bot4) ? bot4 :
	// ((checkingFromPlayerPos == bot5) ? bot5 :
	// ((checkingFromPlayerPos == hourPosition) ? hourPosition :
	// ((checkingFromPlayerPos == minPosition) ? minPosition :
	// ((checkingFromPlayerPos == secPosition) ? secPosition : 0)))))));
	//
	var corrPosition = pos_clock[checkingFromPlayerPos - 1];
	if(checkingFromPlayerPos == bot1){
		tb[corrPosition[0]][corrPosition[1]] = "🐮";
	}
	else if (checkingFromPlayerPos == bot2){
		tb[corrPosition[0]][corrPosition[1]] = "🐵";
	}
	else if (checkingFromPlayerPos == bot3){
		tb[corrPosition[0]][corrPosition[1]] = "🧟";
	}
	else if (checkingFromPlayerPos == bot4){
		tb[corrPosition[0]][corrPosition[1]] = "🦅";
	}
	else if (checkingFromPlayerPos == bot5){
		tb[corrPosition[0]][corrPosition[1]] = "🐀";
	}
	else if (checkingFromPlayerPos == hourPosition){
		tb[corrPosition[0]][corrPosition[1]] = ":red_circle:";
	}
	else if (checkingFromPlayerPos == minPosition){
		tb[corrPosition[0]][corrPosition[1]] = ":red_circle:";
	}
	else if (checkingFromPlayerPos == secPosition){
		tb[corrPosition[0]][corrPosition[1]] = ":red_circle:";
	} else {
		tb[corrPosition[0]][corrPosition[1]] = ":white_circle:";
	}
}


//Cow
// function quote1(bot1) {
//   	if (bot1 % 1 == 0){
//       message.channel.send("🐮: 'Now I'm ANGRY!'" + "\n😨: 'Okay... Chill there big cow'");
//     }
//     else {
//       message.channel.send("😱: 'I see a dead Alistar over there...'");
//     }
// }

//Monkey
// function quote2(bot2, hourPosition, minPosition, secPosition) {
//     if (bot2 % 1 == 0){
//     	if (bot2+1 == hourPosition ||bot2+1 == minPosition || bot2+1 == secPosition){
//         message.channel.send("🐵: 'Been waiting for this!'" + "\n🐵: 'I will tell you that something is right above me!'" + "\n😁: 'OMG Thank you Wukong!'");
//       }
//
//       else if (bot2-1 == hourPosition ||bot2-1 == minPosition || bot2-1 == secPosition){
//         message.channel.send("🐵: 'Been waiting for this!'" + "\n🐵: 'I will tell you that something is right below me!'" + "\n😁: 'OMG Thank you Wukong!'");
//       }
//
//       else {
//        	message.channel.send("🐵: 'Hey there! I will tell you that nothing has passed me recently'" + "\n😁: 'OMG Thank you Wukong!'");
//       }
//     }
//     else {
//       message.channel.send("😱: 'I see a dead Wukong over there...'");
//     }
// }
//

// Mundo
// function quote3(bot3) {
//   	if (bot3 % 1 == 0){
//       message.channel.send("🧟: 'Mundo!'" + "\n😌: 'Oh it's just Mundo..'");
//     }
//     else {
//       message.channel.send("😱: 'I see a dead Mundo over there...'" + "\n🧟: 'MUNDO TOO STRONG FOR YOU!'" + "\n😮: 'Dr.Mundo revived...'");
//       bot3 = random();
//     }
// }

//Quinn Bird
// function quote4(bot4, hourPosition, minPosition, secPosition) {
//     if (bot4 % 1 == 0){
//       let highest = 0;
//       if (hourPosition > minPosition && hourPosition > secPosition){
//       	highest = hourPosition;
//       }
//       if (minPosition > hourPosition && minPosition > secPosition){
//         highest = minPosition;
//       }
//       if (secPosition > minPosition && secPosition > hourPosition){
//         highest = secPosition;
//       }
//     	message.channel.send("👁️: 'What do you see up there?'" + `\n🦅: 'I will tell you the highest number the clock is pointing.'` + `'\n I see something at ${highest}'` + "\n😍: 'Sweet! Thanks Quinn!'");
//     	}
//     else {
//       message.channel.send("😱: 'I see a dead Quinn over there...'");
//     }
// }
//

//Rat Twitch
// function quote5(bot5, life) {
//     if (bot5 % 1 == 0){
//       message.channel.send("🐀: 'It's me! Hahahahaa!!'" + "\n🤢: 'YIKES!!! Not good... I got poisoned...'");
//       life--;
//       return life;
//     }
//     else {
//       message.channel.send("😱: 'I see a dead Twitch over there...'");
//     }
// }

function text_construct(){

}

//Interface of the game

var pos_clock = [
	[3, 5],//1
	[4, 6],//2
	[5, 7],//3
	[6, 6],//4
	[7, 5],//5
	[8, 4],//6
	[7, 3],//7
	[6, 2],//8
	[5, 1],//9
	[4, 2],//10
	[3, 3],//11
	[2, 4]//12
];


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
function play(array, num, emoji, position){

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
		var currIndex = array[i].indexOf(emoji);
		if(currIndex == -1){
			if(i == 8)
				// throw "error";
				currBR = pos_clock[position - 1][0];
				currBC = pos_clock[position - 1][1];
		} else {
			currBR = i;
			currBC = currIndex;
			break;
		}
  }




	if(position == playerPosition)
		resetPlayerSurrounding(array, playerPosition);

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
	position += num;
}
//End of movement in the clock

function start(array, pos, emoji){
// Position 9 is the first place for every characters to appear in the clock before taking notice of their real assigned positions.
	array[5][1] = emoji;

	//var randomMoves = Math.abs(Math.random() * 12);
	//play(currTB, randomMoves);
	var position_on_the_clock = pos - 9;
	play(currTB, position_on_the_clock, emoji, pos);
}

function resetPlayerSurrounding(tb, playerPosition){
		var surr1 = playerPosition - 1;
		var surr2 = playerPosition + 1;

		var pos_surr1 = pos_clock[surr1 - 1];
		var pos_surr2 = pos_clock[surr2 - 1];

		tb[pos_surr1[0]][pos_surr1[1]] = ":black_circle:";
		tb[pos_surr2[0]][pos_surr2[1]] = ":black_circle:";
}



//End of the interface

//End of Functions

// Initialize the embeded message

const embed_ins = new Discord.RichEmbed()
	.setTitle("DeadClock")
	.setAuthor("By Chocolate Rose")
	.setFooter("Fun strategy game on Discord")
	.setDescription("These are things you should know to beat the game")
	.addField("RULES", instruction_1)
	.addField("RULES", instruction_2)
	.addField("RULES", instruction_3)
	.addField("TIP", instruction_4)
	.addField("INFOR", instruction_5)
	.addField("INFOR", instruction_6)
	.addField("INFOR", instruction_7)
	.addField("GAMEPLAY", instruction_8)



const embed_game = new Discord.RichEmbed()
	.setTitle("This is your title, it can hold 256 characters")
	.setAuthor("Huan Ho (Bruce)")
	.setColor(0x00AE86)
	.setDescription(currTB)
	.addBlankField(true)
	.setFooter(content)
////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let argsM = message.content.split(" ");
	let cmd = argsM[0];
	let args = argsM.slice(1);

	if(!cmd.startsWith(prefix)) return;




	if(cmd === 	`${prefix}game`){
		currTB = makeTb();
		start(currTB, playerPosition, ":large_blue_circle:");
		// start(currTB, hourPosition, ":red_circle:");
		// start(currTB, minPosition, ":red_circle:");
		// start(currTB, secPosition, ":red_circle:");
		embed_game.setFooter(content);
		embed_game.setDescription(currTB);
		message.channel.send({embed: embed_game}).then(message => {
			message.react(reaction_numbers[1]).then(MessageReaction => {
				message.react(reaction_numbers[2]).then(MessageReaction => {
					message.react(reaction_numbers[3]).then(MessageReaction =>{
						message.react(reaction_numbers[4]).then(MessageReaction => {
							// message.react("🤚").then(MessageReaction => {
							// 	message.react("🔦").then(MessageReaction => {
							// 		message.react("💡").then(MessageReaction => {
							// 			message.react("🚨").then(MessageReaction => {
												text_construct();
							// 			}).catch();
							// 		}).catch();
							// 	}).catch();
							// }).catch();
						}).catch();
					}).catch();
				}).catch();
			}).catch();
		})

		currTB = makeTb();
		start(currTB, playerPosition, ":large_blue_circle:");
		setUp(snake1, snake2, bot1, bot2, bot3, bot4, bot5, life, playerPosition, hourPosition, minPosition, secPosition);
		embed_game.setDescription(currTB);
		message.channel.edit({embed: embed_game});
	}

});

bot.on("messageReactionAdd",(messageReaction) => {
	if(messageReaction.emoji.name == reaction_numbers[1]){
		play(currTB, 1, ":large_blue_circle:", playerPosition);
	}
	else if (messageReaction.emoji.name == reaction_numbers[2]){
		play(currTB, 2, ":large_blue_circle:", playerPosition);
	}
	else if (messageReaction.emoji.name == reaction_numbers[3]){
		play(currTB, -1, ":large_blue_circle:", playerPosition);
	}
	else if (messageReaction.emoji.name == reaction_numbers[4]){
		play(currTB, -2, ":large_blue_circle:", playerPosition);
	}
	else if (messageReaction.emoji.name == "🔦"){
		check(currTB, 1, snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
	}
	else if (messageReaction.emoji.name == "💡"){
		check(currTB, -1, snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
	}
	else if (messageReaction.emoji.name == "🚨"){
		check(currTB, 0, snake1, snake2, flashlight, flash, difficulty, bot1, bot2, bot3, bot4, bot5, life, level, playerPosition, hourPosition, minPosition, secPosition);
	}

	embed_game.setDescription(currTB);
	messageReaction.message.edit({embed: embed_game});
});

bot.login(botSettings.token);
