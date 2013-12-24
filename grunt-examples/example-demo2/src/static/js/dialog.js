pub.dialog = function(elem, shadow){
	elem = typeof elem === 'string' ? document.getElementById(elem) : elem;
	shadow = typeof shadow === 'string' ? document.getElementById(shadow) : shadow;

	elem.onclick = function(){
		this.style.display = 'none';
		shadow.style.display = 'none';
		return false;
	};
};