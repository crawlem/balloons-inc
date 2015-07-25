$(document).ready(function() {
	// Add burger menu href event handler
	$('.burger').click(function(){
		$('header nav ul > li > ul').toggle();
		return false;
	});

	// Setup carousel rotation
	var i = 0;
	var j = 0;
    var duration = 1000;
    var interval = 6000;

    var images = 'carousel-1 carousel-2 carousel-3 carousel-4 carousel-5';
	var cArr = images.split(' ');
	// Preload the images for best performance
	$(cArr).each(function(){$("<img/>")[0].src="img/carousel/"+this+".jpg"});

	var testimonials = 'I made an excellent choice in choosing Rich to provide entertainment for our event. It created a lasting impression and is definitely one to repeat.|Rich was brilliant at my daughter\'s birthday party, she loved it!|Thanks for a super balloon making session yesterday at my son\'s party, he loved his Thomas!|Had the pleasure of working alongside Rich from Balloons Inc. at the weekend - I have to say, he is superb!';
	var tArr = testimonials.split('|');

	// Start the rotation
    setTimeout(switchImg, interval);   

    function switchImg() {
    	var cNext = i<cArr.length-1?++i:(i=0,i);
	    $('.carousel')
	    	.css('background-image', 'url("img/carousel/' + cArr[cNext] + '.jpg")')
	        .css('opacity', 0.5)
	        .animate({
	            opacity: 0.7
	        }, {
	            duration: duration
	        })
	        .animate({
	            opacity: 0.7
	        }, {
	            duration: duration
	        })
	        .promise()
	        .done(function () {
	            setTimeout(switchImg, interval);
	        })
	    ;

	    var tNext = j<tArr.length-1?++j:(j=0,j);
	    $('.testimonial p').text('"' + tArr[tNext] + '"');

	    // console.log('C'+cNext+' T'+tNext);
    }

    // Contact form validation
  //   jQuery.validator.messages.required = "";
  //   jQuery.validator.messages.email = "";
  //   $(".contact-form form").validate({
		// rules :{
		//     name: {
		//         required: true
		//     },
		//     email: {
		//     	required: true,
		//     	email: true
		//     },
		//     message: {
		//     	required: true
		//     }
		// },
		// invalidHandler: function(e, validator) {
		// 	var errors = validator.numberOfInvalids();
		// 	if (errors) {
		// 		var message = errors == 1
		// 			? 'You missed 1 field. It has been highlighted below.'
		// 			: 'You missed ' + errors + ' fields.  They have been highlighted below.';
		// 		$("div.error").html(message);
		// 		$("div.error").show();
		// 	} else {
		// 		$("div.error").hide();
		// 	}
		// }
  //   });
});