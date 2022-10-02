const { h, Component } = omii;
const {
  css: { getCSSStyleSheets },
} = omii.ui;

import security from "/common/security.js";

export default class extends Component {
  static css = [
    getCSSStyleSheets(
      "reboot",
      "forms",
      "utilities",
      "grid",
      "containers",
      "buttons"
    ),
  ];
  data = { password: null, userName: "admin" };
  get bindingScope() {
    return this.data;
  }

  render() {
    return (
      <div className="container">
        <div class="row justify-content-md-center">
          <div class="col-3">
            <form is="oi-form" onSubmit={evt => {
              const { userName, password } = this.data;
              security
                .login(userName, password)
                .then(() => {
                  this.fire("logined");
                })
                .catch((exc) => {
                  alert("登录失败");
                });

              evt.preventDefault();
            }}>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  user name
                </label>
                <input
                  class="form-control"
                  id="userName"
                  value="admin"
                  placeholder="username"
                  o-model="userName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  passowrd
                </label>

                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="******"
                  o-model="password"
                  required
                />
              </div>
              <div class="mb-3 d-flex justify-content-between">
                <button className="btn btn-primary"                >
                  Login
                </button>
                <button className="btn btn-secondary" type="reset">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
