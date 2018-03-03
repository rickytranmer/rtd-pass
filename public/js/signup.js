$(function() {
	console.log('loaded');
	// - Prevent Log In button from animating
	$('#logInBtn').css('transition-property', 'none');
	// - Grow Sign Up button text
	$('#signUpBtn').toggleClass('btn-outline-primary').css('letter-spacing', '4px');
	// - Rounded edges for form background aka the map div
	$('#map').css('border-radius', '40px').css('min-height', '90vh');
});