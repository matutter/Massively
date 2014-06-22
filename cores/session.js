var qs  = require('querystring')

function sessionZone( name, defs, local ) {
  this.peers = {}
  this.crons = {}
  this.ttl   = 2400000 // = 40 minutes
  this.id_len= 512
  this.interaction = {}


  this.start = function( user, ip ) {
    var key = salt(this.id_len)
    this.peers[ ip ] = new userSession( user, ip, key, this.ttl )
    return this.peers[ ip ]
  }

  this.transact = function(req, ip, id, pathname, forms, cb ) {
    this.updateCron(ip, this.ttl)

    if( this.peers[ip] )
      this.peers[ip].id = salt(this.id_len)


    if( req.method == 'POST' ) {
      var query = ''
      var self = this

      req.on('data', function( parts ){
        query += parts
        if( query.length > 0xf4240 ) req.connection.destroy() // unstable payload
      })

      req.on('end', function() {
        //get a parsed and tested object back
        var obj = forms.parse(  pathname, qs.parse(query) )

        if( obj ) 
          self.interact( ip, pathname, obj, cb )
        else 
          cb( self.existOrMake(ip), 'unrecognized request' )
        
      })

    } else
      cb( this.existOrMake(ip), false )

  }// end transaction

  this.interact = function( ip, hook, obj, cb ) {
    if( typeof this.interaction[hook] === 'function' ) this.interaction[hook]("hello")
      console.log( hook )
    console.log( obj )



    cb( this.existOrMake(ip), false  )
  }


  this.extract = function( req ) {
    var c = req.headers.cookie
    return (typeof c === "string") ? c.substr( c.indexOf(local.cookieName)+local.cookieName.length+1, this.id_len ) : false
  }

  this.end = function( user, token ) {

  }

  this.addInteraction = function( hook, func ) {
    if(typeof func === 'function')
      this.interaction[hook] = func
  }


  this.updateCron = function( ip, ttl ) {
    this.crons[ ip ] = setTimeout(function(){
      delete this.peers[ ip ]
    }, ttl)
  }

  this.existOrMake = function( ip ) {
    return this.peers[ ip ] || this.start( salt(32), ip )
  }

}

var SALTpossible = 'OO00AABBBCCCCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' 
function salt(i) {
    var s = ''
    while(i--)
        s += SALTpossible.charAt(Math.floor(Math.random() * SALTpossible.length));
    return s
}

function userSession(n_user, n_ip, n_key, n_ttl) {
  this.name = n_user
  this.id   = n_key
  this.ip   = n_ip
  this.ttl  = n_ttl
  this.user = false
}

exports.sessionZone = sessionZone