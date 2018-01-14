$(function() {
	console.log('loaded');
	$('#logInBtn').toggleClass('btn-outline-primary');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});