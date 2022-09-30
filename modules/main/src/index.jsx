import { h, render, define } from "/es-lib/omii/latest/omii.js";
import { css } from "/es-lib/omii-ui/latest/omii-ui.js";

import indexCSS from "./index.scss";
async function initCSS() {
  const indexCSSStyleSheet = new CSSStyleSheet();
  indexCSSStyleSheet.replace(indexCSS);

  const rootCSSStyleSheet = await css.getCSSStyleSheet("root");
  document.adoptedStyleSheets = [rootCSSStyleSheet, indexCSSStyleSheet];
}
initCSS();

import security from "/common/security.js";

security
  .onLogin((userInfo) => {
    rootNode.update();
  })
  .onLogout((_) => {
    const url = new URL("../../", import.meta.url).href;
    location.href = url;
  });

const loginURL = new URL("../login/index.js", import.meta.url).href;
const loginPage = <oi-import src={loginURL} key="login"></oi-import>;

const homeURL = new URL("../home/index.js", import.meta.url).href;
const homePage = <oi-import src={homeURL} key="home"></oi-import>;

let page = loginPage;
if (await security.checkLogin()) {
  page = homePage;
}
let rootNode = render(() => {
  if (security.logined) {
    page = homePage;
  }
  return <div id="main">{page}</div>;
}, "body");
