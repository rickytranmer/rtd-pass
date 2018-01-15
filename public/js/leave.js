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
    		icon: {
				url: "images/new-ticket.png",
				scaledSize: new google.maps.Size(100, 100)
			}
		});
		marker.addListener('click', function() {
			if (infoWindow) { infoWindow.close() }
			infoWindow.open(map, marker);
			cancelTicket(marker);
		});

		// - Form in popup window to take ticket time
		if (infoWindow) {infoWindow.close()}
		infoWindow = new google.maps.InfoWindow({
			content: '<div class="container-fluid"><form action="/take" method="POST"><div class="form-group"><input type="text" class="form-control" name="endTime"></div><button id="leaveButton" class="btn btn-lg col-10 btn-primary">Submit</button></form><button id="cancelButton" class="btn btn-lg col-8 btn-danger">Remove</button></div>'
		});
		infoWindow.open(map, marker);
	
		// - Only allow one new ticket on map
		google.maps.event.removeListener(mapClick);
		let newClick = google.maps.event.addListener(map, 'click', function(event){
			marker.setMap(null);
			addMarker({coords:event.latLng});
		});

		// - Delayed click listener for removing ticket
		cancelTicket(marker);
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
				console.log('location denied');
			});
		} else {	// - Browser doesn't support Geolocation
			console.log('your browser sucks');
		}
	}
}

function cancelTicket(marker) {
	setTimeout(function() {
		$('#cancelButton').click(function() {
			if (infoWindow) { infoWindow.close() }
			clearMarkers();
		});
	}, 500);	
}

$(function() {
	console.log('leave loaded');
	$('#leaveBtn').toggleClass('btn-outline-primary').css('letter-spacing', '6px').css('font-size', '4rem');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});