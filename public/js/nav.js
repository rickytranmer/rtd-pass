$(function() {
	console.log('nav.js');
	$('#logInBtn').removeClass('active');
	$('#signUpBtn').removeClass('active');
	$('#signUpBtn').click(function() {
		$(location).attr('href', '/signup');
	});
	$('#logInBtn').click(function() {
		$(location).attr('href', '/login');
	});
});