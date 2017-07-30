
var WepId = 1;
var PlayerId = 1;

var Weapon = function (name, damage, deflection) {
    this.name = name;
    this.damage = damage;
    this.deflection = deflection;
    this.Id = WepId++;
}

var Player = function (computer, name, health, power, stamina, weapons, enemy) {
    this.computer = computer;
    this.name = name;
    this.health = health;
    this.power = power;

    this.weapons = weapons;
    this.stamina = stamina;
    this.enemy = enemy || 0;
    this.Id = PlayerId++;
}

var weapons = [];
var players = [];

function initGame() {
    weapons.push(
        new Weapon("Sheild", 5, 30),
        new Weapon("Sword", 50, 10)
    );

    players.push(
        new Player(false, "Fred", 100, 1.2, 1.1, [weapons[0], weapons[1]]),
        new Player(true, "Fred", 100, 1.2, 1.1, [weapons[0], weapons[1]])
    );

    players[0].enemy = 2;
    players[1].enemy = 1;
}
function update() {
    // document.getElementById("playerHealth").innerHTML = players[0].health;
    // document.getElementById("enemyHealth").innerHTML = players[1].health;

    for (var i = 0; i < players.length; i++) {
        var template = '';
        if (!players[i].computer) {
            //we want to display the other sectors of the induvidual.
            template += `
            <div class="row">
                <h3>${players[i].health}</h3>
            </div>
            <div class="row">
                <img src="http://placehold.it/200x200">
            </div>
            `;

            //we want this to overwrite all other data
            document.getElementById("enemy").innerHTML = template;
        } else {
            template += `
                <div class="row">
                    <h3>${players[i].health}</h3>
                </div>
                <div class="row">
                    <img src="http://placehold.it/200x200">
                </div>
            `;

            //we need to give the player access to their weapons.
            template += `<div class="row">`;
            // for (var i = 0; i < players[i].weapons.length; i++) {
            //     template += `
            //     <button type="button" onclick="">${players[i]}</button>
            //     `;
            // }

            for (var j = 0; j < players[i].weapons.length; j++) {
                template += `<button type="button" onclick="damage(${players[i].Id}, ${j});"> ${players[i].weapons[j].name} </button>`
            }


            template += `</div>`;
            //we want this to overwrite all other data
            document.getElementById("player").innerHTML = template;
        }
    }
}
function damage(playerid, wep) {
    console.log("Damage Sent: " + playerid + " used " + wep);
    //now we need to get the player enemy.
    var senderPlayer;
    var enemyPlayer;
    for (var i=0; i < players.length; i++){
        if (playerid === players[i].Id){
            senderPlayer = players[i];
            break; //only one instance. so breaking to conserve CPU
        }
    }
    //loop through the players again to get the enemy.
    for (var i=0; i < players.length; i++){
        if (players[i].Id === senderPlayer.enemy){
            enemyPlayer = players[i];
        }
    }

    //now to deal the actuall damage.
    //I also want the damage to be exponetially random.
    //so i can manipulate the users expectations of the game
    //mechanics.

    /*
    its also vital to stop the math.random function from returning 0.
    if it does, you hit a /0 error and you are screwed at that point.
    
    */
    enemyPlayer.health -= Math.floor(Math.pow(
        Math.pow(senderPlayer.weapons[wep].damage, senderPlayer.power),
     1/(Math.floor(Math.random() * 2) + 1)));

    if (enemyPlayer.health < 0){
        enemyPlayer.health = 0;
    }
    update();
}

initGame();
update();