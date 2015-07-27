# DocPad Configuration File
# http://docpad.org/docs/config

# Requires
moment = require('moment')
moment.lang('en')  # set locale

# Define the DocPad Configuration
docpadConfig = {
    hostname: process.env.OPENSHIFT_NODEJS_IP
    port: process.env.OPENSHIFT_NODEJS_PORT || 9778

    templateData:
        site:
            url: "http://balloonsinc.co.uk"
            title: "Balloons Inc."
            author: "Mark Crawley"
            copyright: "balloonsinc"
            ga: "UA-39475717-1"

        formatDate: (date,format='LLLL') -> return moment(date).format(format)

        getUrl: (url) ->
            return url.replace /^\//g, ""

    collections:
        pages: ->
            @getCollection("html").findAll({ignored: false, isPage: true}, [{pageOrder: 1}])
        mainMenu: ->
            @getCollection("html").findAll({ignored: false, isMainMenu: true}, [{pageOrder: 1}])
        footerMenu: ->
            @getCollection("html").findAll({ignored: false, isFooterMenu: true}, [{pageOrder: 1}])

    plugins:
        sitemap:
            collectionName: 'pages'
}

# Export the DocPad Configuration
module.exports = docpadConfig