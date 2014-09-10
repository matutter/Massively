var ip    	= process.env.OPENSHIFT_NODEJS_IP		|| '127.0.0.1'
	, port 		= process.env.OPENSHIFT_NODEJS_PORT	|| '8888'
	, dbAddr	= 'mongodb://' + openShiftDB()
  , mongodb = require('mongodb')

/* optomized for OPENSHIFT or Local */
function openShiftDB() {
  return process.env.OPENSHIFT_MONGODB_DB_PASSWORD ?
  	process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME : '127.0.0.1:27017/blog' 
}
/* pass server init as CB arg */
function Connect(cb) {
  mongodb.connect(dbAddr, function(err, db){
  	if( !err )
	  	cb(db);
	  else
	  	console.log( "Cannot connect" + dbAddr );
  })
}


function getPosts(db, first, offset, limit, cb) {
	offset = offset > limit ? limit : offset;

	db.collection('blog').find().skip(first).limit(offset).toArray(function(err, res){
		if( !err )
			cb(res)
		else
			cb('{"err":"no data"}')
	})



}

/* settup blog DB */
function SetupBlog() {
	mongodb.connect(dbAddr, function(err, db) {
		if( !err )
		{

			db.collection( 'user' ).ensureIndex( { name: 1 }, { unique: true }, function(err, info) {
		    if(err) console.log( err )
		  })

			db.collection( 'blog' ).ensureIndex( { title: 1 }, function(err, info) {
		    if(err) console.log( err )
		  })

/*			var t = new BlogPostTemplate();
			t.title = 'Typed Lambda Calc';
			t.tags = ['a','math','qwe'];
			t.desc = 'Consectetur abisicing elit'
			t.body = 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
			t.id = '0xbeefsoup'
		
			db.collection( 'blog' ).insert(t, function(err, count) {
				console.log( err + count )
			})
*/
		}
		else
		{
			console.log( "Cannot connect" + dbAddr );
		}
	});
}

var BlogPostTemplate = function() {
	this.title	= '';
	this.tags		= [];
	this.desc		= '';
	this.body		= '';
	this.id 		= 0;
	
	var now 	= new Date();
	this.date = now.getMonth() + '/' + now.getDate() + '/' + now.getFullYear();
	this.day 	= weekday[ now.getDay() ];
}

var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

exports.SetupBlog = SetupBlog
exports.Address 	= dbAddr
exports.Connect 	= Connect
exports.getPosts	= getPosts