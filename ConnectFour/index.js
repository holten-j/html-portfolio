//create array representing board state,
//index zero represents the top left square, index zero thru 6 is the top row
//value zero represents empty, value 1 represents red, -1 represents black
var boardState = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
var redTurn = true;
var turnColor = "red";
var turnState = 1;
var play = 0;
var gameOver = false;


//funtion to update each div square with red or black, corresponding to the value in boardState
function updateBoard(){
  var s = "s0";
  for ( let i = 0 ; i < 42 ; i += 1 ){
    sID = "s" + i; 
    if ( boardState[i] === 1 ){
      document.querySelector( "#" + sID ).style.backgroundColor = "red";
   } else if ( boardState[i] === -1 ){
    document.querySelector( "#" + sID ).style.backgroundColor = "black";
 }
  }
}
function switchTurn(){
  redTurn = !redTurn
  if ( redTurn == true ){
    turnColor = "Red";
    turnState = 1;
  } else {
    turnColor = "Black";
    turnState = -1;
  }
  document.querySelector("h2").innerText = turnColor + " player's turn"
}

function makePlay( column ){
  if ( gameOver == true ){
    return;
  }

    //if the column is full, notify player and cancel placement
    if ( boardState[ column ] !== 0 ){
      document.querySelector("h2").innerText = "Column Full! Try again, " + turnColor;
      return
    }

    //starting from bottom of column, check for empty space, when one is found, update boardState, make var for victory check
  for ( let row = 35 ; row >= 0 ; row -= 7 ){
  
    if ( boardState[ column + row ] == 0 ){
      boardState[ column + row ] = turnState;
      play = column + row;
      console.log("play" + play);
      break;
  }
}

  updateBoard();
  winCheckHorizontal( play );
  winCheckVertical( play );
  winCheckDiagnolNeg( play );
  winCheckDiagnolPos( play );

  if (gameOver == true){
    return;
  }
  switchTurn();
}

function winCheckHorizontal( p ){
  var row = Math.floor( p / 7 ) * 7;
  var winCount = 0;
  for ( let i = row ; i <= row + 6 ; i += 1 ){
    if ( boardState[ i ] == turnState){
      winCount = winCount + turnState;
      if ( winCount == 4 || winCount == -4 ){//Victory!!
        document.querySelector("h2").innerText = turnColor + " Wins!!!";
        gameOver = true;
        return;
      }
    } else if ( boardState[ row + i ] !== turnState ){
      winCount = 0;
    }
  }
}

function winCheckVertical( p ){
  var col = p % 7;
  var winCount = 0;
  for ( let i = 35 + col ; i >= col ; i -= 7 ){
    if ( boardState[ i ] == turnState){
      winCount = winCount + turnState;
      if ( winCount == 4 || winCount == -4 ){//Victory!!
        document.querySelector("h2").innerText = turnColor + " Wins!!!";
        gameOver = true;
        return;
      }
    } else if ( boardState[ i ] !== turnState ){
      winCount = 0;
    }
  }
}


function winCheckDiagnolPos( p ){
  /* Process:
  yIntercept: the column-zero-intercept (y-intercept) of the play's positive-sloped diagnol line;
  it equals the row of the play + column 
  loop seven times over an extened game boaard, only counting spaces on the board
  */
  //console.log("winCheckDiagnolPos ran")

 var row = Math.floor( p / 7);
 var column = (p % 7);
 var winCount = 0;
 var yIntercept = row + column;
 for ( let i = 0 ; i < 7 ; i +=1 ){//check seven places
  checkSpot = ( yIntercept * 7 ) - ( i * 6);//calculate the index of boardState we are checking
  if (checkSpot >= 0 && checkSpot <= 41 ){//only count spots on the board
    if ( boardState[ checkSpot ] == turnState){
      winCount = winCount + turnState;
      if ( winCount == 4 || winCount == -4 ){//Victory!!
        document.querySelector("h2").innerText = turnColor + " Wins!!!";
        gameOver = true;
        return;
      }
    } else if ( boardState[ checkSpot ] !== turnState ){
      winCount = 0;
    }
  }
 }
}

function winCheckDiagnolNeg( p ){
  /* Process:
  yIntercept: the column-zero-intercept (y-intercept) of the play's negative-sloped diagnol line;
  it equals the row of the play - column 
  loop seven times over an extened game boaard, only counting spaces on the board
  */
 var row = Math.floor( p / 7);
 var column = (p % 7);
 var winCount = 0;
 var yIntercept = row - column;
 for ( let i = 0 ; i < 7 ; i +=1 ){//check seven places
  checkSpot = ( yIntercept * 7 ) + ( i * 8);//calculate the index of boardState we are checking
  if (checkSpot >= 0 && checkSpot <= 41 ){//only count spots on the board
    if ( boardState[ checkSpot ] == turnState){
      winCount = winCount + turnState;
      if ( winCount == 4 || winCount == -4 ){//Victory!!
        document.querySelector("h2").innerText = turnColor + " Wins!!!";
        gameOver = true;
        return;
      }
    } else if ( boardState[ checkSpot ] !== turnState ){
      winCount = 0;
    }
  }
 }
}
