seajs.config({
	alias: {
		'prettyPrint': 'js/prettify.js'
	}
});

define(function(require){
	require('../css/prettyPrint.css');
	require('prettyPrint');
	prettyPrint();
	require('firebug');
});