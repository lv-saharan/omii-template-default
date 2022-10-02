import{h as c,render as h}from"http://omii.flatweb.net/es-lib/omii/latest/omii.js";import{css as s}from"http://omii.flatweb.net/es-lib/omii-ui/latest/omii-ui.js";import n from"/common/security.js";var i=`
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
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiRDpcXEdJVFxcb21paS10ZW1wbGF0ZS1kZWZhdWx0XFxtb2R1bGVzXFxtYWluXFxzcmMiLCJzb3VyY2VzIjpbImluZGV4LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtFQUVJO0VBQ0E7RUFDQTs7O0FBRUo7RUFDSTs7O0FBRUo7RUFDSTtFQUNBO0VBQ0EifQ== */`;async function d(){let o=new CSSStyleSheet;o.replace(i);let r=await s.getCSSStyleSheet("root");document.adoptedStyleSheets=[r,o];let a=new URL("../login/index.js",import.meta.url).href,t=new URL("../home/index.js",import.meta.url).href,e=a;await n.checkLogin()&&(e=t);let m=h(c("oi-import",{src:e,key:"home"}),"body");n.onLogin(S=>{m.load(t)}).onLogout(S=>{let l=new URL("../../",import.meta.url).href;location.href=l})}d();
//# sourceMappingURL=index.js.map
