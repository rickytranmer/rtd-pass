$(function() {
	console.log('loaded');
	$('#logInBtn').css('transition-property', 'none');
	$('#signUpBtn').toggleClass('btn-outline-primary').css('letter-spacing', '4px');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});