每个app基本上是一个独立的个体，实现高内聚，尽量少的外部依赖。除了本目录内的view,model, tpl的依赖外，再就是第三方组件(Backbone,Mustache等)的依赖了和项目公共组件的依赖了如require('../utils/xxx.js')。

也就是说如果有多个app使用的共用代码，也保存在myjs目录下，并建立子目录进行命名空间划分，如stuff,utils,xxxhelper等。 这样下来一个网站有很多个app，整个文件目录也很有条理，不会乱。