let infoWindow, pos, map;
let uniqueId = 0;

function initMap() {
	// - Map options
	let options = {
		zoom:19,
		center:{lat:39.7536,lng:-105},
		clickableIcons: false,
		streetViewControl: false,	// - Disable streetView
		fullscreenControl: false,	// - Disable fullscreen
		mapTypeControl: true,		// - Dropdown instead of horizontal bar
		mapTypeControlOptions: {
		  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	}

	// - Create map
	map = new google.maps.Map(document.getElementById('map'), options);
	console.log(map);
	centerMap();

	// - Listen for click on map
	let mapClick = google.maps.event.addListener(map, 'click', function(event){
		// - Add marker
		addMarker({coords:event.latLng});
	});

	// - Add Marker
	function addMarker(props){
		props.id = uniqueId;
		uniqueId++;

		let marker = new google.maps.Marker({
			position: props.coords,
			id: props.id,
			map: map,
    		draggable: true,
    		icon: {
				url: "images/new-ticket.png",
				scaledSize: new google.maps.Size(100, 100)
			}
		});
		marker.addListener('click', function() {
			if (infoWindow) { infoWindow.close() }
				infoWindow.open(map, marker);
		});

		if (infoWindow) {infoWindow.close()}
		infoWindow = new google.maps.InfoWindow({
			content: '<div class="container-fluid"><form action="/take" method="POST"><div class="form-group"><input type="text" class="form-control" name="endTime"></div></form><button id="leaveButton" class="btn btn-lg btn-primary">Submit</button</div>'
		});
		infoWindow.open(map, marker);

		google.maps.event.removeListener(mapClick);
	}
}

// - Center map if location is available
function centerMap(currentPos) {
	if (currentPos) {
		map.setCenter(currentPos);
	} else {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				map.setCenter(pos);
				setTimeout(function() {centerMap()}, 15000);
			}, function() {
				console.log('location failure');
			});
		} else {	// - Browser doesn't support Geolocation
			console.log('your browser sucks');
		}
	}
}

$(function() {
	console.log('leave loaded');
	$('#leaveBtn').toggleClass('btn-outline-primary');
});