$(document).ready(function() {
	// Add burger menu href event handler
	$('.burger').click(function() {
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

	var tArr = testimonials.replace(/^\|/, '').split('|');
	var lArr = testimonalLinks.replace(/^\|/, '').split('|');

	// Start the rotation
    setTimeout(switchImg, interval);   

    function switchImg() {
    	// var cNext = i<cArr.length-1?++i:(i=0,i);
	    // $('.home .carousel')
	    // 	.css('background-image', 'url("img/carousel/' + cArr[cNext] + '.jpg")')
	    //     .promise()
	    //     .done(function () {
	            // setTimeout(switchImg, interval);
	    //     })
	    // ;

		// Update the testimonial
	    var tNext = j<tArr.length-1?++j:(j=0,j);

        var tempElem = document.createElement('textarea');
        tempElem.innerHTML = tArr[tNext];
        var text = '"' + tempElem.value + '"';
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
    $("form.contact-form").submit(function() {
    	var hasErrors = false;

    	if ($('#fld-name').val() == '') {
    		hasErrors = true;
    		$('#fld-name').addClass('invalid');
    	} else {
    		$('#fld-name').removeClass('invalid');
    	}

    	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    	if ($('#fld-email').val() == '' || !filter.test($('#fld-email').val())) {
    		hasErrors = true;
    		$('#fld-email').addClass('invalid');
    	} else {
    		$('#fld-email').removeClass('invalid');
    	}

    	if (hasErrors) {
    		$('.message').text('One or more required fields have not been filled in correctly and are highlighted below.').show();
    		return false;
    	} else {
    		$('.message').hide();
    	}
    });
});