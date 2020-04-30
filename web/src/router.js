import React from 'react';
import { Route, Switch } from 'react-router-dom';

// 引入页面
import Home from 'sections/home';
import Page1 from 'sections/page1';
import Page2 from 'sections/page2';
import Counter from 'sections/counter';
import User from 'sections/management/containers'


// 路由
//<Switch>:只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。
// 属性exact  如果为 true，path 为 '/one' 的路由将不能匹配 '/one/two'，反之，亦然。
const getRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/page1" component={Page1}/>
        <Route path="/page2" component={Page2}/>
        <Route path="/counter" component={Counter}/>
        <Route path="/User" component={User}/>
    </Switch>
);

export default getRouter;