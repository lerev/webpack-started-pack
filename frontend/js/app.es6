'use strict';

import '../css/bootstrap.css';
import '../css/app.scss';

import {login} from './login';

login('admin', '111');

console.log('App lo');
console.log($('h1').text());