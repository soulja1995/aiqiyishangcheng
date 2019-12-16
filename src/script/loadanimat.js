import { Func_group } from "./func_group.js";//导入工具组
var group = new Func_group();
class Loadanimat {
    constructor() {
        //动画效果元素
        this.open = group.$('.drop_open');
        this.off = group.$('.drop_off');
        this.bimg = group.$('.big_img');
        this.simg = group.$('.small_img');
        //切换效果元素
        this.lighter = group.$('.lighter');
        this.glasses = group.$('.glasses');
        this.img_cut = group.$('.img_cut');
        this.ad_cut = group.$('.ad_cut');
    }
    init() {
        //进入页面的动画效果
        this.off.style.display = "block";
        this.simg.style.display = "none";
        let _this = this;
        this.off_click();
        this.open_click();
        setTimeout(function () {//添加延时定时器
            _this.bimg_off()//效果运行
        }, 5000)//动画效果结束

        //页面右方小切换效果
        this.img_change();
        this.img_autochange();
        this.img_chickchange();
    }
    bimg_off() {//加载完成之后效果
        let time = setInterval(() => {
            let height = this.bimg.offsetHeight;
            this.bimg.style.height = height - 10 + 'px';
            if (height <= 50) {
                height = this.simg.offsetHeight;
                clearInterval(time);
                this.bimg.style.display = "none";
                this.simg.style.display = "block";
                this.off.style.display = "none";
                this.open.style.display = "block";
            }
        }, 1000 / 60);
    }
    open_click() {//点击按钮效果
        this.open.onclick = () => {
            this.simg.style.display = "none";
            this.bimg.style.display = "block";
            let time = setInterval(() => {
                let height = this.bimg.offsetHeight;
                this.bimg.style.height = height + 10 + 'px';
                if (height >= 300) {
                    height = this.simg.offsetHeight;
                    clearInterval(time);
                    this.off.style.display = "block";
                    this.open.style.display = "none";
                }
            }, 1000 / 60);
        }
    }
    off_click() {//点击按钮运行加载完成效果，缩回图片
        this.off.onclick = () => {
            this.bimg_off();
        }
    }
    //切换小图片效果
    img_change() {
        let visone = window.getComputedStyle(this.lighter).display;
        let vistwo = window.getComputedStyle(this.glasses).display;
        if (visone == 'none' && vistwo == 'block') {
            this.lighter.style.display = 'block';
            this.glasses.style.display = 'none';
        } else if (visone == 'block' && vistwo == 'none') {
            this.lighter.style.display = 'none';
            this.glasses.style.display = 'block';
        }
    }
    //自动切换效果
    img_autochange() {
        let time = setInterval(() => {
            this.img_change();
        }, 2000);
        this.ad_cut.onmouseover = () => {
            clearInterval(time);
        }
        this.ad_cut.onmouseout = () => {
            time = setInterval(() => {
                this.img_change();
            }, 2000);
        }
    }
    //点击切换效果
    img_chickchange() {
        this.img_cut.onclick = () => {
            this.img_change();//运行切换函数
        }
    }
}
export {
    Loadanimat
}