; import { Func_group } from "./func_group.js";//导入工具组
var group = new Func_group();
class Render {
    constructor() {
        this.ren_li = group.$('.day_selected li', 'all');
    }
    init() {
        this.demo_render();
    }
    demo_render() {
        let _this = this;
        group.ajax({
            url: 'http://10.31.161.146/aiqiyishangcheng/php/get_render.php',
            dataType: 'json',
            async: true
        }).then(function (value) {
            for (let i = 0; i < value.length; i++) {
                let str=
                    `
                <a href="##">
                    <img src="${value[i].url}"
                        alt="">
                    <p>${value[i].title}</p>
                    <p>
                        <span>经典怀旧</span>
                        <span>${value[i].label}</span>
                    </p>
                    <p>
                        <span>￥${value[i].price}</span>
                        <span>已售 ${value[i].sell}</span>
                    </p>
                </a>
                `
                _this.ren_li[i].innerHTML=str;
                
            }
        })
    }
}
export {
    Render
}
