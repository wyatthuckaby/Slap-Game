
// var WepId = 1;
// var PlayerId = 1;





// function update() {
//     // document.getElementById("playerHealth").innerHTML = players[0].health;
//     // document.getElementById("enemyHealth").innerHTML = players[1].health;

// }
// function damage(playerid, wep) {
//     console.log("Damage Sent: " + playerid + " used " + wep);
//     //now we need to get the player enemy.
//     var senderPlayer;
//     var enemyPlayer;
//     for (var i=0; i < players.length; i++){
//         if (playerid === players[i].Id){
//             senderPlayer = players[i];
//             break; //only one instance. so breaking to conserve CPU
//         }
//     }
//     //loop through the players again to get the enemy.
//     for (var i=0; i < players.length; i++){
//         if (players[i].Id === senderPlayer.enemy){
//             enemyPlayer = players[i];
//         }
//     }

//     //now to deal the actuall damage.
//     //I also want the damage to be exponetially random.
//     //so i can manipulate the users expectations of the game
//     //mechanics.

//     /*
//     its also vital to stop the math.random function from returning 0.
//     if it does, you hit a /0 error and you are screwed at that point.
    
//     */
//     enemyPlayer.health -= Math.floor(Math.pow(
//         Math.pow(senderPlayer.weapons[wep].damage, senderPlayer.power),
//      1/(Math.floor(Math.random() * 2) + 1)));

//     if (enemyPlayer.health < 0){
//         enemyPlayer.health = 0;
//     }
//     update();
// }

// initGame();
// update();