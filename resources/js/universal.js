var KEY = {
	Enter:13
	, Backspace : 8
}
function Line() {
	this.No       = 0
	this.text     = []
	this.cache    = ""
	this.select   = {s:0,e:0}
	this.changing = false
	this.changed  = false
	this.change   = function(i,c) {
		if( typeof c === 'number' )
			this.insert(i,String.fromCharCode(c))
		else
			this.insert(i,c)
		this.changed  = true;
		this.changing = true;
	}
	this.insert   = function(i,c) {
		this.text.splice(i,0,c)
	}
	this.remove   = function(i, n) {
		this.text.splice(i,n)
		this.changed  = true;
		this.changing = true;
	}
	this.newline  = function(i) {
		var s = this.text.slice(i)
		this.text.splice(i)
		return s;
	}
	this.concat   = function(s)
	{
		this.text = this.text.concat(s)
	}
	this.toString = function() {
		if( !this.changed ) return this.cache
		this.cache = this.text.join("")
		return this.cache
	}
	this.cursorat = function(i) {
		s = this.toString()
		return s.slice(0,i) + "<cursor>"+(i==0?"":s.slice(i,1))+"</cursor>"+ s.slice(i,s.length)
	}
	this.empty  = function() {
		return this.text.length == 0;
	}
	this.length = function() {
		return this.text.length;
	}
}
var Editor = {
	text       : []
	, nlines   : 0
	, shifted  : 0
	, c        : {row:0,col:0} 
	, keypressSpecial : function(e) {
		if(    e.which == 8
			|| e.which == 13
			|| (e.which >= 37
			&& e.which <= 40) ) this.keyRoute(e)
		this.reportShift(e)
		this.debug(e)
	}
	, keypress : function(e)
	{
		this.reportShift(e)
		this.keyRoute(e)
		this.debug(e)
	}
	, reportShift : function(e) {
		this.shifted = e.shiftKey
		this.debug(e)
	}
	, debug    : function(e) {
		s = e.which + (this.shifted?"|SHIFT + ":"|") + String.fromCharCode(e.which) + " | " + this.c.row + " " + this.c.col
		$('.sessions').text( s )		
	}
	, newline  : function() {
		var l = new Line()
		l.changed = true
		if( this.Row().length() != 0 )
			l.text = this.Row().newline(this.c.col)
		this.text.splice( this.c.row+1, 0, l )
		this.moveCursor('next')
		this.c.col = 0
	}
	, Row  : function() { return this.text[this.c.row] }
	, highlight    : function( newc, oldc ) {
		var rows = newc.row - oldc.row
		var cols = newc.col - oldc.col
		//alert( rows +","+ cols )
	}
	, moveCursor   : function(where) {
		var col = this.c.col
		var row = this.c.row
		var length = this.Row().length()
		var old = {row:0,col:0}
		old.row = row
		old.col = col
		switch(where) {
			case 'left':
				switch(col) {
					case 0:
						if( this.c.row == 0 ) return
						this.moveCursor('prev')
						this.c.col = this.Row().length()
						break
					default:
						this.c.col--
				}
				break;
			case 'right':
				switch(col) {
					case length:
						if(row == this.text.length-1) return
						this.moveCursor('next')
						this.c.col = 0
						break;
					default:
						this.c.col++
				}
				break;
			case 'prev':
				if( row == 0 ) return
				this.c.row--
				break;
			case 'next':
				if( row + 1 == this.text.length ) return
				this.c.row++
				break;

		}
		if( this.shifted ) this.highlight( this.c, old )
	}
	, backspace : function() {
		if( this.c.row == 0 && this.c.col == 0 ) return
		var length = this.Row().length()
		switch(length) {
			case 0:
				this.text.splice( this.c.row, 1 )
				this.moveCursor('prev')
				this.c.col = this.Row().length()
				break;
			default:
				if( this.c.col == 0 )
				{
					var s = this.Row().text
					this.text.splice( this.c.row, 1 )
					this.moveCursor('prev')
					this.c.col = this.Row().length()
					this.Row().concat(s)
				}
				else
				{
					this.text[this.c.row].remove(this.c.col-1,1)
					this.c.col--;
				}
		}
	}
	, validate : function() {
		this.c.row = this.c.row < 0 ? 0 : this.c.row;		
		this.c.col = this.c.col < 0 ? 0 : this.c.col;
	}
 	, keyRoute : function(e)
	{
		var k = e.which
		switch( k ) {
			case 8 /* Backsp */ :
				e.preventDefault()
				this.backspace()
				break;
			case 13 /* Enter */ :
				e.preventDefault()
				this.newline()
				break;
			case 37 /* left  */ :	
				e.preventDefault()
				this.moveCursor('left')
				break;
			case 38 /* up    */ :
				e.preventDefault()
				this.moveCursor('prev')
				break;
			case 39 /* right */ :
				e.preventDefault()
				this.moveCursor('right')
				break;
			case 40 /* down    */ :
				e.preventDefault()
				this.moveCursor('next')
				break;
			default /*       */ :
			if( k >= 17 && k <= 222 )
			{
				this.Row().change( this.c.col++, k )
			}
		}
		this.update()
	}
	, update : function() {
		this.validate()
		s = ""
		$('.lines').empty()
		for (var i = 0; i < this.text.length; i++)
		{
			$('.lines').append(i+'\n')
			s += '<li>'
			if( this.c.row == i )
				s += this.text[i].cursorat(this.c.col)
			else
				s += this.text[i].toString()
			s += '</li>'
		}
		this.render(s)
	}
	, init   : function() {
		this.text.push( new Line() )
		this.text[0].changing = true
	}
	, render : null
}
Editor.init()
$(document).ready(function() {
	Editor.render = function(s) {
		$('.textarea').html(s)
	}
	$(window).keypress(function(e) { Editor.keypress(e) });
	$(window).keydown (function(e) {
		if(e.which != 13) Editor.keypressSpecial(e)
	});
	$(window).keyup   (function(e) {
		if(e.which != 8 && e.which != 13 && e.which < 37 && e.which > 40)
			Editor.keypressSpecial(e)
		else
			Editor.reportShift(e)
	});
});