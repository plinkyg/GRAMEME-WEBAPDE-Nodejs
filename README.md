# GRAMEME-WEBAPDE 
## Link: grameme.tk

# WEBAPDE-MP3 Site Map
- This is a meme site entitled GraMeme. This is a Webapp for viewing and uploading memes. 
- MVC is already applied as an architectural pattern

1. index.handlebars - this is the landing page of all users and non-users of the website.

2. register.handlebars - this is the registration page of the webapp

3. posts/index.handlebars - profile page

4. posts/upload - the page to upload your memes

5. posts/edit - the page to edit your memes

## TODO
- [ ] Share a meme
- [ ] Limit content to 15 per query
- [ ] AJAX
- [x] MVC

## Dependencies
- bcryptjs
- body-parser
- connect-flash
- cookie-parser
- crypto
- express
- express-session
- express-handlebars
- gridfs-stream
- method-override
- mongoose
- multer
- multer-gridfs-storage
- passport
- passport-local
- sqreen
- nodemon (optional: for development purposes. use -global/-dev)

## Features
- Local database (NoSql)
- Login
- Register
- Proper auth.
- Cookie
- Upload memes
- Accounted for injection attacks with sqreen incl server side scripting check
- View memes
- Edit memes
- Delete memes
- Add tags
- Edit tags
- Search by tags (Clickable tags)
- View other user's profile
- Search memes (Buggy when using the search function inside a user's profile)
- mLab cloud db used for heroku deployment
- heroku deployment https://grameme.herokuapp.com


