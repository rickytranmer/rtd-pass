$(function() {
	console.log('loaded');
	$('#signUpBtn').toggleClass('btn-outline-primary').css('letter-spacing', '4px');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});