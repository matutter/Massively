var local = {}
  , url = require('url')
  , path= require('path')

function router( req, res, handle ) {
  var pathname = url.parse(req.url).pathname.replace(/\//,'')
    , ext = path.extname(pathname).replace(/\./,'')
    , page= path.basename(pathname)


    //console.log( '+ ' + page +' '+ ext )

    route(res, handle, pathname, page, ext, null )

}

function route(res, handle, pathname, page, ext, err ) {
  /*route assets for known mimetypes*/
  if( typeof handle.mimeType[ext] === 'string' )
    return handle.std_content(res, handle.pathTo[ ext ], pathname, handle.mimeType[ext], err)
  else
  /*route for regular page*/
  if( typeof handle.pagePathTo[ page ] === 'function' )
    return handle.pagePathTo[ page ]( res, page, err )
  else
    return handle.error(res, pathname, page, ext, err)
}



exports.route   = router
exports.locals  = local