


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

var players = [];



//find:initGame
function initGame(){
    players.push(
        new Player(false, 100, 0, [   
            new Weapon("Slap",-1, "assets/slap.png"), 
            new Weapon ("Sword", -50, 0)
        ], "Jim", 3),
        new Player( true, 100, 0, [   
            new Weapon("Slap",-1, "assets/slap.png"), 
            new Weapon ("Sword", -50, 0)
        ], "ITtttts JONNNY", 3),
        
    );
}

//find:getopponet
//returns the reference the the player object that is opposing the argument
function getOpponet(againced){
    for (var i = 0; i < players.length; i++){
        if (againced.Id != players[i].Id){
            return players[i];
        }
    }
}

//find:render
function render(){
    //your wep
    var ywTemplate = '';
    //their wep
    var twTemplate = '';

    var yTemplate = '';
    var tTemplate = '';
    for (var i = 0; i < players.length; i++){
        var isOpon = players[i].computer;
        //check opponet
        if (isOpon){
            /*
            the drawing context so happens to be on the opponets side
            this time. 
            */
            //Player Weapons
            for (var j = 0; j < players[i].weapons.length; j++){
                if (players[i].weapons[j].image === 0){
                    players[i].weapons[j].image = "assets/no-texture.png";
                }

                //console.log("Rendering: " + players[i].weapons[j].Id);
                twTemplate += `
                <a href="#" onclick = "${players[i].weapons[j].Id}" >
                    <img class="img-responsive wep-img" src="${players[i].weapons[j].image}" >
                </a>
                `;
            }

            //player health
            tTemplate += `
                <div class="progress yourHealthBar">
                    <div class="progress-bar progress-bar-success" style="width:${players[i].health}%">
                        100
                    </div>
                </div>
            `;

            //player render

            /*
            Something to keep in mind when rendering with robohash is its php based.
            this means we can edit and modify the results of the image easily without much
            effort. 
            */

            if (players[i].image != 0){
                tTemplate += `<img class="img-responsive play-img"
                src="${players[i].image}">`;
            } else {
                tTemplate += `<img class="img-responsive play-img"
                src="https://robohash.org/${players[i].playername}.png?size=256x256;set=set2">`;
            }
        } else {

            //Player Weapons
            for (var j = 0; j < players[i].weapons.length; j++){
                if (players[i].weapons[j].image === 0){
                    players[i].weapons[j].image = "assets/no-texture.png";

                }
                
                //console.log("Rendering: " + players[i].weapons[j].Id);
                // function applyWeapon(sender, opponet, wepid)
                ywTemplate += `
                <a href="#" onclick = "applyWeapon(${players[i].Id}, ${getOpponet(players[i].Id).Id}, ${players[i].weapons[j].Id});" >
                    <img class="img-responsive wep-img" src="${players[i].weapons[j].image}" >
                </a>
                `;
            }


            //player health

            yTemplate += `
                <div class="progress yourHealthBar">
                    <div class="progress-bar progress-bar-success" style="width:${players[i].health}%">
                    100
                    </div>
                </div>
            `;

            //player render
            if (players[i].image != 0){
                yTemplate += `<img class="img-responsive play-img"
                src="${players[i].image}">`;
            } else {
                yTemplate += `<img class="img-responsive play-img"
                src="https://robohash.org/${players[i].playername}.png?size=256x256;set=set2">`;
            }     
        }
    }

    //find:render/wep
    document.getElementById("yourwep").innerHTML = ywTemplate;
    document.getElementById("theirwep").innerHTML = twTemplate;


    //find:render/player
    document.getElementById("yourPlayer").innerHTML = yTemplate;
    document.getElementById("theirPlayer").innerHTML = tTemplate;
}


//find:applyweapon
function applyWeapon(sender, opponet, wepid){
    //get the weapon in question and apply it to the correct player.

    var damage=0;

    for (var i = 0; i < players.length; i++){
        if (players[i].Id === sender){
            //now parse the weapons and look for the correct one
            for (var j = 0; j < players[i].weapons.length; j++){
                if (players[i].weapons[j].Id == wepid){
                    //now apply that damage multiplied by the player's power
                    /*
                    this works by multiplying the weapon by the constant provided
                    by the player's power. I want to make this a little more unpredictable.
                    so i might add a random function to this as a secondary multiple to make
                    the results less predicatble.

                    example of how this works:

                    damage = 2 * -3;
                    

                    i really want to do it like this though
                    damamge = (2 * -3) + ((Math.rand() * 5) - 5) 
                    */
                    damage = players[i].power * players[i].weapons[j].health;
                }
            }
        }
    }
    //search the array to find the opponet
    for (var i = 0; i < players.length; i++) {
        // var element = players[i];
        if (players[i].Id === opponet) {
            //now take this user and apply the damage
            players[i].health += damage; //remember negative damage still subtracts
                console.log(players[i].health);
        }
    }

    render();
}

initGame();
render();
