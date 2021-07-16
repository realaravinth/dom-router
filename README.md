<div align="center">
<h1>
  DOM Router
</h1>
<p>
  <strong>Light weight, pure vanilla JavaScript based router for the DOM</strong>
</p>

[![Documentation](https://img.shields.io/badge/docs-master-blue)](https://realaravinth.github.io/dom-router/)
[![Build](https://github.com/realaravinth/dom-router/actions/workflows/build.yml/badge.svg)](https://github.com/realaravinth/dom-router/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/realaravinth/dom-router/branch/master/graph/badge.svg)](https://codecov.io/gh/realaravinth/dom-router)

</div>

## Example

```typescript
import Router from 'dom-router';

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

- see [mCaptcha/mCaptcha](https://github.com/mCaptcha/mCaptcha)
