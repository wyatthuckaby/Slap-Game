function GameService() {

    /* BEGIN PRIVATE */

    //Win\Loss
    var winLoss;


    //AI Private Variables
    var dipcount = 0;

    var currentDiff = "normal";



    //CONSTRUCTORS
    function Player(name, isEnemy, health, power, defense, image) {
        this.name = name;
        this.isEnemy = isEnemy;
        this.health = health;
        this.power = power;
        this.defense = defense;
        this.weapons = [];
        this.image = image;

        //ID between 1-2000
        this.Id = Math.floor(Math.random() * (2000 - 1) + 1);
    }

    function Weapon(name, health, image) {
        this.name = name;
        this.health = health;
        this.image = image;
    }


    function Mod(name, healthOffset, powerOffset, defenceOffset){
        this.name = name;
        this.healthOffset = healthOffset;
        this.powerOffset = powerOffset;
        this.defenceOffset = defenceOffset;
    }

    var mods = [];
    var players = [];

    function init() {
        //create the objects
        players.push(
            new Player("Fred", false, 100, 1.2, 1.2, "http://placehold.it/200x200"),
            new Player("Timmy", true, 100, 1.2, 1.2, "http://placehold.it/200x200")
        );


        //set some default weapons
        for (var i = players.length - 1; i >= 0; i--) { //in case anyone was wondering this loop is 5% more efficient. (less comparisons)
            players[i].weapons.push(
                new Weapon("Sword", -10, "http://placehold.it/60x60"),
                new Weapon("Slap", -2, "http://placehold.it/60x60")
            );
        }
        winLoss = "nothing";
    }



    //find functions
    function findEnemyPlayer() {
        for (var i = players.length - 1; i >= 0; i--) {
            if (players[i].isEnemy) {
                return players[i];
            }
        }
    }

    function findHeroPlayer() {
        for (var i = players.length - 1; i >= 0; i--) {
            if (!players[i].isEnemy) {
                return players[i];
            }
        }
    }

    function findPlayerById(sid) {
        for (var i = players.length - 1; i >= 0; i--) {
            if (players[i].Id === sid) {
                return players[i];
            }
        }
    }




    //returns the new changes with current mods
    //all factored into eachother. with averages

    function addModsDefence(){
        var average = 0;
        for (var i = mods.length - 1; i >= 0; i--) {
            average += mods[i].defenceOffset; 
        }

        return average / mods.length;
    }

    function addModsPower(){
        var average = 0;
        for (var i = mods.length - 1; i >= 0; i--) {
            average += mods[i].powerOffset; 
        }

        return average / mods.length;
    }



    this.enableMod = function enableMod(mod) {
        if (mod === "powerboost"){
            mods.push(new Mod("powerboost", 0,4,0));
        }
    }

    this.disableMod = function disableMod(mod) {
        if (mod === "powerboost"){
            for (var i = mods.length - 1; i >= 0; i--) {
                if (mods[i].name === "powerboost"){
                    mods = mods.slice (i);
                    break;
                }
            }
        }      
    }


    //AI engine is designed in such a way that on the
    //fly difficulty adjustments are possible.
    this.setDifficulty = function setDifficulty(diff) {
        if (diff === currentDiff)
            return;

        if (diff === "normal") {
            dipcount -= 10;
        } else if (diff === "hard") {
            dipcount += 10; //ya done messed up AAron.


        } else {
            //making impossible the default because im hardcore like that.
            //I decided that if the user dares press this button it will make all
            //the other games harder until they reload the game.
            //so lets boost power and increase defence on the enemy.


            //sinister message
            swal({
                title: "May death rain upon them....",
                text: "You have no idea what you just did.",
                type: "warning"
            });

            findEnemyPlayer().power += 10;
            findEnemyPlayer().defense += 1;

            findEnemyPlayer().image = "https://robohash.org/bigbuns.png?size=200x200";

            //just so i can make a spinal tap reference lets turn this up to 11.
            dipcount += 11;
        }
    }
    this.resetGame = function resetGame() {
        //iterate through all the players and reset health.
        for (var i = players.length - 1; i >= 0; i--) {
            players[i].health = 100;
        }

        //reset winloss
        winLoss = "nothing";

        //reset AI
        dipcount = 0;
    }
    /*END PRIVATE*/


    /*BEGIN PUBLIC */

    //player getter
    this.getPlayers = function getPlayers() {
        return JSON.parse(JSON.stringify(players));
    }



    //win/loss getter
    this.getWinLoss = function getWinLoss() {
        return winLoss;
    }
    //its pretty clear who the source and target is.
    //BUT we still need to make sure we deal damage
    //with the right weapon.
    //Because of this, we need to take in a weapon
    //ID. BUT we arn't completely out of luck
    //here whereas the getter returns an exact clone
    //of the players object. 
    //this means we can pass the wep the player decided 
    //to use inside its own object. 
    this.dealDamage = function dealDamage(wep) {
        var enemyPlayer = findEnemyPlayer();
        var heroPlayer = findHeroPlayer();

        //now for the actual damage equation.
        //eh += hP.weps[w].health * (P * D)
        // function Player(name, isEnemy, health, power, defense, image)

        enemyPlayer.health += Math.floor(
            (heroPlayer.weapons[wep].health *
                ((heroPlayer.power)/ enemyPlayer.defense)) *
            Math.random());

        if (enemyPlayer.health < 0) {
            //Cool! player won.
            console.log("Player won!");
            winLoss = "You won!";
            enemyPlayer.health = 0;
        }

        this.enemyMove();

    }



    //enemy move
    /*
    what is really important here is to make
    sure that the engine can deal the damae and
    handle the Artificial intelligence portion.

    TODO 4 neuron neral network
    */


    //see dipcount variable


    this.enemyMove = function enemyMove() {
        var enemyPlayer = findEnemyPlayer();
        var heroPlayer = findHeroPlayer();

        //this is the intensity of the artificial intelligince
        //its based off the difference in the player and
        //the enemy health. if the enemy is winning
        //then keep a rather low intensity to convserve moves.
        //otherwise go apsolutly insane.
        var AIintensity = 1;

        if (enemyPlayer.health < heroPlayer.health) {
            AIintensity = 10; //YOUVE BEEN PUNKED B****!
            dipcount++;
        } else AIintensity = 1 + dipcount;

        console.log(AIintensity);
        //now use the AI intensity to change how the AI reacts
        //to the choices of the enemy player weapons.

        //for now (as we are still developing this AI) just going off
        //the minimum and max weapons.

        var hardestWep = enemyPlayer.weapons[0].health;
        var easiestWep = enemyPlayer.weapons[1].health;


        for (var i = enemyPlayer.weapons.length - 1; i >= 0; i--) {
            if (enemyPlayer.weapons[i].health === hardestWep) {
                hardestWep = enemyPlayer.weapons[i];
                break;
            }
        }

        for (var i = enemyPlayer.weapons.length - 1; i >= 0; i--) {
            if (enemyPlayer.weapons[i].health === easiestWep) {
                easiestWep = enemyPlayer.weapons[i];
                break;
            }
        }


        //final AI decision
        if (AIintensity > 5) {
            heroPlayer.health += Math.floor((hardestWep.health * (enemyPlayer.power / heroPlayer.defense)) *
                Math.random());
            if (heroPlayer.health < 0) {
                //DED
                heroPlayer.health = 0;
                winLoss = "You Lost!";
                console.log("Enemy Won!");
            }
        } else {
            heroPlayer.health += Math.floor((easiestWep.health * (enemyPlayer.power / heroPlayer.defense )) *
                Math.random());
            if (heroPlayer.health < 0) {
                //DED - But really easily....
                heroPlayer.health = 0;
                winLoss = "You Lost!";
                console.log("Enemy Won!");
            }
        }
    }



    /*END PUBLIC*/

    init();

}