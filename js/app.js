$(function() {

  var size = 6;
  var win = 4;
  var current_player = 1;
  // Red is +1, Yellow is -1
  var board = get_empty_board(size); 

  // Listen on button clicks
  $('#flip_left').click(flip_left);
  $('#flip_right').click(flip_right);
  $('#flip_over').click(flip_over);

  // Listen to column buttons
  $('#plus_0').click(add_to_col_0);
  $('#plus_1').click(add_to_col_1);
  $('#plus_2').click(add_to_col_2);
  $('#plus_3').click(add_to_col_3);
  $('#plus_4').click(add_to_col_4);
  $('#plus_5').click(add_to_col_5);

  $('#minus_0').click(subtract_from_col_0);
  $('#minus_1').click(subtract_from_col_1);
  $('#minus_2').click(subtract_from_col_2);
  $('#minus_3').click(subtract_from_col_3);
  $('#minus_4').click(subtract_from_col_4);
  $('#minus_5').click(subtract_from_col_5);

  function add_to_col_0() {
    plus(0, current_player);
  }

  function add_to_col_1() {
    plus(1, current_player);
  }

  function add_to_col_2() {
    plus(2, current_player);
  }

  function add_to_col_3() {
    plus(3, current_player);
  }

  function add_to_col_4() {
    plus(4, current_player);
  }

  function add_to_col_5() {
    plus(5, current_player);
  }

  function subtract_from_col_0() {
    minus(0);
  }

  function subtract_from_col_1() {
    minus(1);
  }

  function subtract_from_col_2() {
    minus(2);
  }

  function subtract_from_col_3() {
    minus(3);
  }

  function subtract_from_col_4() {
    minus(4);
  }

  function subtract_from_col_5() {
    minus(5);
  }

  // Listen on column clicks (if neccessary)


// MOVES ////////////////////////////////////////////////////////
  // Add function: Adds play to column if available
  function plus(col, play) {
    console.log("Plus: " + col + ":" + play);
    if (board[col].length < size) {
      board[col].push(play);
      end_turn();
    }
  }

  // Minus function
  function minus(row) {
    console.log("Minus: " + row);
    if (board[row].length > 0) {
      board[row].shift();
      end_turn();      
    }
  }

// FLIPS ////////////////////////////////////////////////////////
  // Flip left
  function flip_left() {
    var temp = get_empty_board(size);
    // For every row
    for (j = size - 1; j >= 0; j--) {
      // For every column
      for (i = 0; i < size; i++) {
        var value = board[i][j];
        if (value != null) {
          temp[size - 1  - j].push(value);
        }
      }
    }
    board = temp;
    end_turn();
  }

  // Flip right
  function flip_right() {
    var temp = get_empty_board(size);
    // For every row
    for (j = 0; j < size; j++) {
      // For every column
      for (i = size - 1; i >= 0; i--) {
        var value = board[i][j];
        if (value != null) {
          temp[j].push(value);
        }
      }
    }
    board = temp;
    end_turn();
  }

  // Flip over
  function flip_over() {
    for (i = 0; i < size; i++) {
      board[i].reverse();
    }
    end_turn();
  }

// WIN CHECKS ////////////////////////////////////////////////////////
  // Check for win
  function check_columns() {
    r_win = 0;
    y_win = 0;
    for (i = 0; i < size; i++) {
      // console.log("Checking column: ", i);
      col_size = board[i].length;
      // Only continues if column if large enough to have a win
      if (col_size >= win){
        for (j = 0; j <= col_size - win; j++) {
          sum = 0;
          for (k = 0; k < win; k++) {
            space = board[i][j + k];
            if (space != null) {
              sum += space;
            } else {
              break; // Short-circuits check if empty space
            }
          }
          if (sum === win) {
            r_win++;
          } else if (sum === (-1 * win)) {
            y_win++;
          }
        }
      }
    }
    return  {'r':r_win, 'y':y_win}
  }

  function check_rows() {
    r_win = 0;
    y_win = 0;
    // Checks columns to the farthest right a win can start
    for (i = 0; i <= size - win; i++) {
      // Checks only to the height of the column, since it can't start with a played space
      for (j = 0; j < board[i].length; j++) {
        console.log("Rows checking: ", i, j);
        sum = 0;
        for (k = 0; k < win; k++) {
          if (i + k <= size - 1) {
            space = board[i + k][j];
            if (space != null) {
              sum += space;
            } else {
              break; // Short-circuits check if empty space
            }
          }
        }
        if (sum === win) {
          r_win++;
        } else if (sum === (-1 * win)) {
          y_win++;
        }
      }
    }
    return  {'r':r_win, 'y':y_win};
  }

  function check_diagonal_up() {
    r_win = 0;
    y_win = 0;
    for (i = 0; i <= size - win; i++) {
      for (j = 0; j <= size - win; j++) {
        // console.log("Diag Up checking: ", i, j);
        sum = 0;
        for (k = 0; k < win; k++) {
          space = board[i + k][j + k];
          if (space != null) {
            sum += space;
          } else {
            break; // Short-circuits check if empty space
          }            
        }
        if (sum === win) {
          r_win++;
        } else if (sum === (-1 * win)) {
          y_win++;
        }
      }
    }
    return  {'r':r_win, 'y':y_win};
  }

  function check_diagonal_down() {
    r_win = 0;
    y_win = 0;
    for (i = 0; i <= size - win; i++) {
      for (j = win - 1; j < size; j++) {
        console.log("Diag Down checking: ", i, j);
        sum = 0;
        for (k = 0; k < win; k++) {
          space = board[i + k][j - k];
          if (space != null) {
            sum += space;
          } else {
            break;
          }            
        }
        if (sum === win) {
          r_win++;
        } else if (sum === (-1 * win)) {
          y_win++;
        }
      }
    }
    return  {'r':r_win, 'y':y_win};
  }

  function check_for_win() {
    row_win = check_rows();
    col_win = check_columns();
    diag_up_win = check_diagonal_up(); //TODO
    diag_dwn_win = check_diagonal_down(); //TODO
    r_wins = row_win['r'] + col_win['r'] + diag_up_win['r'] + diag_dwn_win['r'];
    y_wins = row_win['y'] + col_win['y'] + diag_up_win['y'] + diag_dwn_win['y'];
    if (r_wins > y_wins) {
      alert('Red wins!');
      reset();    
    } else if  (r_wins < y_wins) {
      alert('Yellow wins!');
      reset();    
    }
  }

  // function declare_winner(winner) {
  //   winner_declaration = winner + " wins!"
  //   if (confirm("Play again?") == true) {
  //     reset();
  //   } else {
  //     // TODO: DO SOMETHING
  //   }
  // }

// GAME UTILS ////////////////////////////////////////////////////////

  // Group end of turn functions together
  function end_turn() {
    draw_board();
    swap_player();
    // TODO: CHECK FOR WIN
    check_for_win(); 
  }

  // Draw board
  function draw_board() {
    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++){
        space = "#sq_" + i + "_" +  j;
        if (j < board[i].length) {
          value = board[i][j];
          if (value === 1) {
            // $(space).attr('class', 'square red');
            // $(space).addClass('red');
            $(space).css('background-color', 'red');
          } else if (value === -1) {
            // $(space).attr('class', 'square yellow');
            $(space).css('background-color', 'yellow');
          }          
        } else {
          // Removes colors that are no longer spaces
          $(space).css('background-color', 'lightgrey');
        }
      }
    }
  }

  //Draw player square
  function draw_player_square() {
    $("#player_square").removeClass();
    if (current_player === 1){
      $("#player_square").css('background-color', 'red');
    } else {
      $("#player_square").css('background-color', 'yellow');
    }
  }

  // Swap player
  function swap_player() {
    current_player *= -1;
    draw_player_square();
  }

  // Reset game
  function reset() {
    current_player = 1;
    board = get_empty_board(size); 
    draw_board();
    draw_player_square();
  }

  // Draw win (TODO)


  function get_empty_board(size){
    var temp = [];
    for (i = 0; i < size; i++) {
      temp.push([]);
    }
    return temp;
  }

});