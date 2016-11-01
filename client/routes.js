
Router.configure({
  // the default layout
  layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('login');
});
Router.route('/login', function () {
  this.render('menu_original', {to: 'menu'
    
  });
    this.render('login');
});
Router.route('/home', function () {
  this.render('menu_authenticated', {to: 'menu'
    
  });
    this.render('home');
});
Router.route('/team', function () {
  this.render('menu_authenticated', {to: 'menu'
    
  });
    this.render('team');
});
Router.route('/tasks', function () {
  this.render('menu_authenticated', {to: 'menu'
    
  });
    this.render('newTask');
});
Router.route('/projects', function () {
  this.render('menu_authenticated', {to: 'menu'
    
  });
    this.render('projectlist');
});

Router.route('/util', function () {
  this.render('menu_authenticated', {to: 'menu'
    
  });
    this.render('csvToJson');
});