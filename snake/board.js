(function(root) {
  var SnakeGame = root.SnakeGame = ( root.SnakeGame || {} );

  var Board = SnakeGame.Board = function(){
    Board.SIZE = 30;
    var start = Board.SIZE/2
    this.snake = new SnakeGame.Snake([start, start]);
    this.apples = [];
    this.grid = Board.makeGrid();
    this.score = 0;
    var that = this;
    _(3).times(function(n){
      that.addApple();
    })
  };

  Board.prototype.updateScore = function(){
    this.score += (10 * (this.snake.segments.length));
  }


  Board.prototype.hitWall = function(){
    snakeHead = this.snake.head();
    return (snakeHead[0] > Board.SIZE - 1 || snakeHead[0] < 0
    || snakeHead[1] > Board.SIZE - 1 || snakeHead[1] < 0)
  }

  Board.prototype.eatApple = function(){
    var snake = this.snake;
    var apples = this.apples
    var board = this
    this.apples.forEach(function(apple, index){
      var head = snake.head();
      if (head[0] === apple[0] && head[1] === apple[1]){
        apples.splice(index, 1);
        board.updateScore();
        _(3).times(function(n) { snake.addSegment() });
        board.addApple();
        return true;
      } else {
        return false;
      }
    })
  }

  Board.prototype.changeGrid = function(){
    var board = this;
    this.grid.forEach(function(row, rowIndex){
      row.forEach(function(cell, colIndex){
        board.grid[rowIndex][colIndex] = board.getCellType(rowIndex, colIndex);
      })
    })

    return this.grid;
  };

  Board.prototype.getCellType = function(rowIndex, colIndex){
    var cellType = "*";

    this.apples.forEach(function(apple){
      if (apple[0] === rowIndex && apple[1] === colIndex){
        cellType = "A";
      }
    })
    var snakeSegments = this.snake.segments;
    var headIndex = snakeSegments.length - 1;
    snakeSegments.forEach(function(segment, segIndex){
      if (segment[0] === rowIndex && segment[1] === colIndex){
        cellType = "S";
        if (segIndex === headIndex){
          cellType = "H";
        }
      }
    })

    return cellType;
  }

  Board.prototype.addApple = function() {
    randX = Math.floor(Math.random() * Board.SIZE);
    randY = Math.floor(Math.random() * Board.SIZE);
    this.apples.push([randX, randY]);
  }

  Board.prototype.isSnake = function(rowIndex, colIndex){
    var isSnake = false;
    this.snake.segments.forEach(function(segment){
      if (segment[0] === rowIndex && segment[1] === colIndex){
        isSnake = true;
      }
    })
    return isSnake;
  }


  Board.makeGrid = function(){
    var grid = []
    for(i = 0; i < Board.SIZE; i++){
      grid.push([])
      for(j = 0; j < Board.SIZE; j++){
        grid[i].push(null);
      }
    }
    return grid;
  }
})(this);