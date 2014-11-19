
//获取对象的样式属性
function getStyle(obj , attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return document.defaultView.getComputedStyle(obj , null)[attr];
		}
}

//运动对象
function startMove(oDiv , json , during , fn){
	
	if(oDiv.timer) clearInterval(oDiv.timer);
	
	oDiv.timer = setInterval(function(){
			var Bstop = true; //假设所有属性都已到达
			
			for(var attr in json){
				var speed , cur = 0;
				
				if(attr == "opacity"){
					cur = Math.round(parseFloat(getStyle(oDiv , attr)) * 100);
				}
				else{
					cur = parseInt(getStyle(oDiv , attr));	
				}
				speed = (json[attr] - cur)/during;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				
				if(cur != json[attr]){
					Bstop = false;
				}
				
				if(attr == "opacity"){
					oDiv.style.filter = "alpha(opacity:"+ (cur + speed) +")";
					oDiv.style.opacity = (cur + speed)/100;
				}
				else{
					oDiv.style[attr] = cur + speed + "px";
				}
			}
			
			if(Bstop){
				clearInterval(oDiv.timer);
				
				if(fn) fn();
			}
	} , 30);	
}