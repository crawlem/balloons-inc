var	express 		= require('express'),
 	contentful 		= require('contentful'),
 	hbs 			= require('express-handlebars'),
 	handlebars 		= require('handlebars'),
 	marked 			= require('marked'),
	sassMiddleware	= require('node-sass-middleware'),
	path 			= require('path'),
	SaveStatic 		= require('save-static');
 
// initialize with the root path for saving to disk 
var staticPath = __dirname + '/out'; // <= for example 
var saveStatic = new SaveStatic(staticPath);

handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

handlebars.registerHelper('md', function(markdown, options) {
    if (arguments.length < 2)
        throw new Error("Handlebars Helper equal needs 1 parameter");
    if (markdown) {
    	return marked(markdown);
    } else {
    	return '';
    }
});

// Create Express app
var app = express();

// Setup Handlebars template
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Setup SASS pre-processing
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public', 'css'),
    prefix: '/css'
}));

// Setup static file routing
app.use(express.static(path.join(__dirname, 'public')));

// Contentful API client
var client = contentful.createClient({
	space: 'gnnn40ybavjk',
	accessToken: '2d9e7ca654b74b162955d05cb18dfef79cb0e13a2608cc50173abe2ff6301305'
});

// Serve pages
app.get(['/', '/index.html'], function(req, res) {
	console.log('Loading ' + req.originalUrl);
	client.getEntries({'content_type': 'home'}).then(function(entries) {
		var entry = entries.items[0];
		client.getEntries({'content_type': 'menu', 'fields.alias': 'main-menu'}).then(function(entries) {
			var mainMenu = entries;
			client.getEntries({'content_type': 'menu', 'fields.alias': 'footer-menu'}).then(function(entries) {
				var footerMenu = entries;
				res.render('index', { page: entry, mainMenu: mainMenu, footerMenu: footerMenu}, saveStatic(res));
			});
		});
		
	});
});

app.get('/sitemap.html', function(req, res) {
	console.log('Loading ' + req.originalUrl);
	client.getEntries({'content_type': 'sitemap'}).then(function(entries) {
		var entry = entries.items[0];
		client.getEntries({'content_type': 'menu', 'fields.alias': 'main-menu'}).then(function(entries) {
			var mainMenu = entries;
			client.getEntries({'content_type': 'menu', 'fields.alias': 'footer-menu'}).then(function(entries) {
				var footerMenu = entries;
				res.render('sitemap', { page: entry, mainMenu: mainMenu, footerMenu: footerMenu}, saveStatic(res));
			});
		});
		
	});
});

app.get('/contact.html', function(req, res) {
	console.log('Loading ' + req.originalUrl);
	client.getEntries({'content_type': 'contact'}).then(function(entries) {
		var entry = entries.items[0];
		client.getEntries({'content_type': 'menu', 'fields.alias': 'main-menu'}).then(function(entries) {
			var mainMenu = entries;
			client.getEntries({'content_type': 'menu', 'fields.alias': 'footer-menu'}).then(function(entries) {
				var footerMenu = entries;
				res.render('contact', { page: entry, mainMenu: mainMenu, footerMenu: footerMenu}, saveStatic(res));
			});
		});
		
	});
});

app.get('/js/testimonials.js', function(req, res) {
	console.log('Loading ' + req.originalUrl);
	client.getEntries({'content_type': 'testimonial'}).then(function(entries) {
		res.set('Content-Type', 'application/javascript');
		res.render('testimonials', { layout: 'js', testimonials: entries }, saveStatic(res));
	});
});

// The rest of the "normal" pages
client.getEntries({'content_type': 'page'}).then(function(pages) {
	pages.items.forEach(function(entry) {
		console.log('Setting up GET address for ' + entry.fields.alias);
		app.get('/' + entry.fields.alias + '.html', function(req, res) {
			console.log('Loading ' + req.originalUrl);
			client.getEntries({'content_type': 'page', 'fields.alias': entry.fields.alias}).then(function(page) {
				client.getEntries({'content_type': 'menu', 'fields.alias': 'main-menu'}).then(function(mainMenus) {
					var mainMenu = mainMenus;
					client.getEntries({'content_type': 'menu', 'fields.alias': 'footer-menu'}).then(function(footerMenus) {
						var footerMenu = footerMenus;
						res.render('text', { page: page.items[0], mainMenu: mainMenu, footerMenu: footerMenu}, saveStatic(res));
					});
				});
			});
		});
	});
});

// Bind HTTP server to port
var port = process.env.VCAP_APP_PORT || 3000;
console.log('Attempting to bind to port ' + port);
process.on('uncaughtException', function (err) {
    console.log(err);
});
app.listen(port, function () {
	console.log('App listening on port ' + port);
});