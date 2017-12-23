$(function(){
	function randomString() {
    	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    	var str = '';
    	for (var i = 0; i < 10; i++) {
        	str += chars[Math.floor(Math.random() * chars.length)];
    	}
    	return str;
	}
	function Board(name){
		var self = this;
    	this.name = name;console.log(self.name);
    	this.$element = createBoard();
		function createBoard() {
    		var $board = $('<div>').addClass('board');
			var $boardTitle = $('<h2>').addClass('board-title').text(self.name);
			var $boardColumnList = $('<ul>').addClass('board-column-list');
			var $boardDelete = $('<button>').addClass('btn-delete').text('x');
			var $boardAddColumn = $('<button>').addClass('add-column').text('Add a column');
			$boardDelete.click(function() {
        		self.removeBoard();
			});
			self.addBoard();
    		$boardAddColumn.click(function() {
        		self.addColumn(new Column(prompt("Enter the name of the column")));
			});
			$board.append($boardTitle)
			.append($boardDelete)
			.append($boardAddColumn)
			.append($boardColumnList);
			return $board;
		}
	}
	Board.prototype={
		removeBoard:function(){
			this.$element.remove();
		},
		addBoard:function(){
			$('.board-container').append(this.$element);
		},
		initSortable:function(){
			$('.column-card-list').sortable({
      		connectWith: '.column-card-list',
      		placeholder: 'card-placeholder'}).disableSelection();
		},
		addColumn:function(column){
			this.$element.append(column.$element);
		}
	}
    function Column(name) {
    	var self = this;
    	this.id = randomString();
    	this.name = name;
    	this.$element = createColumn();
		function createColumn() {
    		var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
			$columnDelete.click(function() {
        		self.removeColumn();
			});
    		$columnAddCard.click(function() {
        		self.addCard(new Card(prompt("Enter the name of the card")));
			});
			$column.append($columnTitle)
        	.append($columnDelete)
        	.append($columnAddCard)
        	.append($columnCardList);
			return $column;
    	}
  	}
  	Column.prototype = {
    	addCard: function(card) {
      		this.$element.children('ul').append(card.$element);
    	},
    	removeColumn: function() {
      		this.$element.remove();
    	}
	};
	function Card(description) {
		var self = this;
    	this.id = randomString();
	    this.description = description;
	    this.$element = createCard();
	    function createCard() {
    		var $card = $('<li>').addClass('card');
    		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
    		var $cardDelete = $('<button>').addClass('btn-delete').text('x');
    		$cardDelete.click(function(){
   		    	self.removeCard();
			});
   		    $card.append($cardDelete)
			.append($cardDescription);
			return $card;
    	}
	}
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}
	$('.add-board').click(function(){
		var name = prompt('Enter a board name');
		var board = new Board(name);
		board.addBoard();
	});
	$('.create-column').click(function(){
		var name = prompt('Enter a board name');
		var board = new Board(name);
		board.addBoard(board);
	});
	$('.boardAddColumn').click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
    	column.addColumn(column);
	});
	var firstBoard = new Board('Kanban');
		firstBoard.addBoard(name);
	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	firstBoard.addColumn(todoColumn);
	firstBoard.addColumn(doingColumn);
	firstBoard.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});