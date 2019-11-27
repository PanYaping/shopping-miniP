# 摩托超市
```
  这是一个利用小程序开发的商城前端Demo
```

## 知识点整理

#### 1、flex页面布局
```
  参考Home压面整体页面布局；
```
#### 2、点击加入购物车，抛物线动画的实现
```
  参考home.ts文件toCart()函数，利用wx.createAnimation() API实现抛物线动画；
```
#### 3、滑动右侧商品列表，监测更新左侧分类选中项
```
  参考category.ts文件bindscroll()函数，通过监测Element滑动属性更新左侧选中分类；
```
#### 4、微信小程序引入第三方库lodash
```
  由于微信小程序有大小限制（不超过2M），所以引入第三方库需谨慎。本项目引入流程：
==>a、获取 lodash:
    在 miniprogram 目录下 npm install -s lodash
    ** node_modules/ 不会被打包到目标包

==>b、复制 lodash 源码到 lib 目录
    $ mkdir -p lib
    $ cp node_modules/lodash/lodash.min.js lib

==>c、编辑 app.js，添加以下内容
    由于微信小程序中Array 不存在, 因为 freeGlobal 和 freeSelf 都为 false, 微信直接注入了 window 和 self，导致报错："Uncaught TypeError: Cannot read property 'prototype' of undefined"。

    Object.assign(global, {
    Array : Array,
    Date : Date,
    Error : Error,
    Function : Function,
    Math : Math,
    Object : Object,
    RegExp : RegExp,
    String : String,
    TypeError : TypeError,
    setTimeout : setTimeout,
    clearTimeout : clearTimeout,
    setInterval : setInterval,
    clearInterval : clearInterval
    });

==>d、引用 lodash 库
    const _ = require(’./lib/lodash.min’);
```

![image](./miniprogram/images/home.png)
![image](./miniprogram/images/categories.png)
![image](./miniprogram/images/shopping-cart.png)
![image](./miniprogram/images/account.png)


