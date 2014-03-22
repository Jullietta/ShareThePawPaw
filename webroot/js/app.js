'use strict';

var phonecatApp = angular.module('phonecatApp', [ 'ngRoute',
		'phonecatAnimations', 'phonecatControllers', 'phonecatFilters',
		'phonecatServices', 'google-maps' ]);

phonecatApp.config([ '$routeProvider',

function($routeProvider) {

	$routeProvider.

	when('/pack', {
		templateUrl : 'partials/pack-list.html',
		controller : 'PackListCtrl'
	}).when('/pack/:packId', {
		templateUrl : 'partials/pack-viewer.html',
		controller : 'PackViewerCtrl'
	}).when('/pack/:packId/:targetLanguage', {
		templateUrl : 'partials/pack-viewer.html',
		controller : 'PackViewerCtrl'
	}).when('/pack/:packId/:targetLanguage/:nativeLanguage', {
		templateUrl : 'partials/pack-viewer.html',
		controller : 'PackViewerCtrl'
	}).when('/packquiz/:packId', {
		templateUrl : 'partials/pack-quiz.html',
		controller : 'PackQuizCtrl'

	}).when('/map', {
		templateUrl : 'partials/main_map.html',
		controller : 'MainMapCtrl'
	}).when('/packquiz/:packId/:targetLanguage/:nativeLanguage', {
		templateUrl : 'partials/pack-quiz.html',
		controller : 'PackQuizCtrl'
	}).

	otherwise({
		redirectTo : '/map'
	});

} ]);

phonecatApp.config(['$httpProvider', function ($httpProvider) {
	  //Reset headers to avoid OPTIONS request (aka preflight)
	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	}]);