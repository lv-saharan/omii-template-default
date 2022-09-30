const { h, render, Component, define } = omii;
const {
  css: { getCSSStyleSheets },
} = omii.ui;
import security from "/common/security.js";

import css from "./index.scss";
export default class extends Component {
  static css = [
    getCSSStyleSheets("reboot", "utilities", "grid", "containers", "buttons"),
    css,
  ];

  render() {
    return (
      <oi-layout>
        <div slot="header">
          <button
            class="btn btn-primary"
            onClick={(evt) => {
              security.logout();
              
            }}
          >
            Logout
          </button>
        </div>
        <div slot="content"></div>
        <div slot="left"></div>
        <div slot="right"></div>
      </oi-layout>
    );
  }
}
