var http  = require('http')
  , path  = require('path')
  , mime  = require('mime')
  , url   = require('url')
  , fs    = require("fs")
  , qs    = require('querystring')
  , ip    = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
  , port  = process.env.OPENSHIFT_NODEJS_PORT || '8000'
  , dbAddr= 'mongodb://' + openShiftDB()
  , mongodb= require('mongodb')


mongodb.connect(dbAddr, function(err, db){
  startup(db);
})

function startup() {
  http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname.replace(/\//,'')

    pathname = pathname == "" ? "index.html" : "./" + pathname;

    //console.log( pathname );

    if( req.method == 'POST' ) {
      q = qs.parse(pathname);
      if( q['./blog'] !== undefined ) {
        try {
          
          res.writeHead(200, {'Content-Type': mime.lookup('JSON') });

          res.end(JSON.stringify(post_test));

        } catch(e) {
          console.log("BAD:" + q )
        }

      }


    }
    else 
    {
      fs.readFile( pathname, function(e, data){
        if( e ) return ERR_not_found(pathname, res);

        res.writeHead(200, {'Content-Type': mime.lookup(pathname) });
        res.end(data);

      });
    }
  }).listen(port, ip);
}
/*Handle error*/
function ERR_not_found(pathname, res) {
  console.log("not found" + pathname)
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not Found.\n');
}

/*Get environment from OPENSHIFT*/
function openShiftDB() {
  return process.env.OPENSHIFT_MONGODB_DB_PASSWORD ? process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME : '127.0.0.1:27017/massively' 
}

/*Hello world*/
console.log('Server running at http://'+ip+':'+port+'/');


var post_test = [
{
  "title":"Typed Lambda Calc", "tags":["a","s","d","f"], "date":"8/21/2014", "day":"thursday",
  "desc" : "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  , "id":"px0asd"
},
{
  "title":"Did he who make the lamb make thee?", "tags":["a","s","d","f"], "date":"8/21/2014", "day":"thursday",
  "desc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  , "id":"akttpx0asd"
},
{
  "title":"LollyGags an intro to gags for lollies", "tags":["a","s","d","f"], "date":"8/21/2014", "day":"thursday",
  "desc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  , "id":"p888px0asd"
},
{
  "title":"I am grute", "tags":["a","s","d","f"], "date":"8/21/2014", "day":"thursday",
  "desc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  , "id":"NA1Lpx0asd"
},
{
  "title":"It may have been spelled Groot", "tags":["a","s","d","f"], "date":"8/21/2014", "day":"thursday",
  "desc" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  , "id":"PROTOpx0asd"
}
]