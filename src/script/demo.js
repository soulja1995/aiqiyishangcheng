import{Loadanimat} from "./loadanimat.js";//页面动画效果
import{Render} from "./render.js";//渲染页面效果
import{Registry} from "./registry.js";//登录注册
let the_title=document.querySelector('title');
if(the_title.innerHTML=='爱奇艺商城-购享娱乐'){
    new Loadanimat().init();
    new Render().init();
}else if(the_title.innerHTML=='注册'){
    new Registry().init();
}




