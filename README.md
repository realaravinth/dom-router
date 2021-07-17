<div align="center">
<h1>
  DOM Router
</h1>
<p>
  <strong>Lightweight, pure vanilla JavaScript based router for the DOM</strong>
</p>

[![Documentation](https://img.shields.io/badge/docs-master-blue)](https://realaravinth.github.io/dom-router/)
[![Build](https://github.com/realaravinth/dom-router/actions/workflows/build.yml/badge.svg)](https://github.com/realaravinth/dom-router/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/realaravinth/dom-router/branch/master/graph/badge.svg)](https://codecov.io/gh/realaravinth/dom-router)

</div>

When bundling and shipping Vanilla JavaScript, often we
require only specific modules to be specific pages. This could mean
registering event handlers, times, basically everything that would panic
when run in other pages.

DOM Router supports matching modules(functions, more specifically)
against routes. It requires a route(either a string or a regular
expression in string form) and a bootstrapping function.

The bootstrapping function could initialize timers, register event
handlers and perform page specific operations.

## Route

- Only exact matches are accepted.
  For example, if `/foo` is registered,
  only http://example.com/foo and not http://example.com/foo/bar

- Routes are normalized by removing trailing slash.
  So `/foo` is the same as `/foo/`

- Sometimes routes will have variable fields. These
  cases can be represented with a regular expression rule.
  For example, Reddit's subreddit
  route, `www.reddit.com/r/<subreddit-name>`), can be matched with
  `/r/[A-Z,a-z,0-9]+/`(assuming subreddit names are alphanumerical)

## Bootstrapping function

This function will get executed when `window.location.pathname` matches
the any one of the registered routes. Generally, this function should be
used to set up register handlers, initialize timers, etc.

## Example

```typescript
import Router from 'dom-router';

// Initialize router
const router = new Router();

const settingsRoute = '/settings';
const profileRoute = '/r/[A-Z,a-z,0-9]+/';

const settings = () => {
  let form = document.getElementById('form');
  const submit = () => {
    alert('Settings updated');
  };
  form.addEbentListener('submit', submit, true);
};

const profile = () => {
  let form = document.getElementById('form');
  const submit = () => {
    alert('profile updated');
  };
  form.addEbentListener('submit', submit, true);
};

router.register(settingsRoute, settings);
router.register(profileRoute, profile);

try {
  router.router();
} catch (e) {
  console.log(e);
}
```

## In the wild

- see [mCaptcha/mCaptcha](https://github.com/mCaptcha/mCaptcha)
