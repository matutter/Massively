// initializer

var server  = require('./server')  // where we serve things
  , router  = require('./router')  // where determining what type of asset handling should occur
  , handler = require('./handler') // where requests are actually satisfied
  , defs    = require('./defs').all
  , branch  = null
  , verbose = false


function server_obj(db) {

  this.setup = function( ) {

    handler.locals.viewDir = './resources/views/'
    handler.locals.navbar = {
      top:[
        new defs.nav('glyphicon-home', 'Home', 'home', 'index'), 
        new defs.nav('glyphicon-book', 'Blog', '', 'blog'),
        new defs.nav('glyphicon-user', 'About', 'about', 'about')
      ],
      bottom:[
        new defs.nav('glyphicon-briefcase', 'Projects', 'tools', 'tools')
      ]
    }


    var css = './resources/css/'
      , js  = './resources/js/'
      , img = './resources/images/'
      , font= './resources/fonts/'

    // pathTo to asset
    handler.pathTo['ico']  = img    //favicon
    handler.pathTo['css']  = css    //stylesheets
    handler.pathTo['js']   = js     //client side javascript
    handler.pathTo['png']  = img
    handler.pathTo['jpg']  = img
    handler.pathTo['jpeg'] = img
    handler.pathTo['woff'] = font   //bootstrap glyphicons font types
    handler.pathTo['ttf']  = font   //
    handler.pathTo['eot']  = font   //
    handler.pathTo['svg']  = font   //

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
    handler.pagePathTo['']       = handler.aliased
    handler.pagePathTo['home']   = handler.aliased
    handler.pagePathTo['tools']  = handler.std_page
    handler.pagePathTo['livemark']= handler.aliased
    handler.pagePathTo['codemassively']= handler.aliased
    handler.pagePathTo['pixel2']= handler.aliased
    handler.pagePathTo['about'] = handler.std_page
    /*Given:Used*/
    handler.setAlias({ 
      '':'index',
      'home':'index',
      'livemark':'tools/livemark',
      'codemassively':'tools/codemassively',
      'pixel2':'tools/pixel2'
    })
  } // setup

  this.begin = function(ip, port) {
      server.startup(router.route, handler, ip, port)
  }

}

exports.server = server_obj