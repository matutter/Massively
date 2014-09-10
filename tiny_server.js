var ip    = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
  , port  = process.env.OPENSHIFT_NODEJS_PORT || '8000'
  , http  = require('http')
  , path  = require('path')
  , mime  = require('mime')
  , url   = require('url')
  , fs    = require('fs')
  , qs    = require('querystring')
  , DB    = require('./DB.init.js')

DB.SetupBlog();

DB.Connect(function(db){


  http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname.replace(/\//,'')

    pathname = pathname == "" ? "index.html" : "./" + pathname;

    if( req.method == 'POST' ) {
      q = qs.parse(pathname);
      if( q['./blog'] !== undefined ) {
        try {
          
          DB.getPosts(db, 0, 10, 50, function(cursor) {

            res.writeHead(200, {'Content-Type': mime.lookup('JSON') });
            res.end(JSON.stringify(cursor));

          });

        } catch(e) {
          console.log("BAD:" + q )
        }

      }


    }
    else 
    {
      fs.readFile( pathname, function(e, data){
        if( e ) return ERR_not_found(pathname, res);


        res.writeHead(200, {
          'Content-Type': mime.lookup(pathname) ,
          'Content-Length': data.length ,
        });
        res.end(data);

      });
    }
  }).listen(port, ip);
})

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

