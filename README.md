# balloonsinc.co.uk

Website files for balloonsinc.co.uk. 

The site stores content in the [Contentful](https://contentful.com) Content Management System (CMS). Content is loaded at startup, then served over HTTP using NodeJS via an [Express](https://expressjs.com) server.

Images, CSS and JavaScript are stored in this project, along with functions to convert CMS content from [Markdown](https://en.wikipedia.org/wiki/Markdown) to HTML. A PHP file is present to handle contact form submissions.

The site could be run live in Production, using suitable hosting for the NodeJS application. However given the mainly static nature of the site it is recommended that the site be flattened to static files and deployed to a static web server. This also allows optimisation of the output, for example minification of CSS files.