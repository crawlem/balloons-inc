$(document).ready(function() {
	$('a[href^="mailto"]').click(function(){_gaq.push(['_trackEvent', 'email', 'send', this.href.replace(/^mailto:/i, ''),,true]);});
});