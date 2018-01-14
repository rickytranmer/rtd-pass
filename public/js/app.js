$(function() {
	console.log('loaded');
	$('#map').click(function() {
		$(location).attr('href', '/take');
	});
});