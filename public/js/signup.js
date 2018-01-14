$(function() {
	console.log('loaded');
	$('#signUpBtn').toggleClass('btn-outline-primary');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});