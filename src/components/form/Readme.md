# 引入

<MtFrom
:width="width"
:formConfig="formConfig"
:formBtns="formBtns"
@submit="submitFn"
/>

# 数据

## 表单配置 formConfig

## 表单按钮配置 formBtns

// width: '0px'
// formConfig: [
// {label: '标题', width: '标题宽度', field: '标题字段', type: '输入框类型', rules: []}
// ]
// formBtns: [
// {content:'创建/更新/重置', type: 'primary/success/info/warning/danger', }
// ]

data() {
return {
width: "80px",
formConfig: [
{
label: "账号",
width: "",
field: "uname",
type: "text",
rules: [
{ required: true, message: "账号不能为空", trigger: "blur" },
{ min: 3, max: 6, message: "长度在 3-6 个字符", trigger: "blur" },
],
},
{
label: "密码",
width: "",
field: "pwd",
type: "password",
rules: [
// { required: true, message: "密码不能为空", trigger: "blur" },
// { min: 3, max: 6, message: "长度在 3-6 个字符", trigger: "blur" },
// ### 自定义规则
{
validator: (rule, value, callback) => {
if (!value) {
return callback("请输入密码");
}
return callback();
},
trigger: "blur",
},
],
},
],

formBtns: [
{ content: "登录", type: "primary" },
{ content: "重置", type: "" },
],
formData: {
uname: "",
pwd: "",
},
};
},
methods: {
submitFn(formData) {
console.log("提交了", formData);
},
},
