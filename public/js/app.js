$(()=> {
	console.log('app.js');
	// - Prevent button text from using transition animation on load
	$('#signUpBtn').css('transition-property', 'none');
	$('#logInBtn').css('transition-property', 'none');
	$('#takeBtn').css('transition-property', 'none');
	$('#leaveBtn').css('transition-property', 'none');
	// - Clicking on center of screen will bring you to Take Ticket screen
	// - If user not logged in, redirected to Log In screen
	$('#map').click(()=> {
		$(location).attr('href', '/take');
	});

	$('.opaque').css('opacity', '1');
});