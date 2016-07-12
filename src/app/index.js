/* eslint import/no-unresolved: [2, { ignore: ['\main$'] }] */
import '../styl/main';

import React from 'react';
import ReactDOM from 'react-dom';

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <h1>Webpack Boilerplate</h1>
    , document.getElementById('react-root'));
}
