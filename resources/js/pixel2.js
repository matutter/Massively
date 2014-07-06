

var startupPixel2 = function() {
  var box = '<div style="width:20px;height:20px;display:inline-block;margin:1px;"></div>' 


  var width = $('#pixel-drop-wrapper').width()
    , height= $('#pixel-drop-wrapper').height()
    , canvas = document.getElementById("pixel-drop")
    , context= canvas.getContext("2d")
    , target = document.createElement("img")
    , raw = []

    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

  /*startup text*/
  canvas.width = width
  canvas.height = height
  context.font="18px Helvetica Neue"
  context.textAlign="center";
  context.fillText("Pixel2 loaded and ready", width/2 , height/2)
  context.fillText("Drop an Image here", width/2 , height/2 +16)

  /*on load*/ 
  target.addEventListener("load", function () {
    clearCanvas()
    canvas.width = target.width
    canvas.height= target.height
    context.drawImage(target, /*(width/2) - (target.width/2)*/0, 0);
  }, false);

  /*on dragover*/
  canvas.addEventListener("dragover", function (evt) {
    evt.preventDefault();
  }, false);

  /*on drop*/
  canvas.addEventListener("drop", function (evt) {
    var files = evt.dataTransfer.files;
    if (files.length > 0) {
      var file = files[0];
      if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
        var reader = new FileReader();
        reader.onload = function (evt) {
          target.src = evt.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
    evt.preventDefault();
  }, false);    

  this.getPalette = function() {
    console.log("starting pallete procedure...")
    var data = context.getImageData( 0, 0, canvas.width, canvas.height ).data;
    console.log( "content length " + data.length )
    var r,g,b,collection, unique = {}
    for(var i=0, pixel=0, n=data.length; i<n; i+=4, pixel++ ) {
      r = data[i]
      g = data[i+1]
      b = data[i+2]
      /*skipping the alpha*/
      collection =  r.hex() + '' + g.hex() + b.hex()
      if(  unique[collection] === undefined ) {
        raw.push(collection)
        unique[collection] = true
        //console.log( collection )
      }
    }
    for(var color in raw) {
      var newBox = $(box)
      newBox.css('background-color','#'+ raw[color])
      $("#paletteTarget").append( newBox )
    }
  } /*END GET PALETTE*/

  this.getImage = function() {
    clearCanvas()
    canvas.width = $('#pixel-drop-wrapper').width()
    canvas.height= $('#pixel-drop-wrapper').height()

    var cols = Math.floor( canvas.width/20 ) + 1
      , newcol = cols
      , yt = 0
      , xl = 0
      , boxes

    for(var i =0; i<100; i++) {
      if(cols == 1) {
        cols = newcol
        xl =  0
        yt += 20
      }
      drawBox( xl, yt, raw[i] || '000' )
      xl += 20
      cols--
      boxes++;
    };

  };

  function drawBox(xl,yt,color) {
      context.beginPath();
      context.rect( xl, yt, xl+40, yt+40  ) /*I draw it at twice the size of the box so that the overlap causes the extra boxes to be black*/
      context.fillStyle='#'+color
      context.fill()
  }

}


$(document).ready(function(){
  var PIX2 = new startupPixel2();
  $('#getPalette').click(function(){
    PIX2.getPalette();
  });
  $('#getImage').click(function(){
    PIX2.getImage();
  })
  $("#paletteTarget").on('click','div',function(){
    var color = $(this).css('background-color');
    $('#rgbTarget').text( color );
    $('#hexTarget').text( '#' + color.hex16() );
  });
  $('#clearAll').click(function(){
    delete PIX2;
    PIX2 = new startupPixel2();
    $("#paletteTarget").empty();
  });
});

Number.prototype.hex = function() {
  var s = this.toString(16).toUpperCase(); 
  if(s.length == 2) return s
    else return "0" + s
}
String.prototype.hex16 = function() {
  var s = this.match(/\d+/g).map(Number);
    return s[0].hex() + "" + s[1].hex() + "" + s[2].hex();
}