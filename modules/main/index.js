import{h as e,render as s}from"https://www.unpkg.com/@lv-saharan/omii@latest/dist/omii.js";import{css as h}from"https://www.unpkg.com/omii-ui@latest/dist/omii-ui.js";import t from"/common/security.js";var r=`
html,
body {
  margin: 0;
  font-size: 62.5%;
  height: 100%;
}

#main {
  height: 100%;
}

oi-import {
  width: 100%;
  height: 100%;
  --oi-loading-color: #aaeeff;
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiRDpcXEdJVFxcb21paS10ZW1wbGF0ZS1kZWZhdWx0XFxtb2R1bGVzXFxtYWluXFxzcmMiLCJzb3VyY2VzIjpbImluZGV4LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtFQUVJO0VBQ0E7RUFDQTs7O0FBRUo7RUFDSTs7O0FBRUo7RUFDSTtFQUNBO0VBQ0EifQ== */`;async function f(){let i=new CSSStyleSheet;i.replace(r);let a=await h.getCSSStyleSheet("root");document.adoptedStyleSheets=[a,i],t.onLogin(d=>{S.update()}).onLogout(d=>{let p=new URL("../../",import.meta.url).href;location.href=p});let m=new URL("../login/index.js",import.meta.url).href,c=e("oi-import",{src:m,key:"login"}),l=new URL("../home/index.js",import.meta.url).href,n=e("oi-import",{src:l,key:"home"}),o=c;await t.checkLogin()&&(o=n);let S=s(()=>(t.logined&&(o=n),e("div",{id:"main"},o)),"body")}f();
//# sourceMappingURL=index.js.map
