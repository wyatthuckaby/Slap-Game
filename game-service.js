function GameService() {

    /* BEGIN PRIVATE */

    //Win\Loss
    var winLoss;

    //CONSTRUCTORS
    function Player(name, isEnemy, health, power, defense, image) {
        this.name = name;
        this.isEnemy = isEnemy;
        this.health = health;
        this.power = power;
        this.defense = defense;
        this.weapons = [];


        //ID between 1-2000
        this.Id = Math.floor(Math.random() * (2000 - 1) + 1);
    }

    function Weapon(name, health, image) {
        this.name = name;
        this.health = health;
        this.image = image;
    }

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
            players[i].isEnemy && return players[i];
        }
    }

    function findHeroPlayer() {
        for (var i = players.length - 1; i >= 0; i--) {
            (!players[i].isEnemy) && return players[i];
        }
    }

    function findPlayerById(sid) {
        for (var i = players.length - 1; i >= 0; i--) {
            (players[i].Id === sid) && return players[i];
        }
    }


    /*END PRIVATE*/


    /*BEGIN PUBLIC */

    //player getter
    this.getPlayers = function getPlayers() {
        return JSON.parse(JSON.stringify(players));
    }



    //win/loss getter
    this.getWinLoss = function getWinLoss(){

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

        enemyPlayer.health += heroPlayer.weapons[wep].health * (heroPlayer.power * enemyPlayer.defense);

        if (enemyPlayer.health < 0) {
            //Cool! player won.
            console.log("Player won!");
            winLoss = "You won!";
            enemyPlayer.health = 0;
        }


    }



    //enemy move
    /*
    what is really important here is to make
    sure that the engine can deal the damae and
    handle the Artificial intelligence portion.

    TODO 4 neuron neral network
    */

    //AI Private Variables
    var dipcount = 0;

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


        //now use the AI intensity to change how the AI reacts
        //to the choices of the enemy player weapons.

        //for now (as we are still developing this AI) just going off
        //the minimum and max weapons.
        var hardestWep = Math.max(enemyPlayer.weapons.health);
        var easiestWep = Math.min(enemyPlayer.weapons.health);


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
        if (intensity > 5) {
            heroPlayer.health += hardestWep.health * (enemyPlayer.power * heroPlayer.defense);
            if (heroPlayer.health < 0) {
                //DED
                health = 0;
                winLoss = "You Lost!";
                console.log("Enemy Won!");
            }
        } else {
            heroPlayer.health += easiestWep.health * (enemyPlayer.power * heroPlayer.defense);
            if (heroPlayer.health < 0) {
                //DED - But really easily....
                health = 0;
                winLoss = "You Lost!";
                console.log("Enemy Won!");
            }
        }
    }



    /*END PUBLIC*/

    init();

}