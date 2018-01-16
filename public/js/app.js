$(function() {
	console.log('loaded');
	$('#signUpBtn').css('transition-property', 'none');
	$('#logInBtn').css('transition-property', 'none');
	$('#takeBtn').css('transition-property', 'none');
	$('#leaveBtn').css('transition-property', 'none');
	$('#map').click(function() {
		$(location).attr('href', '/take');
	});
});