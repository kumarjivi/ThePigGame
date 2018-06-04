/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,
scores = [0,0];
roundScore = 0;
activePlayer = 0;



//document.querySelector('#score-' + activePlayer).textContent = dice;
document.querySelector('.dice').style.display = 'none';
//reset the current score and round score as 0.
document.getElementById('score-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function() {
	//generate a random number.
	var dice = Math.ceil(Math.random() * 6);
	//display the result.
	var diceButton = document.querySelector('.dice');
	diceButton.style.display = 'block';
	diceButton.src = 'dice-' + dice + '.png';
	//update the result if rolled number is not 1.
	if(dice > 1) {
		roundScore += dice;
		document.getElementById('current-' + activePlayer).textContent = roundScore;
	} else {
		roundScore = 0;
		document.getElementById('current-' + activePlayer).textContent = roundScore;
		//update active player and inactive player.
		toggleActivePlayer();
		//hide the dice.
		//document.querySelector('.dice').style.display = 'none';
	}
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	//hide the dice.
	document.querySelector('.dice').style.display = 'none';
	//update current score of active player.
	updateScore(activePlayer);
	if(scores[activePlayer] >= 50) {
		document.getElementById('name-'+activePlayer).textContent = "Winner!!!";
		document.querySelector('.player-'+activePlayer +'-panel').classList.remove('active');
		document.querySelector('.player-'+activePlayer +'-panel').classList.add('winner');
		//hide the roll-dice and the hold button.
		document.querySelector('.btn-roll').style.display = 'none';
		document.querySelector('.btn-hold').style.display = 'none';
		
	} else {
		
		toggleActivePlayer();
	}
	
	
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	//reset all scores.
	scores[0] = 0;
	scores[1] = 0;
	roundScore = 0;
	document.getElementById('score-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	//make Player 1 active and Player 2 not active.
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	//remove winner class from both players.
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	//show both hold and roll-dice buttons.
	document.querySelector('.btn-hold').style.display = 'block';
	document.querySelector('.btn-roll').style.display = 'block';
	//reset the names of both players.
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
}

function toggleActivePlayer() {
	//document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	//activePlayer = (activePlayer + 1)%2;
	//document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	//another way to do this.
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	activePlayer = (activePlayer + 1)%2;
}

function updateScore(playerId) {
	scores[playerId] += roundScore;
	roundScore = 0;
	document.getElementById('current-' + playerId).textContent = '0';
	document.getElementById('score-' + playerId).textContent = scores[playerId];
}