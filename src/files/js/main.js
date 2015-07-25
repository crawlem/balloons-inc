$(document).ready(function() {
	// TODO Add burger menu href event handler

	// Setup carousel rotation
	var i = 0;
    var duration = 1000;
    var interval = 6000;

    var images = 'carousel-1 carousel-2 carousel-3 carousel-4 carousel-5';
	var arr = images.split(' ');
	// Preload the images for best performance
	$(arr).each(function(){$("<img/>")[0].src="img/carousel/"+this+".jpg"});

	// Start the rotation
    setTimeout(switchImg, interval);   

    function switchImg() {
	    $('.carousel')
	    	// .removeClass(images)
	        // .addClass(arr[i<4?++i:(i=0,i)])
	        .css('background-image', 'url("img/carousel/' + arr[i<4?++i:(i=0,i)] + '.jpg")')
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