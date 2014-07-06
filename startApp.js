// start app 

var ip    = process.env.OPENSHIFT_NODEJS_IP	|| '127.0.0.1'
	, port  = process.env.OPENSHIFT_NODEJS_PORT	|| '8888'
	, init  = require('./cores/initializer')
	, dbAddr= 'mongodb://' + openShiftDB()


  /*mongodb.connect(dbAddr, function(err, db){*/

    var instance = new init.server()
    instance.setup()
    instance.begin( ip, port )

  /*})*/

function openShiftDB() {
  return process.env.OPENSHIFT_MONGODB_DB_PASSWORD ? process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME : '127.0.0.1:27017/blog' 
}

