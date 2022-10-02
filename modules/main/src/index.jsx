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

  const loginURL = new URL("../login/index.js", import.meta.url).href;
  const homeURL = new URL("../home/index.js", import.meta.url).href;
  
  let mainUrl = loginURL
  if (await security.checkLogin()) {
    mainUrl = homeURL;
  }
  let rootNode = render(<oi-import src={mainUrl} key="home"></oi-import>, "body");
  
  security
    .onLogin((userInfo) => {
      rootNode.load(homeURL);
    })
    .onLogout((_) => {
      const url = new URL("../../", import.meta.url).href;
      location.href = url;
    });
  }
  
  init();
