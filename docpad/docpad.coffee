# DocPad Configuration File
# http://docpad.org/docs/config

# Requires
moment = require('moment')
moment.lang('en')  # set locale

# Define the DocPad Configuration
docpadConfig = {
	templateData:
        site:
            url: "http://balloonsinc.co.uk/"
            title: "Balloons Inc."
            author: "Mark Crawley"
            copyright: "balloonsinc"
            ga: "UA-39475717-1"

        formatDate: (date,format='LLLL') -> return moment(date).format(format)
}

# Export the DocPad Configuration
module.exports = docpadConfig