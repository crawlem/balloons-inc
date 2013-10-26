$(document).ready(function() {
	var i = 0;
    var duration = 500;
    var interval = 5000;

    var images = ['binc_crab', 'binc_monkey', 'binc_rose', 'binc_horse', 'binc_fish', 'binc_pig', 'binc_frog', 'binc_lion'];
    preloadImg(images);
    setTimeout(switchImg, interval);

    // Contact form validation
    jQuery.validator.messages.required = "";
    jQuery.validator.messages.email = "";
    $(".contact-form form").validate({
		rules :{
		    name: {
		        required: true
		    },
		    email: {
		    	required: true,
		    	email: true
		    },
		    message: {
		    	required: true
		    }
		},
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'You missed 1 field. It has been highlighted below.'
					: 'You missed ' + errors + ' fields.  They have been highlighted below.';
				$("div.error").html(message);
				$("div.error").show();
			} else {
				$("div.error").hide();
			}
		}
    });

    function preloadImg(imgArray) {
    	$(imgArray).each(function(){
	        $('<img/>')[0].src = "images/carousel/" + this + ".jpg"; // Alternatively you could use: (new Image()).src = this;
    	});
    }

    function switchImg() {
	    $(".home .content-img")
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
	        })
	    ;
    }
});