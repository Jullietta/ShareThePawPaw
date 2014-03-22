'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('MainMapCtrl', [
		'$scope',
		'Packs',
		'Languages',
		function($scope, Packs, Languages) {

			console.log("start");
			Languages.query(function(points) {

				// {"id":"1","lat":"-33.8866310","lon":"151.1956550","notes":"In
				// my
				// garden","status":"confirmed","name":"mint","icon":"herb","date_added":"21
				// Jan 2014"}

				$scope.markers = points;

				for ( var i = 0; i < $scope.markers.length; i++) {
					var marker = $scope.markers[i];
					// infowindow = new google.maps.InfoWindow();
					//					
					// var content = '<div id="infowindow_content" ng-include
					// src="\'infowindow.html\'"></div>';
					// var compiled = $compile(content)(scope);
					//					  
					// google.maps.event.addListener(
					// marker,
					// 'click',
					// (function( marker , scope, compiled , localLatLng ){
					// return function(){
					// scope.latLng = localLatLng;//to make data available to
					// template
					// scope.$apply();//must be inside write new values for each
					// marker
					// infowindow.setContent( compiled[0].innerHTML );
					// infowindow.open( Map , marker );
					// };//return fn()
					// })( marker , scope, compiled , scope.markers[i].locations
					// )
					// );//addListener

					// // var opts = new google.maps.MarkerOptions();
					var opts = new Object();
					var url;
					// opts.icon = new google.maps.Icon();
					if (points[i].status != "unknown") {
						url = "images/" + points[i].icon + ".png";
					} else {
						url = "images/unconfirmed.png";
					}
					// //

//					marker.closeClick = function() {
//						marker.showWindow = false;
//						$scope.$apply();
//					};
//					marker.onClicked = function() {
//						onMarkerClicked(marker);
//					};

					opts.icon = new Object();
					opts.icon.url = url;
					marker.options = opts;
					i++;
				}

			});

			$scope.map = {
				center : {
					latitude : -33.883826,
					longitude : 151.195648
				},
				zoom : 16
			};

			$scope.showMarker = function(marker) {
				marker.showWindow = true;
				// alert(marker);
//				window.alert("Marker: lat: " + marker.latitude + ", lon: "
//						+ marker.longitude + " clicked!!")
			};

		

		} ]);

phonecatControllers.controller('PackListCtrl', [ '$scope', 'Packs',
		'Languages', function($scope, Packs, Languages) {
			$scope.packs = Packs.query();

			$scope.languages = Languages.query(function(pack) {

				$scope.targetLanguage = "fi";
				$scope.nativeLanguage = "en";
			});

		} ]);

phonecatControllers.controller('PackViewerCtrl', [
		'$scope',
		'$routeParams',
		'Packs',
		function($scope, $routeParams, Packs) {
			initPack($scope, $routeParams);

			Packs.get({
				packId : $routeParams.packId
			}, function(pack) {
				$scope.pack = new PackViewerModel(pack.id, pack.cards,
						pack.imageUrl);
			});

			$scope.next = function() {
				$scope.pack.incrementIndex();
			};

		} ]);

phonecatControllers.controller('PackQuizCtrl', [
		'$scope',
		'$routeParams',
		'Packs',
		function($scope, $routeParams, Packs) {
			initPack($scope, $routeParams);
			$scope.badAnswer = false;

			Packs.get({
				packId : $routeParams.packId
			},
					function(pack) {
						$scope.pack = new QuizModel(pack.id, pack.cards,
								pack.imageUrl);
					});

			$scope.checkCard = function(card) {
				if (card.id == $scope.pack.getCurrentCard().id) {
					$scope.badAnswer = false;
					$scope.pack.incrementIndex();
				} else {
					$scope.badAnswer = true;
				}
			};

		} ]);

function initPack($scope, $routeParams) {
	$scope.targetLanguage = $routeParams.targetLanguage;
	$scope.nativeLanguage = $routeParams.nativeLanguage;

};
