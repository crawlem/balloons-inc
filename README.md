balloonsinc.co.uk
=================

Website files for balloonsinc.co.uk. 

The site is created using [Docpad](https://docpad.org/) to perform pre-processing and content management. This project stores the NodeJs application.

The hosted site at balloonsinc.co.uk is mainly a static web server, as Docpad outputs static files.

To build the site files run:

	docpad generate --env static

Static HTML, CSS etc. is generated and output into a folder called **out**. This content is not quite ready to publish as it is not optimised. Then run:

	ant -f out/build/build.xml

That will output a folder called *publish* which contains optimised website content files to publish to the live website.