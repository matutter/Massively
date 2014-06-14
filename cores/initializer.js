// initializer

var server  = require('./server')  // where we serve things
  , router  = require('./router')  // where determining what type of asset handling should occur
  , handler = require('./handler') // where requests are actually satisfied
  , session = require('./session') // where cookie parsing and tokens are handled
  , sockets = require('./socketHandler') // all socket communication here
  , mongodb = require('mongodb')
  , archy   = require('archy')
  , branch  = null

  function jlog(obj, override) {
    if( branch != '127.0.0.1' && !override) return
    console.log(  archy( obj ) )
  }

  server.locals.log = jlog
  router.locals.log = jlog
  handler.locals.log = jlog
    handler.locals.home_page = 'index'
    handler.locals.viewDir = './resources/views/'
  session.locals.log = jlog
  sockets.locals.log = jlog

var css = './resources/css/'
  , js  = './resources/js/'
  , img = './resources/images/'

// pathTo to asset
handler.pathTo['ico']  = css    //favicon
handler.pathTo['css']  = css    //stylesheets
handler.pathTo['js']   = js     //client side javascript
handler.pathTo['png']  = img
handler.pathTo['jpg']  = img
handler.pathTo['jpeg'] = img
handler.pathTo['woff'] = css   //bootstrap glyphicons font types
handler.pathTo['ttf']  = css   //
handler.pathTo['eot']  = css   //
handler.pathTo['svg']  = css   //

// mimetype associated with extension
handler.mimeType['ico']   = 'image/x-icon'
handler.mimeType['css']   = 'text/css'
handler.mimeType['js']    = 'text/javascript'
handler.mimeType['png']   = 'image/png'
handler.mimeType['jpg']   = 'image/jpg'
handler.mimeType['jpeg']  = 'image/jpg'
handler.mimeType['woff']  = 'application/x-font-woff'
handler.mimeType['ttf']   = 'application/octet-stream'
handler.mimeType['eot']   = 'font/opentype'
handler.mimeType['svg']   = 'image/svg+xml'

// which template renders for given page
handler.pagePathTo['']      = handler.home_page
handler.pagePathTo['index']  = handler.std_page


function server_obj() {
  this.setBranch = function( s ) {
    branch = s
  }

  this.begin = function(ip, port, dbAddr) {
    mongodb.connect(dbAddr, function(err, db){
      server.startup(router.route, handler, sockets, db, session, ip, port)
    })
  }
}


exports.server = server_obj