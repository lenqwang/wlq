require.config({
	paths: {
		angular: '/res/angularjs/bower_components/angular/angular.min'
	},
	shim: {
		'angular': {
			exports: 'angular'
		}
	}
});

require(['controllers/myCtrl']);