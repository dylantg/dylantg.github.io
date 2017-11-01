$(function() {

  var size = 6;
  var win = 4;
  var current_player = 1;
  // Red is +1, Blue is -1
  var board = get_empty_board(size); 

  // Listen on button clicks
  $('#flip_left').click(flip_left);
  $('#flip_right').click(flip_right);
  $('#flip_over').click(flip_over);

  $('#reset').click(reset);

  // Listen to column buttons
  // $('#plus_0').click(add_to_col_0);
  $('#plus_0').click(function(){ plus(0, current_player) });
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

  // Add when click on column
  $('.col0').click(add_to_col_0);
  $('.col1').click(add_to_col_1);
  $('.col2').click(add_to_col_2);
  $('.col3').click(add_to_col_3);
  $('.col4').click(add_to_col_4);
  $('.col5').click(add_to_col_5);

  $('#overlay').click(overlay_off);

  // Click functions
  function add_to_col_0() {
    // animateAdd(0, current_player);
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


// MOVES ////////////////////////////////////////////////////////
  // Add function: Adds play to column if available
  function plus(col, play) {
    if (board[col].length < size) {
      board[col].push(play);
      end_turn();
    }
  }

  // Minus function: Removes bottom piece from column
  function minus(row) {
    if (board[row].length > 0) {
      board[row].shift();
      end_turn();      
    }
  }

// FLIPS ////////////////////////////////////////////////////////
  // Flips the board left
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

  // Flips the board right
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
    b_win = 0;
    for (i = 0; i < size; i++) {
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
          if (Math.abs(sum) === win) {
            for (k = 0; k < win; k++) {
              console.log("add win sq", i, (j + k));
              addWinSquare(i, (j + k));
            }
            if (sum === win) {
              r_win++;
            } else if (sum === (-1 * win)) {
              b_win++;
            }
          }
        }
      }
    }
    return  {'r':r_win, 'b':b_win}
  }

  function check_rows() {
    r_win = 0;
    b_win = 0;
    // Checks columns to the farthest right a win can start
    for (i = 0; i <= size - win; i++) {
      // Checks only to the height of the column, since it can't start with a played space
      for (j = 0; j < board[i].length; j++) {
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
        if (Math.abs(sum) === win) {
          for (k = 0; k < win; k++) {
            addWinSquare((i + k), j);            
          }
          if (sum === win) {
            r_win++;
          } else if (sum === (-1 * win)) {
            b_win++;
          }
        }
      }
    }
    return  {'r':r_win, 'b':b_win};
  }

  function check_diagonal_up() {
    r_win = 0;
    b_win = 0;
    for (i = 0; i <= size - win; i++) {
      for (j = 0; j <= size - win; j++) {
        sum = 0;
        for (k = 0; k < win; k++) {
          space = board[i + k][j + k];
          if (space != null) {
            sum += space;
          } else {
            break; // Short-circuits check if empty space
          }            
        }
        if (Math.abs(sum) === win) {
          for (k = 0; k < win; k++) {
            addWinSquare((i + k), (j + k));
          }
          if (sum === win) {
            r_win++;
          } else if (sum === (-1 * win)) {
            b_win++;
          }
        }
      }
    }
    return  {'r':r_win, 'b':b_win};
  }

  function check_diagonal_down() {
    r_win = 0;
    b_win = 0;
    for (i = 0; i <= size - win; i++) {
      for (j = win - 1; j < size; j++) {
        sum = 0;
        for (k = 0; k < win; k++) {
          space = board[i + k][j - k];
          if (space != null) {
            sum += space;
          } else {
            break;
          }            
        }
        if (Math.abs(sum) === win) {
          for (k = 0; k < win; k++) {
            console.log("add win sq", (i + k), (j - k));
            addWinSquare((i + k), (j - k));
          }
          if (sum === win) {
            r_win++;
          } else if (sum === (-1 * win)) {
            b_win++;
          }
        }
      }
    }
    return  {'r':r_win, 'b':b_win};
  }

  function check_for_win() {
    row_win = check_rows();
    col_win = check_columns();
    diag_up_win = check_diagonal_up();
    diag_dwn_win = check_diagonal_down();
    r_wins = row_win['r'] + col_win['r'] + diag_up_win['r'] + diag_dwn_win['r'];
    b_wins = row_win['b'] + col_win['b'] + diag_up_win['b'] + diag_dwn_win['b'];
    if (r_wins > 0 || b_wins > 0) {

      if (r_wins > b_wins) {
        return 1;
      } else if  (r_wins < b_wins) {
        return -1;
      } else {
        return 0;
      }
    }
    return null;
  }

  function declare_winner(winner) {
    if (winner != null) {
      $("#flip_buttons").css('display', 'none');
      $("#board_buttons").css('display', 'none');
      $("#player").css('display', 'none');

      if (winner === 1) {
        $("#winner").text('Red wins!');
        $("#overlay_text").text('Red wins!');
        overlay_on();
      } else if (winner === -1) {
        $("#winner").text('Blue wins!');
        $("#overlay_text").text('Blue wins!');
        overlay_on();
      } else {
        $("#winner").text('Tie!');
      }
    }
  }

  function addWinSquare(i, j) {
    space = "#sq_" + i + "_" +  j;
    $(space).addClass('win_square');            
  }

