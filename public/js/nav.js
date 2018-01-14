$(function() {
	console.log('nav.js');

	$('#signUpBtn').click(function() {
		$(location).attr('href', '/signup');
	});
	$('#logInBtn').click(function() {
		$(location).attr('href', '/login');
	});
	$('#takeBtn').click(function() {
		$(location).attr('href', '/take');
	});
	$('#leaveBtn').click(function() {
		$(location).attr('href', '/leave');
	});
});