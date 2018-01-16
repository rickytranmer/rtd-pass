let infoWindow, pos, map;
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

	// - Add Marker
	function addMarker(props){
		let marker = new google.maps.Marker({
			position: props.coords,
			id: props._id,
			map: map,
    		icon: {
				url: 'images/ticket.png',
				scaledSize: new google.maps.Size(100, 100)
			}
		});
		if (props.leftBy === $('#userDisplay').text()) {
			marker.setIcon('images/my-ticket.png');
		} else {

		}
		markerList.push(marker);

		infoWindow = new google.maps.InfoWindow({content:"<button id='claimButton' class='btn btn-success'>CLAIM</button>"});
		
		marker.addListener('click', function() {
			infoWindow.open(map, marker);
			$('#claimButton').off();
			$('#claimButton').click(function() {
				marker.setMap(null);
				markerList.splice(markerList.indexOf(marker), 1);
				console.log('Deleted #' + marker.id + ', markerList: ');
				console.log(markerList);
			});
		});
	}

	$.get('/take/all', function(tickets) {
		for(let i = 0; i < tickets.length; i++){
			// Call add marker function
			addMarker(tickets[i]);
		}
	});
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
});


