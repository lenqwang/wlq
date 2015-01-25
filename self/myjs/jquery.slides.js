/**
 * 轮播图
 *
 * html: 
 * <div id="box">
 * 		<ul>
 * 			<li><a href="#"><img src="" alt="" /></a></li>
 * 			<li><a href="#"><img src="" alt="" /></a></li>
 * 			<li><a href="#"><img src="" alt="" /></a></li>
 * 			<li><a href="#"><img src="" alt="" /></a></li>
 * 		</ul>
 * 		<ol></ol>
 * </div>
 * 
 * @return {[type]} [description]
 */

var Slide = function(){
	"use strict";
	/**
	 * 
	 * @return {[type]} [description]
	 */
	function removeConstructor(k, v) {
		return k === 'constructor' ? undefined : v;
	}

	function augment(r, varArgs) {
		var args = $.makeArray(arguments),
			len = args.length - 2,
			i = 1,
			proto,
			arg,
			ov = args[len],
			wl = args[len + 1];

		args[1] = varArgs;

		if(!$.isArray(wl)) {
			ov = wl;
			wl = undefined;
			len++;
		}
		if(typeof ov !== 'boolean') {
			ov = undefined;
			len++;
		}

		for(; i < len; i++) {
			arg = args[i];
			if( (proto = arg.prototype) ) {
				arg = $.extend({}, proto, true, removeConstructor);
			}
			$.extend(r.prototype, arg, ov, wl);
		}
		return r;
	}

	// Bslide factory
	var Bslide = function() {
		if(!(this instanceof Bslide)) {
			throw new Error('please use "new Slide()"');
		}
		this.name = 'slide'
		this.init.apply(this, arguments);
	}

	augment(Bslide, {
		init: function(selector, config) {
			var self = this;

			console.log(selector);
		},
		run: function() {
			return this.name;
		}
	});

	return {
		init: function(el, cfg) {
			return new Bslide(el, cfg);
		}
	};
}();