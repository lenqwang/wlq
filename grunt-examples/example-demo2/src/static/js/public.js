(function(w, undefined){
	var pub = w.pub = function(selector, root){
		this.selector = selector;
		this.root = root;
	};

	pub.prototype.init = function(){
		var elem;
		selector = this.selector;
		if(typeof selector === 'string'){
			elem = document.getElementById(selector);
		}
		else {
			elem = w.selector ? selector : document.getElementsByTagName(selector);
		}
	};

	pub.prototype.css = function(css){
		if(css) {
			this.selector.className = css;
		}
	};
})(this);