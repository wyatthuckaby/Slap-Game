function GameController() {

    var gameService = new GameService();


    function render(hideButtons) {

    	var gamePlayers = gameService.getPlayers();
    	var heroPlayer;
    	var enemyPlayer;

    	for (var i = gamePlayers.length - 1; i >= 0; i--) {
    		if (gamePlayers[i].isEnemy){
    			enemyPlayer = gamePlayers[i];
    		}
    	}

    	for (var i = gamePlayers.length - 1; i >= 0; i--) {
    		if (!gamePlayers[i].isEnemy){
    			heroPlayer = gamePlayers[i]; 
    		}
    	}


        //before we start to render things, make sure we have our win/loss intact.
        //if its broken it means a result.

        if (gameService.getWinLoss() != "nothing"){
            //lets sweet alert this stuff
            swal({
                title: gameService.getWinLoss(),
                text: "Click to play again!",
                type: "info",
                confirmButtonText: 'Play again!'
            }).then(function(){
                gameService.resetGame();
                render(false);
            })
        }


    	/*
    	following order will be observed across the rendering sequence:
    	Health,
    	image,
    	buttons
    	*/
    	var heroTemplate = ``;
    	var enemyTemplate = ``;


    	//first render the hero.
    	console.log(heroPlayer.health);
    	heroTemplate += `
            <div class="row">
           	 	<div class="progress healthbar">
                    <div class="progress-bar" role="progressbar"  style="width: ${(heroPlayer.health/100) * 100}%">  
                        <span>${heroPlayer.health}</span>
                    </div>
                </div>
            </div>
            <div class="row">
            	<img class="img-responsive playerStyle" src="https://robohash.org/${heroPlayer.name}.png?size=200x200">
            </div>

            <div class="row">
    	`;


        heroTemplate += `<div class="text-center buttons">`;
        if (!hideButtons){
        	for (var i = heroPlayer.weapons.length - 1; i >= 0; i--) {
        		//for now we will just make some buttons. destined to change.
        		heroTemplate += `<button type="button" onclick="gameController.dealDamage(${i});"> 
                ${heroPlayer.weapons[i].name}</button>`;
            }
    	} else {
            for (var i = heroPlayer.weapons.length - 1; i >= 0; i--) {
                //for now we will just make some buttons. destined to change.
                heroTemplate += `<button type="button" onclick="gameController.dealDamage(${i});" disabled> 
                ${heroPlayer.weapons[i].name}</button>`;
            }
        }

    	heroTemplate += `</div>`;
        heroTemplate += `</div>`;


    	//now to render the enemy

    	enemyTemplate += `
            <div class="row">
           	 	<div class="progress healthbar">
                    <div class="progress-bar" role="progressbar"  style="width: ${(enemyPlayer.health/100) * 100}%">  
                        <span>${enemyPlayer.health}</span>
                    </div>
                </div>
            </div>
            <div class="row">
            	<img  class="img-responsive playerStyle " src="https://robohash.org/${enemyPlayer.name}.png?size=200x200">
            </div>

            <div class="row">
    	`


    	document.getElementById("player").innerHTML = heroTemplate;
    	document.getElementById("enemy").innerHTML = enemyTemplate;


    }


    //will then call the AI attacking function
    this.dealDamage = function dealDamage (wep){
        gameService.dealDamage(wep);
        render(false);
    }

    render(false);
}