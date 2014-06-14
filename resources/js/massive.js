//socket = io.connect()
$(document).ready(function(){
	$('ul.nav.navbar-nav li a').filter(':not(.active)').mouseenter(function () {
		$(this).css({border: '0 solid red'}).animate({ borderBottomWidth: 5 }, 500);
	}).mouseleave(function () {
		$(this).animate({ borderWidth: 0 }, 500);
	});




});