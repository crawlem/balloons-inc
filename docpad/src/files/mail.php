<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	
	<title>Balloons Inc. | Thank You</title>
	
	<!--<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">-->
	<meta name="description" content="<%=@document.description%>">
	<meta name="keywords" content="<%=@document.keywords%>">
	<meta name="author" content="<%=@site.author%>">

	<link rel="stylesheet" href="css/main.css">
</head>
<body class="mail">
	<div class="container">
		<header>
			<h1><a href="index.html"><img src="images/binc_logo.png" width="105" height="100" alt="Logo"><%= @site.title %></a></h1>
		</header>
		<section class="content">
			<div class="content-img-wrapper">
				<?php

		if(isset($_POST['email'])) {
			// EDIT THE 2 LINES BELOW AS REQUIRED
			$email_to = "rich@balloonsinc.co.uk";
			$email_subject = "Website contact form";

			$errorImg = "<img src=\"images/binc_error.jpg\" width=\"779\" height=\"348\" class=\"content-img\">";

			function died($error) {
				echo $errorImg;
				echo "<!--$error-->";
				die();
			}

			// validation expected data exists
			if(!isset($_POST['name']) ||
				!isset($_POST['email']) ||
				!isset($_POST['message'])) {
				died('Validation error');
			}

			$name = $_POST['name']; // required
			$email_from = $_POST['email']; // required
			$telephone = $_POST['phone']; // not required
			$comments = $_POST['message']; // required

			$error_message = "";
			$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
			if(!preg_match($email_exp,$email_from)) {
			$error_message .= 'The Email Address you entered does not appear to be valid.<br />';
			}
			$string_exp = "/^[A-Za-z .'-]+$/";
			if(!preg_match($string_exp,$name)) {
			$error_message .= 'The First Name you entered does not appear to be valid.<br />';
			}
			if(strlen($comments) < 2) {
			$error_message .= 'The Comments you entered do not appear to be valid.<br />';
			}
			if(strlen($error_message) > 0) {
			died($error_message);
			}
			$email_message = "Form details below.\n\n";

			function clean_string($string) {
			$bad = array("content-type","bcc:","to:","cc:","href");
			return str_replace($bad,"",$string);
			}

			$email_message .= "Name: ".clean_string($name)."\n";
			$email_message .= "Email: ".clean_string($email_from)."\n";
			$email_message .= "Telephone: ".clean_string($telephone)."\n";
			$email_message .= "Comments: ".clean_string($comments)."\n";


			// create email headers
			$headers = 'From: '.$email_from."\r\n".
			'Reply-To: '.$email_from."\r\n" .
			'X-Mailer: PHP/' . phpversion();
			@mail($email_to, $email_subject, $email_message, $headers);  
		?>
				<img src="images/binc_beintouch.jpg" width="779" height="348" alt="Thank you" class="content-img">
				<?php } ?>
			</div>
			<p><a href="index.html"><img src="images/binc_back.png" width="134" height="36" alt="Back"></a></p>
		</section>
	</div>
	<footer>
		<div class="container">
			<div class="copyright">&copy; balloonsinc <?php echo date("Y"); ?></div>
			<!--<div class="footer-links">
				<ul>
					<li><a href="terms.html">terms &amp; conditions</a></li>
					<li><a href="privacy.html">privacy &amp; cookies</a></li>
				</ul>
			</div>-->
		</div>
	</footer>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
	<!-- //-beg- concat_js -->
	<script src="js/main.js"></script>
	<!-- //-end- concat_js -->
	<script>
		(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
		function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
		e=o.createElement(i);r=o.getElementsByTagName(i)[0];
		e.src='//www.google-analytics.com/analytics.js';
		r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
		ga('create','UA-39475717-1');ga('send','pageview');
	</script>
</body>
</html>