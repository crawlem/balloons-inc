# DocPad Configuration File
# http://docpad.org/docs/config

# Requires
moment = require('moment')
moment.lang('en')  # set locale

# Define the DocPad Configuration
docpadConfig = {
	#port: 80
	
	templateData:
        site:
            url: "http://balloonsinc.co.uk"
            title: "Balloons Inc."
            author: "Mark Crawley"
            copyright: "balloonsinc"
            ga: "UA-39475717-1"

        formatDate: (date,format='LLLL') -> return moment(date).format(format)

    collections:
        pages: ->
            @getCollection("html").findAllLive({isPage: true})

    plugins:
        sitemap:
            collectionName: 'pages'
}

# Export the DocPad Configuration
module.exports = docpadConfig