var __LM_source = document.getElementById("LIVEMARKDOWN-source")
var __LM_target = document.getElementById("LIVEMARKDOWN-target")
var converter = new Showdown.converter();
var __LM_HTML = false
__LM_target.innerHTML =  converter.makeHtml( __LM_source.value )
__LM_source.addEventListener('keyup', function(e) {
	e = e || window.event;
	if(!HTML)
		__LM_target.innerHTML =  converter.makeHtml( __LM_source.value )
	else
		$('#LIVEMARKDOWN-target').text( converter.makeHtml( __LM_source.value ) )
}, false);

$(document).ready(function(){
	$('#HTML').click(function(){
		__LM_HTML = true
		__LM_target.innerHTML =  converter.makeHtml( __LM_source.value )
	})
	$('#Preview').click(function(){
		__LM_HTML = false
		__LM_target.innerHTML =  converter.makeHtml( __LM_source.value )
	})
})

