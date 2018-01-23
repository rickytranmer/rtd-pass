function initVars() {
	let infoWindow, editWindow, map, pos;
	mapVars = { infoWindow, map, pos, markerList: [] };
	initMap();
}
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
	mapVars.map = new google.maps.Map(document.getElementById('map'), options);
	centerMap();

	// - Add Marker
	function addMarker(props){
		let marker = new google.maps.Marker({
			position: props.coords,
			id: props._id,
			map: mapVars.map,
			expireTime: props.expireTime,
			leftBy: props.leftBy,
    		icon: {
				url: 'images/ticket.png',
				scaledSize: new google.maps.Size(100, 100)
			}
		});
		if (marker.leftBy === $('#userDisplay').text()) { marker.setIcon('images/my-ticket.png') }
		mapVars.markerList.push(marker);

		marker.addListener('click', function() {
			if (mapVars.infoWindow) { mapVars.infoWindow.close() }
			if (mapVars.editWindow) { mapVars.editWindow.close() }
			mapVars.pos = {
				lat: marker.position.lat(),
				lng: marker.position.lng()
			};
			centerMap(mapVars.pos);

			if (this.leftBy === $('#userDisplay').text()) {
				if (marker.expireTime.length < 7) {
					mapVars.editWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 id=claimInfo class='col-12 ticket-info make-longer'>" + marker.expireTime + "</h3><button id='editButton' data-id='" + this.id + "' class='btn btn-success col-12'>EDIT</button></div>"});
				} else {
					mapVars.editWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 id=claimInfo class='col-12 ticket-info'>" + marker.expireTime + "</h3><button id='editButton' data-id='" + this.id + "' class='btn btn-success col-12'>EDIT</button></div>"});

				}
				// - Click listener for editButton
				$('#editButton').off();
				setTimeout(function() {
					$('#editButton').click(function() {
						console.log($('#editButton').text())
						if ($('#editButton').text() === 'EDIT') {
							console.log('edit clicked');
							$('#claimInfo').html("<textarea id='claimInfo' class='col-12 ticket-info' autofocus>"+marker.expireTime+"</textarea>");
							$('#editButton').text('SAVE');
						} else {
							console.log(marker);
							let updateMarker = [
								{
									name: "_id",
									value: marker.id
								},
								{
									name: "leftBy",
									value: marker.leftBy
								},
								{
									name: "expireTime",
									value: $('textarea').val()
								}
							];
							console.log(updateMarker);
							$.ajax({
								method: 'PUT',
								url: '/take/' + marker.id + '/edit',
								data: updateMarker,
								success: updateTicketSuccess,
								error: updateTicketError
							});
						}
					});
				}, 250);
				mapVars.editWindow.open(mapVars.map, marker);
			} else {
				mapVars.infoWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 class='col-12 ticket-info'>" + marker.expireTime + "</h3><button id='claimButton' data-id='" + this.id + "' class='btn btn-primary'>CLAIM</button>"});
				// - Click listener for claimButton
				$('#claimButton').off();
				setTimeout(function() {
					$('#claimButton').click(function() {
						marker.setMap(null);
						mapVars.markerList.splice(mapVars.markerList.indexOf(marker), 1);
						console.log('Deleted #' + marker.id + ', markerList: ');
						console.log(mapVars.markerList);
						console.log(marker);
						$.ajax({
							method: 'DELETE',
							url: '/take/' + marker.id,
							success: deleteTicketSuccess,
							error: deleteTicketError
						});
					});
				}, 250);
				mapVars.infoWindow.open(mapVars.map, marker);
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
		mapVars.map.setCenter(currentPos);
	} else {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				mapVars.pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				mapVars.map.setCenter(mapVars.pos);
				setTimeout(function() {centerMap()}, 30000);
			}, function() {
				console.log('location denied');
			});
		} else {	// - Browser doesn't support Geolocation
			console.log('use a better browser');
		}
	}
}

function deleteTicketSuccess(json) {
	// - Delete all markers
	for (let i = mapVars.markerList.length - 1; i >= 0; i--) {
		mapVars.markerList[i].setMap(null);
	}
	// - New ticket icon at taken ticket's position
	let marker = new google.maps.Marker({
		position: mapVars.pos,
		map: mapVars.map,
		icon: {
			url: 'images/my-ticket.png',
			scaledSize: new google.maps.Size(100, 100)
		}
	});
	
	// - Flash SUCCESS
	$('#takeBtn').text('SUCCESS').css('color', '#2ECC40').css('letter-spacing', '3px').css('font-size', '2rem');
	setTimeout(function() {
		$('#takeBtn').css('letter-spacing', '6px').css('font-size', '4rem');
		setTimeout(function() {
			$('#takeBtn').text('TAKE').css('color', '#007BFF');
		},750);
	},500);
}

function deleteTicketError(json) {
	console.log('ajax error');
	if (json) { console.log(json) }
}

function updateTicketSuccess(json) {
	// - Delete all markers
	for (let i = mapVars.markerList.length - 1; i >= 0; i--) {
		mapVars.markerList[i].setMap(null);
	}
	// - New ticket icon at update ticket's position
	let marker = new google.maps.Marker({
		position: mapVars.pos,
		map: mapVars.map,
		icon: {
			url: 'images/my-ticket.png',
			scaledSize: new google.maps.Size(100, 100)
		}
	});
	
	// - Flash SUCCESS
	$('#takeBtn').text('SUCCESS').css('color', '#2ECC40').css('letter-spacing', '3px').css('font-size', '2rem');
	setTimeout(function() {
		$('#takeBtn').css('letter-spacing', '6px').css('font-size', '4rem');
		setTimeout(function() {
			$(location).attr('href', '/take');
		},750);
	},500);
}

function updateTicketError(json) {
	console.log('ajax error');
	if (json) { console.log(json) }
}

$(function() {
	console.log('take loaded');
	$('#takeBtn').toggleClass('btn-outline-primary').css('letter-spacing', '6px').css('font-size', '4rem');
});


