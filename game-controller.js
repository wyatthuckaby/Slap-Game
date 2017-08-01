function GameController() {

    var gameService = new GameService();
    function render() {

    	gamePlayers = gameService.getPlayers();
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
           	 	<h3>${heroPlayer.health}</h3>
            </div>
            <div class="row">
            	<img src="${heroPlayer.image}">
            </div>

            <div class="row">
    	`


    	for (var i = heroPlayer.weapons.length - 1; i >= 0; i--) {
    		//for now we will just make some buttons. destined to change.
    		heroTemplate += `<button type="button" onclick="gameService.dealDamage(${i});"> </button>`;

    	}

    	heroTemplate += `</div>`;


    	//now to render the enemy

    	enemyTemplate += `
            <div class="row">
           	 	<h3>${enemyPlayer.health}</h3>
            </div>
            <div class="row">
            	<img src="${enemyPlayer.image}">
            </div>

            <div class="row">
    	`


    	document.getElementById("player").innerHTML = heroTemplate;
    	document.getElementById("enemy").innerHTML = enemyTemplate;


    }

    render();
}