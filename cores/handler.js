var local = {}
  , jade = require('jade')
  , fs = require("fs")
  , mimeType = {}
  , pages = {}
  , assets = {}
  , aliasList = {}
  , local = {}

function aliased( res, page ) {
  std_page( res, aliasList[ page ] )
}
// user is the DB entry for the user
function std_page( res, template ) {
  console.log("TMPLT " + template)
  var resourceData = {
      'pretty': false,
      'page'  : template,
      'nav'   : local.navbar
    }

  //console.log( '+ ' + local.viewDir +template )
  jade.renderFile( local.viewDir + template +'.jade', resourceData, function( err, page ) {
    if(err)
      missingLayout(res, template, err)
    else {
      res.writeHead(200, {
        /*'Set-Cookie': cookieString(session.id, session.ttl),*/
        'Content-Length': page.length,
        'Content-Type': 'text/html' 
      });
      res.end( page )
    }
  }) 
}

function std_content(res, pathto, file, mime) {
  console.log("Content " + file)
  if( file.lastIndexOf('/') >= 0 )
    file = file.substring( file.lastIndexOf('/') )

  fs.readFile(("" + pathto + file), function(err, data) {
    if (err) return err404( res, err )
    res.writeHead(200, {'content-type':mime})
    res.end(data)
  })
}

// * on error *
function missingLayout(res, name, err) {
  res.writeHead(200, {
    //'Set-Cookie': cookieData,
    'Content-Length': local.errMsg.length,
    'Content-Type': 'text/html' 
  });
  res.end(local.errMsg)
}
// * on error *
function err404(res, err) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.end('Error 404 not found');
}
function error(res, path, page, ext,  err) {
  if(!err)
    err = 'unkown error: 404'

/*  if(!ext)
    missingLayout( res, path, err)
  else*/
    err404( res, err )
}
function setAlias(obj) {
  aliasList = obj;
}
function cookieString(id, ttl) {
  var exp = new Date()
  exp.setTime( exp.getTime() + ttl )
  
  return local.website +'='+id+';expire='+ exp.toUTCString()
}

exports.aliased = aliased
exports.std_page = std_page
exports.std_content = std_content
exports.error = error
exports.jade = jade

exports.pathTo = assets
exports.mimeType = mimeType
exports.pagePathTo = pages
exports.setAlias = setAlias
exports.locals = local