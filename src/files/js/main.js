$(document).ready(function() {
	// Add burger menu href event handler
	$('.burger').click(function(){
		$('header nav ul > li > ul').toggleClass('toggle');
		return false;
	});

	// Setup carousel rotation
	var i = 0;
	var j = 0;
    var duration = 1000;
    var interval = 6000;

    var images = 'carousel-1 carousel-2 carousel-3 carousel-4 carousel-5';
	var cArr = images.split(' ');
	// Preload the images on the homepage, gives better performance
	// if ($('body.home').length > 0) {
	// 	$(cArr).each(function(){$("<img/>")[0].src="img/carousel/"+this+".jpg"});
	// }

	var testimonials = 'I made an excellent choice in choosing Rich to provide entertainment for our event. It created a lasting impression and is definitely one to repeat.|Rich was brilliant at my daughter\'s birthday party, she loved her amazing Elsa balloon!|Thanks for a super balloon making session yesterday at my son\'s party, he loved his Thomas!|Had the pleasure of working alongside Rich from Balloons Inc. at the weekend - I have to say, he is superb!|Balloons Inc. was amazing!!! Would highly recommend! Fun for all ages including the Grandparents! #nevertooold|A very happy birthday boy with his "birthday man" .massive thank you !';
	var testimonalLinks = '||https://www.facebook.com/photo.php?fbid=10153338046748179&amp;set=o.145159662317828&amp;type=1|https://www.facebook.com/miss.sparklesEX8/posts/1125898514102767|https://www.facebook.com/photo.php?fbid=10153469550205140&set=o.145159662317828&type=1|https://www.facebook.com/photo.php?fbid=10155791617915461&amp;set=o.145159662317828&amp;type=1';
	var tArr = testimonials.split('|');
	var lArr = testimonalLinks.split('|');

	// Start the rotation
    setTimeout(switchImg, interval);   

    function switchImg() {
    	var cNext = i<cArr.length-1?++i:(i=0,i);
	    // $('.home .carousel')
	    // 	.css('background-image', 'url("img/carousel/' + cArr[cNext] + '.jpg")')
	    //     .promise()
	    //     .done(function () {
	            // setTimeout(switchImg, interval);
	    //     })
	    // ;

		// Update the testimonial
	    var tNext = j<tArr.length-1?++j:(j=0,j);
	    var text = '"' + tArr[tNext] + '"';
	    // If the testimonial has a link, append it
	    if (lArr[tNext] != null && lArr[tNext] != '') {
	    	$('.testimonial p').text(text).append(' ').append($('<a/>', { html: 'View', href: lArr[tNext] }))
	    } else {
		    $('.testimonial p').text(text);
		}

		setTimeout(switchImg, interval);
    }

    if ($('.gallery').length > 0) {
    	var galleryId = '72157656406710962';
    	var gallery = $('.gallery');
    	// if (gallery.attr('class').startsWith('gallery-')) {
    		galleryId = gallery.attr('class').split('-')[1];
    		if (galleryId.indexOf(' ')) {
    			galleryId = galleryId.split(' ')[0];
    		}
    		// console.log('Read gallery ID ' + galleryId);
    	// }

    	$.ajax({
    		url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=fe876b65f02d2193dd0dde6833f185b0&extras=url_m&format=json',
    		data: {
    			photoset_id: galleryId
    		},
    		dataType: 'jsonp',
    		jsonp: 'jsoncallback',
    		cache: true
    	}).done(function(data) {
    		var photos = [];
    		// console.log(data);
    		$.each(data.photoset.photo, function(key, val) {
    			// console.log(val.url_m);
    			photos.push('<li class="gallery-cell" style="background-image: url(' + val.url_m + ')"></li>');
    		});
    		$('<ul/>', {html: photos.join(''), 'class': 'main-gallery'}).appendTo('.gallery');
    		$('.main-gallery').flickity({wrapAround: true, pageDots: false});
    	});
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