let infoWindow, pos, map;
let uniqueId = 0;
let markerList = [];

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

	//TODO - Placeholder for DB
	let markers = [
		{ coords: {lat:39.7534, lng:-105.001} },
		{ coords: {lat:39.7536, lng:-105}     },
		{ coords: {lat:39.7535, lng:-104.999} }
	];

	// Loop through markers
	for(let i = 0; i < markers.length; i++){
		// Call add marker function
		addMarker(markers[i]);
	}

	// - Add Marker
	function addMarker(props){
		props.id = uniqueId;
		uniqueId++;

		let marker = new google.maps.Marker({
			position: props.coords,
			id: props.id,
			map: map,
    		icon: {
				url: "images/ticket.png",
				scaledSize: new google.maps.Size(100, 100)
			}
		});
		markerList.push(marker);

		if (infoWindow) { infoWindow.close() }
		infoWindow = new google.maps.InfoWindow({content:"<button id='claimButton' class='btn btn-success'>CLAIM</button>"});
		
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
			$('#claimButton').click(function() {
				$('#claimButton').off();
				marker.setMap(null);
				markerList.splice(markerList.indexOf(marker), 1);
				console.log('Deleted #' + marker.id + ', markerList.length = ' + markerList.length);
				console.log(markerList);
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
				console.log('location denied');
			});
		} else {	// - Browser doesn't support Geolocation
			console.log('your browser sucks');
		}
	}
}

$(function() {
	console.log('take loaded');
	$('#takeBtn').toggleClass('btn-outline-primary').css('letter-spacing', '6px').css('font-size', '4rem');
	$('h1').click(function() {
		$(location).attr('href', '/');
	});
});