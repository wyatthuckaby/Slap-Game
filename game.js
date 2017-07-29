


//while this object can take health,
//it can also heal.
//find:Weapon
var WeaponID = 1;
var playerID = 1;
var Weapon = function(wepname, health, image){
    this.wepname = wepname || "I have no name, so no thirst for blood.";
    this.health = health;
    this.image = image;
    this.Id = WeaponID++;
}

//find:Player
var Player = function(computer, health, image,weapons, playername, power){
    this.computer = computer;
    this.playername = playername || "I have no name D:";
    this.health = health;
    this.image = image;
    this.power = power || 2;
    this.weapons = weapons;
    this.Id = playerID++;
}

//players has a weapons attribute
//simply pull from the weapons in this array;
var weapons = [];
var players = [];
