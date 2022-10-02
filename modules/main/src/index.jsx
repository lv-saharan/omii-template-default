import {
  h,
  render,
  define,
} from "https://www.unpkg.com/@lv-saharan/omii@latest/dist/omii.js";
import { css } from "https://www.unpkg.com/omii-ui@latest/dist/omii-ui.js";
import security from "/common/security.js";
import indexCSS from "./index.scss";
async function init() {
  const indexCSSStyleSheet = new CSSStyleSheet();
  indexCSSStyleSheet.replace(indexCSS);

  const rootCSSStyleSheet = await css.getCSSStyleSheet("root");
  document.adoptedStyleSheets = [rootCSSStyleSheet, indexCSSStyleSheet];

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
}
init();
