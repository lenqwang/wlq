####加载requirejs
>我们在加载js脚本的时候会选择从头部加载，像这样：
```html
<script type="text/javascript" src="js/require.min.js" data-main="js/main"></script>
```
这样的做法有个错误，当页面加载过程中，会因为js没有加载完成导致页面渲染失败，我们的做法应该在页面加载完成之后，再去加载js，像下面这样：
```html
<body>
	
<script type="text/javascript" src="js/require.min.js" defer async="true" data-main="js/main"></script>
</body>
```
*async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。*