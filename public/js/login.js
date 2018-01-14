$(function() {
	console.log('loaded');
	$('#logInBtn').toggleClass('btn-outline-primary').css('letter-spacing', '4px');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});