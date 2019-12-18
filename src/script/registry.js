; import { Func_group } from "./func_group.js";//导入工具组
var group = new Func_group();

class Registry {
    constructor() {
        this.input = group.$('input', 'all');
        this.label = group.$('label', 'all');

    }
    init() {
        this.use_reg();
        this.passtop_reg();
    }
    //用户名判定
    use_reg() {
        let reg = /^[\w\u4e00-\u9fa5]{1,16}$/;
        this.input[0].oninput = () => {
            if (this.input[0].value != '') {
                let len = this.input[0].value.replace(/[\u4e00-\u9fa5]/g, '**').length
                console.log(len)
                if (len < 6 || len > 16) {
                    this.label[0].style.display = 'block';
                    this.label[0].style.color = 'red';
                    this.label[0].innerHTML = '用户名必须在6 到 16个字符之间(一个中文相当于于两个字符)';
                }else{
                    if(reg.test(this.input[0].value)){
                        this.label[0].style.display = 'none';
                    }else{
                        this.label[0].style.display = 'block';
                        this.label[0].style.color = 'red';
                        this.label[0].innerHTML = '用户名不能包含特殊字符';
                    }
                } 
            }else {
                this.label[0].style.display = 'block';
                this.label[0].style.color = 'red';
                this.label[0].innerHTML = '用户名必填';
            }
        }
        this.input[0].onblue=()=>{

        }
    }
    //密码判定
    passtop_reg(){
        let reg = /^\w{6,16}$/;
        this.input[1].oninput=()=>{
            let value = this.input[1].value
            if (this.input[1].value != '') {
                if (value.length < 6 || value.length > 16) {
                    this.label[1].style.display = 'block';
                    this.label[1].style.color = 'red';
                    this.label[1].innerHTML = '用户名必须在6 到 16个字符之间(不包含中文和特殊字符)';
                }else{
                    if(reg.test(value)){
                        this.label[1].style.display = 'none';
                    }else{
                        this.label[1].style.display = 'block';
                        this.label[1].style.color = 'red';
                        this.label[1].innerHTML = '用户名不能包含特殊字符';
                    }
                } 
            }else {
                this.label[1].style.display = 'block';
                this.label[1].style.color = 'red';
                this.label[1].innerHTML = '用户名必填';
            }
        }
    }
}
export { Registry }