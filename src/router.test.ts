/*
 * Copyright (C) 2021  Aravinth Manivannan <realaravinth@batsense.net>
 * Lightweight vanilla JavaScript based router for the DOM.
 *
 * Use of this source code is governed by Apache 2.0 or MIT license.
 * You shoud have received a copy of MIT and Apache 2.0 along with
 * this program. If not, see <https://spdx.org/licenses/MIT.html> for
 * MIT or <http://www.apache.org/licenses/LICENSE-2.0> for Apache.
 */
import Router from './index';

'use strict';

const result = {
  result: '',
};

const panelResult = 'hello from panel';
const panelRoute = '/panel';
const panel = () => (result.result = panelResult);

const settingsRoute = '/settings/';
const settingsResult = 'hello from settings';
const settings = () => (result.result = settingsResult);

const patternRoute = '/sitekey/[A-Z,a-z,0-9,_]+/';
const examplePatternRoute = '/sitekey/alksdjakdjadajkhdjahrjke234/';
const patterResult = 'hello from pattern route';
const pattern = () => (result.result = patterResult);

const UriExistsErr = 'URI exists';
const emptyUriErr = 'uri is empty';
const unregisteredRouteErr = "Route isn't registered";

const router = new Router();
router.register(panelRoute, panel);
router.register(settingsRoute, settings);
router.register(patternRoute, pattern);

it('checks if Router works', () => {
  window.history.pushState({}, '', examplePatternRoute);
  router.route();
  expect(result.result).toBe(patterResult);

  window.history.pushState(
    {},
    '',
    examplePatternRoute.slice(0, examplePatternRoute.length - 1),
  );
  router.route();
  expect(result.result).toBe(patterResult);

  window.history.pushState({}, 'Settings', settingsRoute);
  router.route();
  expect(result.result).toBe(settingsResult);
  window.history.pushState({}, 'Panel', panelRoute);
  router.route();
  expect(result.result).toBe(panelResult);

  // duplicate URI registration
  try {
    router.register(settingsRoute, settings);
  } catch (e) {
    expect(e.message).toBe(UriExistsErr);
  }

  // empty URI registration
  try {
    router.register('      ', settings);
  } catch (e) {
    expect(e.message).toBe(emptyUriErr);
  }

  // routing to unregistered route
  try {
    window.history.pushState({}, `Page Doesn't Exist`, `/page/doesnt/exist`);
    router.route();
  } catch (e) {
    expect(e.message).toBe(unregisteredRouteErr);
  }

  // routing to unregistered route
  try {
    window.history.pushState({}, `Page Doesn't Exist`, `/sitekey/;asd;lasdj`);
    router.route();
  } catch (e) {
    expect(e.message).toBe(unregisteredRouteErr);
  }
});
