'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', [ 'ngResource' ]);

phonecatServices.factory('Packs', [ '$resource', function($resource) {
	return $resource('plservice/:packId.json', {}, {
		query : {
			method : 'GET',
			params : {
				packId : 'pawpaw'
			},
			isArray : true
		}
	}

	);
} ]);

phonecatServices.factory('Languages', [ '$resource', function($resource) {
	//return $resource('http://www.sharethepawpaw.com/ws/goodies/');
	return $resource('plservice/:packId.json', {}, {
		query : {
			method : 'GET',
			params : {
				packId : 'pawpaw'
			},
			isArray : true
		}
	}

	);
	
} ]);