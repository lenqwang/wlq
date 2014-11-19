//var counter = 4;
//
//while(counter--) {
//    (function(i) {
//        setTimeout(function() {
//            console.log('settimeout: '+i);
//        }, 0);
//    })(counter);
//
//    console.log(counter);
//}

/*
* title: 计算排列组合
* 数学意义：Cnm = m! / n!(n - m)!
*
* */

/*
function c(len, m) {
    return (function(n1, n2, j, i, n) {
        for(; j <= m;) {
            n2 *= j++;
            n1 *= i--;
        }

        return n1 / n2;
    })(1, 1, 1, len, len);
}

var result = c(8,2);
console.log(result);*/


/**
 * 快速排序
 * 取数组的中间一个数，把数组分成两个数组，同理这个数组也进行这样的做法，进行排序，递归调用
 */

/*
function quickSort(arr) {
    if(arr.length <= 1) return arr;

    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [], right = [], i = 0;

    for(; i < arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}

var testArr = [89,9,0,89,78,6,8,5,34,7];
console.log(quickSort(testArr));*/

/**
 * 变量作用域的问题
 */
/*var a = 12;
function fn(a) {
    console.log(arguments[0] === a);
    console.log(a);
    console.log(arguments[0]);
    var a = 10;
    console.log(a);
    arguments[0] = 5;
    console.log(a);
}

fn(20);*/


/**
 * 清空数组的方式
 * 1、splice
 * 2、length = 0
 * 3、array = [] 速度最快
 */
/*
var arr = [1,3,4,6,7];
console.log(arr);
arr.splice(0, arr.length);
arr.length = 0;
arr = [];
console.log(arr);*/

/*var arr = [1,2];
var str = 'efewf';

var isArray = function(k) {
    return k.constructor === Array;
};

console.log(isArray(str));*/

/*var a = 10;

function aaa() {
    console.log(a);
}

function bbb() {
    var a = 20;
    (function() {
        aaa();
    })();
}

bbb();*/



/**
 * 字符串转驼峰方法
 *
 */

/*
var str1 = 'border-bottom-color';

String.prototype.toCamel = function(){
    //return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});

    var division = this.split('-'), i = 0;
    for(; i < division.length; i++) {
        division[i] = division[i].charAt(0).toUpperCase() + division[i].slice(1);
    }
    return division.join('');
};

console.log(str1.toCamel());*/


/**
 * 查找字符串出现最多和个数
 */

/*var str = 'fwjlafjagagjwoiagjlwagjwlag';

String.prototype.findSame = function() {
    var me = this;
    var arr = me.split('');
    var num = 0;
    var value = '';
    var reg = /(\w)\1+/g;
    arr.sort();
    me = arr.join('');

    me.replace(reg, function($0, $1) {
        if(num < $0.length) {
            num = $0.length;
            value = $1;
        }
    });
    return {num: num, elem: value};
}

var obj = str.findSame();

console.log(obj.elem + ' : ' + obj.num);*/

/**
 * 给数字字符串分割千分符
 */

/*var str = '4632784249';

String.prototype.separator = function() {
    var reg = /(?=(?!\b)(\d{3})+$)/g;
    return this.replace(reg, ',');
};

console.log(str.separator());*/

/**
 *  加入n = 5，不使用for循环输出[1,2,3,4,5]
 *  使用递归代替for循环
 *  递归可以达到多次遍历的效果
 */

/*function digui(n) {
    var arr = [];

    return (function() {
        arr.unshift(n);
        n--;
        if(n != 0) {
            arguments.callee();
        }

        return arr;
    })();
}

function digui2(n) {
    var arr = [], arr2 = [];

    arr.length = n + 1;
    arr = arr.join('a');
    arr.replace(/a/g, function() {
        arr2.unshift(n--);
    });
    return arr2;
}

console.log(digui2(5));*/

/**
 * 判断一个数是否为素数（质数）
 */

function isPrime(number){
    return !/^1?$|^(11+?)\1+$/.test(new Array(number + 1).join('1'));
}

console.log(isPrime(22));
