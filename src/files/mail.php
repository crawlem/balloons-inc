<?php
if(isset($_POST['email'])) {
	// EDIT THE 2 LINES BELOW AS REQUIRED
	$email_to = "rich@balloonsinc.co.uk";
	$email_subject = "Website contact form";

	function died($error) {
		// Redirect to contact.html, pass error into querystring
		header('Location: contact.html?error='.urlencode($error));
	}

	// Validation expected data exists
	if(!isset($_POST['name']) ||
		!isset($_POST['email']) ||
		!isset($_POST['message'])) {
		died('Missing required fields');
	}

	$name = $_POST['name']; // required
	$email_from = $_POST['email']; // required
	$telephone = $_POST['phone']; // not required
	$date = $_POST['date']; // not required
	$time = $_POST['time']; // not required
	$venue = $_POST['venue']; // not required
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
	$email_message .= "Date: ".clean_string($date)."\n";
	$email_message .= "Time: ".clean_string($time)."\n";
	$email_message .= "Venue: ".clean_string($venue)."\n";
	$email_message .= "Comments: ".clean_string($comments)."\n";

	// Create email headers
	// $headers = 'From: '.$email_from."\r\n".
	// 'Reply-To: '.$email_from."\r\n" .
	// 'X-Mailer: PHP/' . phpversion();
	@mail($email_to, $email_subject, $email_message);//, $headers);

	// Redirect to thank you page
	header('Location: thanks.html');
} else {
	header('Location: contact.html');
}
?>