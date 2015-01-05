/**
 *
 *
 */

/*
example: 
Parallax([
    {elem: '.test', inspect: 0.8},
    {elem: '.test2', inspect: 0.5}
]);*/

var Parallax = function(arr) {
    var difX = 0,
        objArr = [],
        posArr = [],
        timer = null;

    // 鼠标移动造成的视差值
    $(document).mousemove(function(e) {
        var mx = e.pageX,
            cx = $(window).width() * 0.5;

        difX = (cx - mx) * 0.04;
    });

    for(var i = 0, len = arr.length; i < len; i++) {
        objArr[arr[i].elem] = $(arr[i].elem);
        var _left = parseInt( objArr[arr[i]].css('left'));
        var _right = parseInt( objArr[arr[i]].css('right') );

        posArr[arr[i]] = isNaN(_left) ? _right : _left;
    }

    timer = setInterval(function() {
        for(var j = 0; j < arr.length; i++) {
            objMove(arr[j].elem, arr[j].inspect);
        }
    }, 1000/80);

    function objMove(obj, r) {
        var isRight = isNaN(parseFloat(objArr[obj].css('left')));
        var do_right = posArr[obj] - difX * r;
        var do_left = posArr[obj] + difX * r;
        var tx = isRight ? do_right : do_left;
        var nx = isRight ? parseFloat( objArr[obj].css('right') ) : parseFloat( objArr[obj].css('left') );
        var dx = nx + (tx - nx) * 0.05;

        if(objArr[obj].css('left') == 'auto') {
            objArr[obj].css('right', dx);
        }
        else {
            objArr[obj].css('left', dx);
        }
    }

}();