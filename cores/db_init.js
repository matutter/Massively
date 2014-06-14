// blog schema from http://www.jarrodoberto.com/_blog-assets/design-pattern-blog-erd/images/erd.png



function blog_category() {
  this.id       = 0
  this.name     = ''
  this.shortName= ''
  this.enabled  = false
  this.date     = new Date().toJSON()
}



var test = new blog_category

console.log( test )