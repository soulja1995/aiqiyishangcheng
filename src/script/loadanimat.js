; import { Func_group } from "./func_group.js";//导入工具组
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
        //轮播图效果元素
        this.img_banner = group.$('.banner')
        this.aimg = group.$('.banner img', 'all');
        this.ali = group.$('.banner li', 'all');
        this.left = group.$('.ban_left');
        this.right = group.$('.ban_right');
        this.index = 0
        //回到顶部效果元素
        this.back = group.$('.back_top');
        this.top = group.$('.to_top')
    }
    //进入页面动画效果
    init() {
        //进入页面的动画效果
        this.off.style.display = "block";
        this.simg.style.display = "none";
        let _this = this;
        setTimeout(function () {//添加延时定时器
            _this.bimg_off()//效果运行
        }, 5000)//动画效果结束
        this.off_click();
        this.open_click();

        //页面右方小切换效果
        this.img_change();
        this.img_autochange();
        this.img_chickchange();

        //轮播图效果
        this.banner();
        this.right_click();
        this.left_click();
        this.auto_banner();

        //回到顶部效果
        this.back_top();

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

    //轮播图效果
    banner() {
        //红点效果
        for (let i = 0; i < this.ali.length; i++) {
            this.ali[i].onmouseover = () => {
                for (let j = 0; j < this.ali.length; j++) {
                    this.ali[j].className = '';
                    if (this.aimg[j].className != '') {
                        this.ali[j].className = 'red_action';
                    }
                }
                this.ali[i].className = 'red_action';
                this.ali[i].onmouseout = () => {
                    this.ali[i].className = '';
                    if (this.aimg[i].className != '') {
                        this.ali[i].className = 'red_action';
                    }
                }
            }
            //点击切换效果运行点击函数
            this.ali[i].onclick = () => {
                this.ban_click(i);
            }
        }
    }
    // 点击li切换
    ban_click(i) {
        for (let i = 0; i < this.ali.length; i++) {
            this.aimg[i].className = '';
            this.ali[i].className = '';
        }
        this.ali[i].className = 'red_action';
        this.aimg[i].className = 'img_action';
        this.index = i
        console.log(this.index);
    }
    //切换效果
    right_change() {
        for (let i = 0; i < this.ali.length; i++) {
            this.ali[i].className = '';
            this.aimg[i].className = '';
        }
        if (this.index < 7) {
            this.ali[this.index + 1].className = 'red_action';
            this.aimg[this.index + 1].className = 'img_action';
            this.index++;
        } else {
            this.index = 0
            this.ali[this.index].className = 'red_action';
            this.aimg[this.index].className = 'img_action';
        }
    }
    //点击左右按钮切换
    right_click() {
        this.right.onclick = () => {
            this.right_change();
        }
    }
    //左切换
    left_click() {
        this.left.onclick = () => {
            for (let i = 0; i < this.ali.length; i++) {
                this.ali[i].className = '';
                this.aimg[i].className = '';
            }
            if (this.index > 0) {
                this.ali[this.index - 1].className = 'red_action';
                this.aimg[this.index - 1].className = 'img_action';
                this.index--
            } else {
                this.index = 7;
                this.ali[this.index].className = 'red_action';
                this.aimg[this.index].className = 'img_action';
            }
        }
    }
    // 自动轮播
    auto_banner() {
        let time = setInterval(() => {
            this.right_change()
        }, 4000);
    }
    
    // 回到顶部效果
    back_top() {
        window.onscroll = () => {
            let the_top = document.documentElement.scrollTop;
            if (the_top > 0) {
                this.back.style.display = 'block';
            } else {
                this.back.style.display = 'none';
            }
        }
        //点击回到顶部
        this.top.onclick = () => {
            let time=setInterval(() => {
                let the_top=document.documentElement.scrollTop;
                document.documentElement.scrollTop=the_top-300;
                if(the_top<=0){
                    clearInterval(time);
                }
            }, 1000/60)
            
        }
    }


}
export {
    Loadanimat
}