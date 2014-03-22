function callForIems() {
	$.get("http://www.sharethepawpaw.com/ws/goodies/", function(data) {

		// $( ".result" ).html( data );
		alert(data.length);
	});

	var self = this;

	// self.addMarker({
	// 'position' : this.get('map').getCenter()
	// }).click(function() {
	// self.openInfoWindow({
	// 'content' : 'Hello World!'
	// }, this);
	// });
};