$(document).ready(function() {
	var i = 0;
    var duration = 500;
    var interval = 5000;

    var images = ['binc_monkey', 'binc_rose', 'binc_crab', 'binc_horse', 'binc_fish', 'binc_pig', 'binc_frog', 'binc_lion'];
    switchImg();

    function switchImg() {
	    $(".content-img")
	        .attr("src", "images/carousel/" + (images[i<7?++i:(i=1,i)]) + ".jpg")
	        .css("opacity", 0)
	        .prependTo(".content-img-wrapper")
	        .animate({
	            opacity: 1
	        }, {
	            duration: duration
	        })
	        .next()
	        .animate({
	            opacity: 0
	        }, {
	            duration: duration
	        })
	        .promise()
	        .done(function () {
	            $(this).remove();
	            setTimeout(switchImg, interval);
	        });
    }
});