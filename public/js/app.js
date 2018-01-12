var uniqueId = 0;
var infoWindow, pos, map;

function initMap(){
	// Map options
	var options = {
		zoom:19,
		center:{lat:39.7536,lng:-105},
		streetViewControl: false,
		fullscreenControl: false,
		mapTypeControl: true,
		mapTypeControlOptions: {
		  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	}

	// New map
	map = new google.maps.Map(document.getElementById('map'), options);
	console.log(map);
	centerMap();

	// Listen for click on map
	google.maps.event.addListener(map, 'click', function(event){
		// Add marker
		addMarker({coords:event.latLng});
	});

	//TODO - Placeholder for DB
	var markers = [
		{ coords:{lat:39.7534, lng:-105.001} },
		{ coords:{lat:39.7536, lng:-105}     },
		{ coords:{lat:39.7535, lng:-104.999} }
	];

	var markersList = [];

	// Loop through markers
	for(var i = 0; i < markers.length; i++){
		// Add marker
		addMarker(markers[i]);
	}

	// Add Marker Function
	function addMarker(props){
		props.id = uniqueId;
		uniqueId++;

		var marker = new google.maps.Marker({
			position:props.coords,
			id:props.id,
			map:map
		});

		if (infoWindow) {infoWindow.close()}
		infoWindow = new google.maps.InfoWindow({content:"<button id='claimButton' class='btn btn-primary'>CLAIM</button>"});
		markersList.push(marker);
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
			$('#claimButton').click(function() {
				marker.setMap(null);
				markersList.splice(markersList.indexOf(marker), 1);
				console.log('Deleted #'+marker.id+', markersList.length = '+markersList.length);
				console.log(markersList);
			});
		});
	}
}

function centerMap() {
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
	} else {	// Browser doesn't support Geolocation
		console.log('your browser sucks');
	}
}

$(function() {
	console.log('loaded');
});