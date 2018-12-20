/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*PERSONAL NOTES AS IF I WAS DOING THIS MYSELF 

1.)whichever player's turn it is gets the class active
2.)when click on roll, a random number b/w 1 & 6 is generated: that number gets a corresponding dice, the active player's
-player-current-score gets updated with the original + that score.
3.) in case of rolling a one, current score gets updated to zero, player's turn changes
4.) when click on hold, player's current score gets updated to global score, player changes, image turns to nothing, current score goes
to zero.




*/
//first, set up important variables
var scores, roundScore, activePlayer, gamePlaying;

init();



//document.querySelector('#current-' + activePlayer).textContent = dice; // the current score of the active player will be updated
//(either 0 or 1);

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';



document.querySelector('.btn-roll').addEventListener('click', function() { //when the user clicks on the roll dice button
    if (gamePlaying) {
        //1.) random number
        var dice = Math.floor(Math.random()*6) + 1; //a random number b/w 1 & 6
        //2.) display the result
        var diceDOM = document.querySelector('.dice'); //the image of the dice
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png'; //the random number picture

        //3.) update the round score
        if (dice > 1) {
            //add to current score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // every time the user clicks on the roll dice button,
            // a random # is generated b/w 1 & 6. if it's not 1, then the current score gets updated to add
            //what was rolled. 
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add CURRENT SCORE to GLOBAL SCORE
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //Check if the player won the game
        if (scores[activePlayer] >= 10) {
            //player won the game
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; //make the player name say winner
            //Add the winner class to the winner's panel
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //hide dice
            document.querySelector('.dice').style.display = 'none';
            //remove active class from the winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //disconnect the roll button
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
    
});


function nextPlayer() {
     //next player's turn & update current score to 0
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0; //roundScore gets set back to zero

     document.getElementById('current-0').textContent = '0'; //current score for both players gets reset to 0
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active'); //switch player
     document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none'; // dice goes back to hidden
}

document.querySelector('.btn-new').addEventListener('click', init);

//initialization function
function init() {
    scores = [0,0]; // global (overall) scores; first to 100 wins
    roundScore = 0; // current score for the active player
    activePlayer = 0; //0 = player 1, 1 = player 2
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    //remove winner class from both panels
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    //remove active class from both panels
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //make player 1 the active player
    document.querySelector('.player-0-panel').classList.add('active');
}















