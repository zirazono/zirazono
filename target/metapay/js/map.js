// Reference to the Firebase database.
//var firebase = new Firebase("<Your Firebase URL here>");

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.488804, lng: 127.098803},
    zoom: 120
  });

  // Add marker on user click
  map.addListener('click', function(e) {
//    firebase.push({lat: 37.488804, lng: 127.098803});
  });

  // Create a heatmap.
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: [],
    map: map,
    radius: 8
  });

//  firebase.on("child_added", function(snapshot, prevChildKey) {
    // Get latitude and longitude from Firebase.
//    var newPosition = snapshot.val();

    // Create a google.maps.LatLng object for the position of the marker.
    // A LatLng object literal (as above) could be used, but the heatmap
    // in the next step requires a google.maps.LatLng object.
    var latLng = new google.maps.LatLng(37.488804, 127.098803);
    
    heatmap.getData().push(latLng);
//  });
}