// GAME UTILS ////////////////////////////////////////////////////////

  // Group end of turn functions together
  function end_turn() {
    swap_player();
    var winner = check_for_win(); 
    if (winner != null) {
      declare_winner(winner);
    }
    draw_board();
  }

  // Draw board
  function draw_board() {
    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++){
        space = "#sq_" + i + "_" +  j;
        if (j < board[i].length) {
          value = board[i][j];
          if (value === 1) {
            $(space).css('background-color', 'red');
          } else if (value === -1) {
            $(space).css('background-color', 'blue');
          }          
        } else {
          // Removes colors that are no longer spaces
          $(space).css('background-color', 'lightgrey');
          $(space).removeClass('win_square');
        }
      }
    }
  }

  //Draw player square
  function draw_player_square() {
    if (current_player === 1){
      $("#player_square").css('background-color', 'red');
    } else {
      $("#player_square").css('background-color', 'blue');
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
    $("#winner").text('');
    $("#flip_buttons").css('display', 'initial');
    $("#board_buttons").css('display', 'initial');
    $("#player").css('display', 'initial');
    board = get_empty_board(size); 
    draw_board();
    draw_player_square();
  }

  function get_empty_board(size){
    var temp = [];
    for (i = 0; i < size; i++) {
      temp.push([]);
    }
    return temp;
  }

  function overlay_on() {
    $("#overlay").css("display", "block");
  }

  function overlay_off() {
    $("#overlay").css("display", "none");
  }

  //
  // function animateAdd(col, player) {
  //   var player_color = 'red';
  //   if (player === -1) {
  //     player_color = 'blue';
  //   }
  //   var height = board[col].length;
  //   var id = setInterval(frame, 1000);
  //   var actual_space = "#sq_" + col + "_" +  height;
  //   console.log("Actual: ", actual_space);
  //   var last_space = null;
  //   var i = col;
  //   var j = size - 1;
  //   function frame() {
  //     if (height > j) {
  //       $(actual_space).css('background-color', player_color);
  //       clearInterval(id);
  //     } else {
  //       space = "#sq_" + i + "_" +  j;
  //       console.log("drawing", i, j);
  //       $(space).css('background-color', player_color);
  //       if (space != actual_space) {
  //         $(actual_space).css('background-color', 'lightgrey');
  //       }    
  //       if (last_space != null) {
  //         $(last_space).css('background-color', 'lightgrey');
  //       }
  //       last_space = space;
  //       j--;
  //     }
  //   }
  // }

});