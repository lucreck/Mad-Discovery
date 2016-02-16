var marker;
var marker2;
var placesLocation;
var selectedPositionMap ="null";

function initAutocomplete(currentLat, currentLong) {

  var map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: currentLat,
      lng: currentLong
    },
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {
      lat: currentLat,
      lng: currentLong
    }
  });
  marker.addListener('click', toggleBounce);
  marker.addListener('dragend', getSelectedPosition);

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      // var icon = {
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25)
      // };
      //
      // // Create a marker for each place.
      // markers.push(new google.maps.Marker({
      //   map: map,
      //   icon: icon,
      //   title: place.name,
      //   position: place.geometry.location
      // }));
      marker.setPosition(place.geometry.location);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    getSelectedPosition();
  });
}
function initMapLocationEvent(mappoint) {
  var mappoint2 = mappoint.substring(1, mappoint.length-1)
  var latc = mappoint2.split(", ")[0];
  var lngc = mappoint2.split(", ")[1];
  var map = new google.maps.Map(document.getElementById("map2"), {
    center: {
      lat: parseFloat(latc),
      lng: parseFloat(lngc)
    },
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position:{
      lat: parseFloat(latc),
      lng: parseFloat(lngc)
    }
  });
  marker.addListener('click', toggleBounce);
  marker.addListener('dragend', getSelectedPosition);

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input2");
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      // var icon = {
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25)
      // };
      //
      // // Create a marker for each place.
      // markers.push(new google.maps.Marker({
      //   map: map,
      //   icon: icon,
      //   title: place.name,
      //   position: place.geometry.location
      // }));
      marker.setPosition(place.geometry.location);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    getSelectedPosition();
  });
}

function initAutocomplete2(currentLat, currentLong) {
  var map = new google.maps.Map(document.getElementById("map2"), {
    center: {
      lat: currentLat,
      lng: currentLong
    },
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });

  marker2 = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {
      lat: currentLat,
      lng: currentLong
    }
  });
  marker2.addListener('click', toggleBounce2);
  marker2.addListener('dragend', getSelectedPosition2);

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input2");
  var searchBox = new google.maps.places.SearchBox(input);
  var input2 = document.getElementById("txtLocation");
  var searchBox2 = new google.maps.places.SearchBox(input2);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox2.setBounds(map.getBounds());
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {

      marker2.setPosition(place.geometry.location);
      // Create a marker for each place.

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    getSelectedPosition2();
  });
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
    selectedPositionMap = marker.getPosition();
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    selectedPositionMap = marker.getPosition();
  }
}
function getSelectedPosition() {
    selectedPositionMap = marker.getPosition();
}
function toggleBounce2() {
  if (marker2.getAnimation() !== null) {
    marker2.setAnimation(null);
    selectedPositionMap = marker2.getPosition();
  } else {
    marker2.setAnimation(google.maps.Animation.BOUNCE);
    selectedPositionMap = marker2.getPosition();
  }
}
function getSelectedPosition2() {
    selectedPositionMap = marker2.getPosition();
}
