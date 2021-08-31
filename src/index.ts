/*
 * Copyright (C) 2021  Aravinth Manivannan <realaravinth@batsense.net>
 * Lightweight vanilla JavaScript based router for the DOM.
 *
 * Use of this source code is governed by Apache 2.0 or MIT license.
 * You shoud have received a copy of MIT and Apache 2.0 along with
 * this program. If not, see <https://spdx.org/licenses/MIT.html> for
 * MIT or <http://www.apache.org/licenses/LICENSE-2.0> for Apache.
 */

/** Removes trailing slashed from URI */
const normalizeUri = (uri: string) => {
  uri = uri.trim();
  if (uri.length == 0) {
    throw new Error('uri is empty');
  }

  let uriLength = uri.length;
  if (uri[uriLength - 1] == '/') {
    uri = uri.slice(0, uriLength - 1);
  }
  return uri;
};

/** URI<-> Fn mapping type */
type routeTuple = {
  pattern: RegExp;
  fn: () => void;
};

/**
 * Router that selectively executes fucntions
 * based on `window.location.pathname`
 *
 * ```typescript
 * const router = new Router();
 * const settingsRoute = "/settings";
 * const profileRoute = "/r/[A-Z,a-z,0-9]+/";
 *
 * const settings = () => {
 *  let form = document.getElementById("form");
 *  const submit = () => {
 *    alert("Settings updated")
 *  }
 *  form.addEbentListener('submit', submit, true);
 * }
 *
 * const profile = () => {
 *  let form = document.getElementById("form");
 *  const submit = () => {
 *    alert("profile updated")
 *  }
 *  form.addEbentListener('submit', submit, true);
 * }
 *
 * router.register(settingsRoute, settings);
 * router.register(profileRoute, profile);
 *
 * try {
 *  router.router()
 * } catch(e) {
 *  console.log(e);
 * }
 * ```
 * */
class Router {
  routes: Array<routeTuple>;
  constructor() {
    this.routes = [];
  }

  /**
   * registers a route-function pair with Router
   * @param {string} uri - route to be registered
   * @param {function} fn: - function to be registered when window.locatin.path
   * matches uri
   * */
  register(uri: string, fn: () => void) {
    uri = normalizeUri(uri);

    let pattern = new RegExp(`^${uri}(.*)`);

    let patterString = pattern.toString();
    if (
      this.routes.find(route => {
        route.pattern.toString() == patterString;
      })
    ) {
      throw new Error('URI exists');
    }

    const route: routeTuple = {
      pattern,
      fn,
    };
    this.routes.push(route);
  }

  /**
   * executes registered function with route
   * matches window.pathname.location
   * */
  route() {
    const path = normalizeUri(window.location.pathname);
    let fn: undefined | (() => void);

    this.routes.find(route => {
      if (path.match(route.pattern)) {
        fn = route.fn;
        return true;
      } else {
        return false;
      }
    });

    if (fn === undefined) {
      throw new Error("Route isn't registered");
    } else {
      fn.call(this);
    }
  }
}

export default Router;
