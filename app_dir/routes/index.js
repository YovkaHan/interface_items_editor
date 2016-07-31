module.exports = function(app) {
  app.get('/', require('./frontpage').get);
  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);
  app.get('/main', require('./main').get);
  app.post('/main', require('./main').post);
};
