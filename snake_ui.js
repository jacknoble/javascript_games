(function(root) {
  var SnakeGame = root.SnakeGame = ( root.SnakeGame || {} );

  var View = SnakeGame.View = function($el) {
    this.$el = $el;
  }

  View.prototype.start = function(){
    this.board = new SnakeGame.Board();
    this.handleKeyEvent();
    this.TIMER = setInterval(this.step.bind(this), 150);
  }

  View.prototype.step = function(){
    this.board.snake.move();
    this.board.eatApple();
    if (this.board.hitWall() || this.board.snake.crashIntoSelf()){
      alert("You are dead.");
      clearInterval(this.TIMER);
      $('h4').text("Press enter to play again!");
    } else {
     this.render();
    }
  }

  View.prototype.render = function(){
    $('.cell').remove();
    this.board.changeGrid().forEach( function(row) {
      row.forEach(function(char){
        var cell = $('<div class="cell"></div>');
        if (char === "S") {
          cell.addClass("snake");
        } else if (char === "A") {
          cell.addClass("apple");
        } else if (char === "H") {
          cell.addClass("head")
        }
        $('.board').append(cell);
      })
    });
    $('.score').html(this.board.score);
  }

  View.prototype.handleKeyEvent = function(event) {
    var snake = this.board.snake
    key('up', function(){
      snake.turn('N');
    });
    key('down', function(){
      snake.turn('S');
    });
    key('left', function(){
      snake.turn('W');
    });
    key('right', function(){
      snake.turn('E');
    });

    key('p', function(){

    })
  }

})(this);

$(function(){
  $('h4').text("Press enter to begin. Control with arrow keys.");
  v = new SnakeGame.View($('.board'));
  var browser=navigator.userAgent.toLowerCase();
  if(browser.indexOf('firefox') > -1) {
    $('.board').width("570px")
  }
  key('enter', function(){
    $('h4').text("");
    v.start();
  })
})