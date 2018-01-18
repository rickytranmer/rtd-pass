$(function() {
	console.log('nav.js');

	$('#signUpBtn').click(function() {
		$(location).attr('href', '/signup');
	});
	$('#logInBtn').click(function() {
		$(location).attr('href', '/login');
	});
	$('#logOutBtn').click(function() {
		$(location).attr('href', '/logout');
	});
	$('#takeBtn').click(function() {
		$(location).attr('href', '/take');
	});
	$('#leaveBtn').click(function() {
		$(location).attr('href', '/leave');
	});
	$('.navbar-text').click(function() {
		$(location).attr('href', '/');
	});

});

function convertTime(millis) {
        let hours = Math.floor(millis / (1000 * 60 * 60) % 60);
        let minutes = Math.floor(millis / (1000 * 60) % 60);
        let seconds = Math.floor(millis / 1000 % 60);
        if (hours < 10) { hours = '0' + hours }
    	if (minutes < 10) { minutes = '0' + minutes }
    	if (seconds < 10) { seconds = '0' + seconds }
        return (hours + 'h'+ " " + minutes + 'm' + " " + seconds + 's');
}