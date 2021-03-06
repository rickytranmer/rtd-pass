$(function() {
	console.log('login.js');
	// - Prevent Sign Up button from animating
	$('#signUpBtn').css('transition-property', 'none');
	// - Grow Log In button text
	$('#logInBtn').toggleClass('btn-outline-primary').css('letter-spacing', '4px');
	// - Rounded edges for form background aka the map div
	$('#map').css('border-radius', '40px').css('min-height', '90vh');
});