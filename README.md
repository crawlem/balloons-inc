balloonsinc.co.uk
=================

Website files for balloonsinc.co.uk. 

The site is created using [Jekyll](https://jekyllrb.com), a neat static website creator. This project stores the templates and content which get processed by Jekyll into flat files.

Running locally
---------------

Install Jekyll.

To build the site files run:

	bundle exec jekyll build

Static HTML, CSS etc. is generated and output into a folder called **_site_**.

To test the site locally run:

    bundle exec jekyll serve

Then view the site in your browser at http://localhost:4000/.

Deploying
---------

The site is deployed on AWS in an S3 bucket. buildspec.yml defines the build and deployment steps needed.

Check-ins to GitHub deploy the site automatically.

Setup
-----

The first time you run the project you need to install Ruby and Jekyll. Starting in the root directory of the project run:

	brew install ruby
	gem install --user-install bundler jekyll
	bundle update