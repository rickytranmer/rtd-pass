let infoWindow, pos, map;
let uniqueId = 0;

function initMap() {
	// - Map options
	let options = {
		zoom:19,
		center:{lat:39.7536,lng:-105},
		streetViewControl: false,	// - Disable streetView
		fullscreenControl: false,	// - Disable fullscreen
		mapTypeControl: true,
		mapTypeControlOptions: {	// - Dropdown instead of horizontal bar
		  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	}

	// - Create map
	map = new google.maps.Map(document.getElementById('map'), options);
	console.log(map);
	centerMap();

	// - Listen for click on map
	google.maps.event.addListener(map, 'click', function(event){
		// - Add marker
		addMarker({coords:event.latLng});
	});

	let markersList = [];

	// - Add Marker
	function addMarker(props){
		props.id = uniqueId;
		uniqueId++;

		let marker = new google.maps.Marker({
			position: props.coords,
			id: props.id,
			map: map,
    		draggable: true
		});

		if (infoWindow) {infoWindow.close()}
		infoWindow = new google.maps.InfoWindow({
			content: '<div class="container-fluid"><form action="/take" method="POST"><div class="form-group"><input type="text" class="form-control" name="endTime"></div></form><button id="leaveButton" class="btn btn-lg btn-primary">Submit</button</div>'
		});
		markersList.push(marker);
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
			$('#claimButton').click(function(event) {
				event.preventDefault();
				marker.setMap(null);
				markersList.splice(markersList.indexOf(marker), 1);
				console.log('Deleted #' + marker.id + ', markersList.length = ' + markersList.length);
				console.log(markersList);
			});
		});
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
	console.log('loaded');
});