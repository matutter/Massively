var local = {}
  , jade = require('jade')
  , fs = require("fs")
  , mimeType = {}
  , pages = {}
  , assets = {}
  , aliasList = {}
  , local = {}

function aliased( res, page, db, session ) {
  std_page( res, aliasList[ page ] , db, session )
}
// user is the DB entry for the user
function std_page( res, template, db, session ) {
  var resourceData = { pretty:true, page:template, session:session, nav:local.navbar, website:local.website, webIMG:local.websiteIMG }

  //local.log({ label:'handler', nodes: [ template ] })
  //console.log( user_session )
  jade.renderFile( local.viewDir + template +'.jade', resourceData, function( err, page ) {
    if(err)
      missingLayout(res, template, err)
    else {
      var exp = new Date();
      exp.setTime( exp.getTime() + session.ttl )
      //console.log( local.website +'='+session.id+';expire='+ exp.toGMTString() )
      res.writeHead(200, {
        'Set-Cookie': local.website +'='+session.id+';expire='+ exp.toUTCString(),
        'Content-Length': page.length,
        'Content-Type': 'text/html' 
      });
      res.end( page )
    }
  }) 
}

function std_content(res, pathto, file, mime) {
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
    'Content-Length': local.errPage.length,
    'Content-Type': 'text/html' 
  });
  res.end(local.errPage)
}
// * on error *
function err404(res, err) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.end('Error 404 not found');
}
function error(path, page, ext, res) {
  var err = 'not found'
  if(!ext)
    missingLayout( res, path , err)
  else
    err404( res, err )
}
function setAlias(obj) {
  aliasList = obj;
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