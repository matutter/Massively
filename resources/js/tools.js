var tool_loaded = {}
var colors = ['5fcf80','5faecf','333333','cf805f','cfb85f','aecf5f','76cf5f']
$(document).ready(function(){
	$('#tool-target').hide()

	$('.tool').each(function(){
		$(this).css('background-color','#'+colors[0])
		colors.shift()
	})

	if( location.hash ) {
		var id = location.hash.replace(/\#/,'')
		switchArea()
		$('.tool-target').load('tools/'+id)
	}

	$('.tool').click(function(){
		var id = $(this).attr('id')
		window.location.hash = id
		switchArea()
		$('.tool-target').load('tools/'+id)
	})
	$('#closeToolbox').click(function(){
		switchArea()
		window.location.hash = ''
	})
})


function switchArea() {
/*	$('#toolbox').slideToggle('fast',function(){
		$('#tool-target').slideToggle('fast')
	})*/
	$('#toolbox, #tool-target').slideToggle('fast')
}
