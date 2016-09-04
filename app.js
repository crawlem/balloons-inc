var	express 		= require('express'),
 	contentful 		= require('contentful'),
 	hbs 			= require('express-handlebars'),
 	handlebars 		= require('handlebars'),
 	marked 			= require('marked'),
	sassMiddleware	= require('node-sass-middleware'),
	path 			= require('path');

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

// Setup Contentful
var client = contentful.createClient({
	space: 'gnnn40ybavjk',
	accessToken: '2d9e7ca654b74b162955d05cb18dfef79cb0e13a2608cc50173abe2ff6301305'
});
// Retrieve CMS content
var home, pages, sitemap, contact, mainMenu, footerMenu, testimonials;
loadContent();

function loadContent() {
	console.log('Reloading CMS content');

	client.getEntries({'content_type': 'home'}).then(function(entries) {
		entries.items.forEach(function(entry) {
			home = entry;
		});
	});
	client.getEntries({'content_type': 'sitemap'}).then(function(entries) {
		entries.items.forEach(function(entry) {
			sitemap = entry;
		});
	});
	client.getEntries({'content_type': 'contact'}).then(function(entries) {
		entries.items.forEach(function(entry) {
			contact = entry;
		});
	});
	client.getEntries({'content_type': 'page'}).then(function(entries) {
		pages = entries;
		pages.items.forEach(function(entry) {
			app.get('/' + entry.fields.alias + '.html', function (req, res) {
				loadContent();
				res.render('text', { page: entry, mainMenu: mainMenu, footerMenu: footerMenu});
			});
		});
	});
	client.getEntries({'content_type': 'menu', 'fields.alias': 'main-menu'}).then(function(entries) {
		mainMenu = entries;
	});
	client.getEntries({'content_type': 'menu', 'fields.alias': 'footer-menu'}).then(function(entries) {
		footerMenu = entries;
	});
	client.getEntries({'content_type': 'testimonial'}).then(function(entries) {
		testimonials = entries;
		app.get('/js/testimonials.js', function (req, res) {
			var output = 'var testimonials = ';
			testimonials.items.forEach(function(entry) {
				output += "'" + entry.fields.quote.replace("'", "\\'") + "'";
			});
			output = output.replace("''", "' + '|");
			output += ';\n'

			output += 'var testimonalLinks = ';
			testimonials.items.forEach(function(entry) {
				output += "'" + entry.fields.link + "'";
			});
			output = output.replace("''", "' + '|");
			output += ';'

			res.set('Content-Type', 'application/javascript');
			res.send(output);
		});
	});
}


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

// Serve pages
app.get('/', function (req, res) {
	loadContent();
	res.render('index', { page: home, mainMenu: mainMenu, footerMenu: footerMenu});
});
app.get('/index.html', function (req, res) {
	loadContent();
	res.render('index', { page: home, mainMenu: mainMenu, footerMenu: footerMenu});
});
app.get('/sitemap.html', function (req, res) {
	loadContent();
	res.render('sitemap', { page: sitemap, mainMenu: mainMenu, footerMenu: footerMenu});
});
app.get('/contact.html', function (req, res) {
	loadContent();
	res.render('contact', { page: contact, mainMenu: mainMenu, footerMenu: footerMenu});
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