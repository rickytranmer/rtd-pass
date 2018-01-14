$(function() {
	console.log('loaded');
	$('#map').height('78vh');
	$('#map').click(function() {
		$(location).attr('href', '/take');
	});
});