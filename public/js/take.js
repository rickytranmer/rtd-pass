let infoWindow, editWindow, pos, map;
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
			expireTime: props.expireTime,
			leftBy: props.leftBy,
    		icon: {
				url: 'images/ticket.png',
				scaledSize: new google.maps.Size(100, 100)
			}
		});
		if (marker.leftBy === $('#userDisplay').text()) { marker.setIcon('images/my-ticket.png') }
		markerList.push(marker);

		marker.addListener('click', function() {
			if (infoWindow) { infoWindow.close() }
			if (editWindow) { editWindow.close() }

			if (this.leftBy === $('#userDisplay').text()) {
				editWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 class='col-12 ticket-info'>" + marker.expireTime + "</h3><button id='editButton' data-id='" + this.id + "' class='btn btn-success col-12'>EDIT</button></div>"});
				// - Click listener for editButton
				$('#editButton').off();
				setTimeout(function() {
					$('#editButton').click(function() {
						console.log('edit clicked');
						//TODO - put route
					});
				}, 250);
				editWindow.open(map, marker);
			} else {
				infoWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 class='col-12 ticket-info'>" + marker.expireTime + "</h3><button id='claimButton' data-id='" + this.id + "' class='btn btn-primary'>CLAIM</button>"});
				// - Click listener for claimButton
				$('#claimButton').off();
				setTimeout(function() {
					$('#claimButton').click(function() {
						marker.setMap(null);
						markerList.splice(markerList.indexOf(marker), 1);
						console.log('Deleted #' + marker.id + ', markerList: ');
						console.log(markerList);
						console.log(marker);
						pos = {
							lat: marker.position.lat(),
							lng: marker.position.lng()
						};
						$.ajax({
							method: 'DELETE',
							url: '/take/' + marker.id,
							success: deleteTicketSuccess,
							error: deleteTicketError
						});
					});
				}, 250);
				infoWindow.open(map, marker);
			}
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

function deleteTicketSuccess(json) {
	// - Delete all markers
	for (let i = markerList.length - 1; i >= 0; i--) {
		markerList[i].setMap(null);
	}
	// - New ticket icon at taken ticket's position
	let marker = new google.maps.Marker({
		position: pos,
		map: map,
		icon: {
			url: 'images/my-ticket.png',
			scaledSize: new google.maps.Size(100, 100)
		}
	});
	if (infoWindow) { infoWindow.close() }
	if (editWindow) { editWindow.close() }
	infoWindow = new google.maps.InfoWindow({content:"<button class='btn btn-success'>Success!</button>"});
	infoWindow.open(map, marker);
}

function deleteTicketError(json) {
	console.log('ajax error');
	if (json) { console.log(json) }
}

$(function() {
	console.log('take loaded');
	$('#takeBtn').toggleClass('btn-outline-primary').css('letter-spacing', '6px').css('font-size', '4rem');
});


