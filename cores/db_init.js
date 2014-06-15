// blog schema mostly from http://www.jarrodoberto.com/_blog-assets/design-pattern-blog-erd/images/erd.png

function blog_category() {
  this.id       = 0;
  this.name     = '';
  this.shortName= '';
  this.hidden  = false;
  this.date     = new Date().toJSON();
};

function blog_post_to_catagory() {
  this.catagory_id = 0;
  this.post_id = 0;
};

function blod_author() {
  this.id = 0;
  this.display_name = '';
  this.fname = '';
  this.lname = '';
};

function blog_post() {
  this.id = 0;
  this.title = '';
  this.image = '';
  this.article = '';
  this.repoURL = '';
  this.author_id = 0;
  this.date = new Date().toJSON();
  this.featured = false;
  this.hidden = false;
  this.hide_comments = false;
  this.views = 0;
};

function blog_tag() {
  this.id = 0;
  this.post_id = 0;
  this.tag = '';
};

function blog_related() {
  this.blog_post_id = 0
  this.blog_related_post_ids = []
}

function blog_comment() {
  this.id = 0;
  this.post_id = 0;
  this.is_reply_to_id = 0;
  this.comment = '';
  this.hidden = false;
  this.date = new Date().toJSON();
};

function user() {
  this.id = 0;
  this.name = ''
  this.title = ''
  this.email = ''
  this.websiteURL = ''
  this.hash = ''
  this.canPost = true
  this.color = {}
}
