<?php
	if(isset($_REQUEST['ytoken'])) {
		$access_token = $_GET['ytoken'];
		$url = 'https://social.yahooapis.com/v1/user/me/contacts?access_token=' . $access_token . '&format=json&callback=?';
		
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		echo $response;
		
		exit();
	}
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Redirect...</title>
</head>
<body>
	You are authenticated ! Please wait...
	
	<script src="js/jquery.min.js"></script>
	<script src="js/yoauth.js"></script>
</body>
</html>