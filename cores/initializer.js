// initializer

var server  = require('./server')  // where we serve things
  , router  = require('./router')  // where determining what type of asset handling should occur
  , handler = require('./handler') // where requests are actually satisfied
  , session = require('./session') // where cookie parsing and tokens are handled
  , sockets = require('./socket_handler') // all socket communication here
  , defs    = require('./db_def')
  , forms   = require('./form_parser')
  , branch  = null
  , verbose = false


function server_obj(db) {

  this.setup = function( ) {

    defs.DBsetup( db, false )
    defs.locals.cipher = "xxx"

    handler.locals.website = "CodeMassively"
    handler.locals.websiteIMG = 'codemassively.png'
    handler.locals.home_page = 'home'
    handler.locals.viewDir = './resources/views/'
    handler.locals.navbar = {}
    handler.locals.navbar.left = {home:'home', test:'err page'}
    handler.locals.navbar.right = {account:'sign in'}

      handler.locals.init = function() {
        handler.jade.renderFile( handler.locals.viewDir + 'notfound.jade', null, function( err, page ) {
          if(err) console.log( err )
          if(err)
            handler.locals.errPage = 'set up an error page'        
          else
            handler.locals.errPage = page 
        })
      }
      // run pre-cache this to avoid a specific, rare, and old exploit
      handler.locals.init()


    session = new session.sessionZone( 'users', defs, {cookieName:handler.locals.website} )
    session.addInteraction('login',function( obj ){
      console.log('callback is working' + obj)
    })

    forms = new forms.formParser( defs )
    forms.addParser('login', ['Username','Password'],[] )
    forms.addParser('signup',['Username','Password','Email'],['Website'])

    var css = './resources/css/'
      , js  = './resources/js/'
      , img = './resources/images/'

    // pathTo to asset
    handler.pathTo['ico']  = img    //favicon
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
    handler.pagePathTo['']        = handler.aliased
    handler.pagePathTo['home']    = handler.std_page
    handler.pagePathTo['account'] = handler.std_page
    handler.pagePathTo['login']   = handler.aliased
    handler.pagePathTo['signup']  = handler.aliased
    handler.setAlias({ '':'home','login':'account','signup':'account' })
  } // setup

  this.setBranch = function( s ) {
    branch = s
  }

  this.begin = function(ip, port) {
      server.startup(router.route, handler, sockets, db, defs, session, forms, ip, port)

  }

}


exports.server = server_obj