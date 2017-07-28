


//while this object can take health,
//it can also heal.
//find:Weapon
var WeaponID = 1;
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
}

var players = [];

//we need an Init function; this is where we can 


//find:initGame
function initGame(){
    players.push(
        new Player(false, 100, 0, [   
            new Weapon("Slap",-1, "assets/slap.png"), 
            new Weapon ("Sword", -50, 0)
        ], "Whayyy", 3),
        new Player( true, 100, 0, [   
            new Weapon("Slap",-1, "assets/slap.png"), 
            new Weapon ("Sword", -50, 0)
        ], "I.Robot", 3),
        
    );
}

//find:render
function render(){
    //your wep
    var ywTemplate = '';
    //their wep
    var twTemplate = '';

    for (var i = 0; i < players.length; i++){
        var isOpon = players[i].computer;
        //check opponet
        if (isOpon){
            /*
            the drawing context so happens to be on the opponets side
            this time. 
            */
            for (var j = 0; j < players[i].weapons.length; j++){
                if (players[i].weapons[j].image === 0){
                    players[i].weapons[j].image = "assets/no-texture.png";
                }

                //console.log("Rendering: " + players[i].weapons[j].Id);
                twTemplate += `
                <img class="wep-img" src="${players[i].weapons[j].image}" >
                `;
            }
        } else {
            for (var j = 0; j < players[i].weapons.length; j++){
                if (players[i].weapons[j].image === 0){
                    players[i].weapons[j].image = "assets/no-texture.png";
                }
                //console.log("Rendering: " + players[i].weapons[j].Id);
                ywTemplate += `
                <img class="wep-img" src="${players[i].weapons[j].image}" >
                `;
            }           
        }
    }

    //find:render/wep
    document.getElementById("yourwep").innerHTML = ywTemplate;
    document.getElementById("theirwep").innerHTML = twTemplate;
}

initGame();
render();