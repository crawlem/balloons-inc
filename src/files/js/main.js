// var $window = $(window);
// var nav = $('body');
// $window.scroll(function(){
// 	if ($window.scrollTop() >= 50) {
//        nav.addClass('scrolled');
//     }
//     else {
//        nav.removeClass('scrolled');
//     }
// });

$(document).ready(function() {
	var i = 0;
    var duration = 500;
    var interval = 5000;

    var images = ['carousel-crab', 'carousel-monkey', 'carousel-rose', 'carousel-horse', 'carousel-pig', 'carousel-frog', 'carousel-lion'];
    setTimeout(switchImg, interval);   

    function switchImg() {
	    $('header .carousel')
	    	.removeClass('carousel-crab carousel-monkey carousel-rose carousel-lion carousel-horse carousel-pig carousel-frog carousel-lion')
	        .addClass(images[i<7?++i:(i=1,i)])
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