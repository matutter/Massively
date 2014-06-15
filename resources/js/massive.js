var socket = null;
$(document).ready(function(){
	$('.sign-up, .sign-up-btn').hide()

	$('ul.nav.navbar-nav li a').filter(':not(.active)').mouseenter(function () {
		$(this).css({border: '0 solid #DE1122', color:'#DE1122'}).stop().animate({ borderBottomWidth: 5 }, 200);
	}).mouseleave(function () {
		$(this).css({color:'#66757f'}).stop().animate({ borderWidth: 0 }, 200);
	});

	$('.select-one').click(function(){
		if( $(this).hasClass('active') ) return
		$('.sign-up, .sign-in, .sign-up-btn, .sign-in-btn').stop().toggle('swing')
		$('.select-one').removeClass('active')
		$(this).addClass('active')
	})
	/* send account request */
	$('.sign-up-btn').click(function(){
		//socket = io.connect()
		var fields = {}
		$("form.account-form input").each(function(){
		    fields[ $(this).filter(':input').attr('id') ] = $(this).filter(':input').val() 
		});
		alert( JSON.stringify(fields) )
	})

});