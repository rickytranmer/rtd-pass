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
			pos = {
				lat: marker.position.lat(),
				lng: marker.position.lng()
			};
			centerMap(pos);

			if (this.leftBy === $('#userDisplay').text()) {
				if (marker.expireTime.length < 7) {
					editWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 id=claimInfo class='col-12 ticket-info make-longer'>" + marker.expireTime + "</h3><button id='editButton' data-id='" + this.id + "' class='btn btn-success col-12'>EDIT</button></div>"});
				} else {
					editWindow = new google.maps.InfoWindow({content:"<div class='container-fluid'><h3 id=claimInfo class='col-12 ticket-info'>" + marker.expireTime + "</h3><button id='editButton' data-id='" + this.id + "' class='btn btn-success col-12'>EDIT</button></div>"});

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
				setTimeout(function() {centerMap()}, 30000);
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
	for (let i = markerList.length - 1; i >= 0; i--) {
		markerList[i].setMap(null);
	}
	// - New ticket icon at update ticket's position
	let marker = new google.maps.Marker({
		position: pos,
		map: map,
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


