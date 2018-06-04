/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gameInProgress, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gameInProgress) {
		//generate a random number.
		var dice = Math.ceil(Math.random() * 6);
		//display the result.
		//dice = 6;
		var diceButton = document.querySelector('.dice');
		diceButton.style.display = 'block';
		diceButton.src = 'dice-' + dice + '.png';
		//update the result if rolled number is not 1.
		if(dice > 1) {
			//check if this roll is 6 and the last roll was 6 as well.
			if(dice == 6 && prevDice == 6) {
				roundScore = 0;
				prevDice = 0;
				scores[activePlayer] = 0;
				document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
				//give up current player's turn.
				toggleActivePlayer();
			} else {
				prevDice = dice;
				roundScore += dice;
			}
			document.getElementById('current-' + activePlayer).textContent = roundScore;
		} else {
			toggleActivePlayer();
		}
	}
	
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	//hide the dice.
	document.querySelector('.dice').style.display = 'none';
	//update current score of active player.
	updateScore(activePlayer);
	if(gameInProgress) {
		if(scores[activePlayer] >= 100) {
			document.getElementById('name-'+activePlayer).textContent = "Winner!!!";
			document.querySelector('.player-'+activePlayer +'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer +'-panel').classList.add('winner');
			gameInProgress = false;
		} else {
			
			toggleActivePlayer();
		}		
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	//reset all scores.
	prevDice = 0;
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	document.getElementById('score-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	//make Player 1 active and Player 2 not active.
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	//remove winner class from both players.
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	//show both hold and roll-dice buttons.
	document.querySelector('.btn-hold').style.display = 'block';
	document.querySelector('.btn-roll').style.display = 'block';
	//reset the names of both players.
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	//hide the dice
	document.querySelector('.dice').style.display = 'none';
	gameInProgress = true;
}

function toggleActivePlayer() {
	roundScore = 0;
	document.getElementById('current-' + activePlayer).textContent = roundScore;
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