; import { Func_group } from "./func_group.js";//导入工具组
var group = new Func_group();

class Registry {
    constructor() {
        this.input = group.$('input', 'all');
        this.label = group.$('label', 'all');
        this.submit = group.$('.submit');
        //定义一个标记，标记都通过时，可以进行注册
        this.useflag = false;
        this.pastopflag = false;
        this.pasbotflag = false;
        this.phoneflag = false;
    }
    init() {
        this.use_reg();
        this.passtop_reg();
        this.passbot_reg();
        this.phone_reg();
        this.action_reg()
    }
    //用户名判定
    use_reg() {
        let reg = /^[\w\u4e00-\u9fa5]{1,16}$/;
        this.input[0].oninput = () => {
            if (this.input[0].value != '') {//用户名不能为空
                let len = this.input[0].value.replace(/[\u4e00-\u9fa5]/g, '**').length
                if (len < 6 || len > 16) {//用户名字数限制
                    this.label[0].style.display = 'block';
                    this.label[0].style.color = 'red';
                    this.label[0].innerHTML = '用户名必须在6 到 16个字符之间(一个中文相当于于两个字符)';
                } else {
                    if (reg.test(this.input[0].value)) {
                        //开始进行用户名判定，是否已被注册
                        group.ajax({
                            type: 'post',
                            url: 'http://10.31.161.146/aiqiyishangcheng/php/post_username.php',
                            data: {
                                name: this.input[0].value
                            }
                        }).then((value) => {
                            if (value) {
                                this.label[0].style.display = 'block';
                                this.label[0].style.color = 'red';
                                this.label[0].innerHTML = '用户名已被注册';
                            } else {
                                this.label[0].style.display = 'block';
                                this.label[0].style.color = 'green';
                                this.label[0].innerHTML = '√';
                                this.useflag = true;
                            }
                        })
                        this.label[0].style.display = 'block';
                        this.label[0].style.color = 'green';
                        this.label[0].innerHTML = '√';
                    } else {
                        this.label[0].style.display = 'block';
                        this.label[0].style.color = 'red';
                        this.label[0].innerHTML = '用户名不能包含特殊字符';
                    }
                }
            } else {
                this.label[0].style.display = 'block';
                this.label[0].style.color = 'red';
                this.label[0].innerHTML = '用户名必填';
            }
        }
        this.input[0].onblue = () => {

        }
    }
    //密码判定
    passtop_reg() {
        let reg = /^[\W\w]{6,16}$/;
        this.input[1].oninput = () => {
            let value = this.input[1].value
            if (this.input[1].value != '') {
                if (value.length < 6 || value.length > 16) {
                    this.label[1].style.display = 'block';
                    this.label[1].style.color = 'red';
                    this.label[1].innerHTML = '密码必须在6 到 16个字符之间(不包含中文和特殊字符)';
                } else {
                    if (reg.test(value)) {
                        let flag = 0;
                        let reg1 = /[\W\_]/;
                        let reg2 = /\d/;
                        let reg3 = /[a-zA-Z]/;
                        if (reg1.test(value)) {
                            flag++;
                        } if (reg2.test(value)) {
                            flag++;
                        } if (reg3.test(value)) {
                            flag++;
                        } switch (flag) {
                            case 1:
                                this.label[1].style.display = 'block';
                                this.label[1].style.color = 'red';
                                this.label[1].innerHTML = '弱';
                                this.pastopflag = true;
                                break;
                            case 2:
                                this.label[1].style.display = 'block';
                                this.label[1].style.color = 'orange';
                                this.label[1].innerHTML = '中';
                                this.pastopflag = true;
                                this.action_reg()
                                break;
                            case 3:
                                this.label[1].style.display = 'block';
                                this.label[1].style.color = 'green';
                                this.label[1].innerHTML = '强';
                                this.pastopflag = true;
                                this.action_reg()
                                break;
                        }
                    }
                }
            } else {
                this.label[1].style.display = 'block';
                this.label[1].style.color = 'red';
                this.label[1].innerHTML = '密码不能为空';
            }
        }
    }
    //密码重新输入判定
    passbot_reg() {
        this.input[2].oninput = () => {
            let pas_one = this.input[1].value;
            let pas_two = this.input[2].value;
            if (pas_two) {
                if (pas_one === pas_two) {
                    this.label[2].style.display = 'block';
                    this.label[2].style.color = 'green';
                    this.label[2].innerHTML = '√';
                    this.pasbotflag = true;
                } else {
                    this.label[2].style.display = 'block';
                    this.label[2].style.color = 'red';
                    this.label[2].innerHTML = '两次输入的密码必须一致';
                }
            } else {
                this.label[2].style.display = 'block';
                this.label[2].style.color = 'red';
                this.label[2].innerHTML = '密码不能为空';
            }
        }
    }
    //手机号判定
    phone_reg() {
        let reg = /^1[35789]\d{9}$/;
        this.input[3].oninput = () => {
            let phone = this.input[3].value;
            if (reg.test(phone)) {
                this.label[3].style.display = 'block';
                this.label[3].style.color = 'green';
                this.label[3].innerHTML = '√';
                this.phoneflag = true;
            } else {
                this.label[3].style.display = 'block';
                this.label[3].style.color = 'red';
                this.label[3].innerHTML = '请输入正确的手机号码';
            }
        }
    }
    //开始注册
    action_reg(){
        this.submit.onclick=()=>{
            if(this.useflag && this.pastopflag && this.pasbotflag && this.phoneflag){

            }
        }
    }
}
export { Registry }