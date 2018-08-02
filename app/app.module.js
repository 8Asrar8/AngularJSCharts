import angular from 'angular';
import uirouter from 'angular-ui-router';
import example from './example/example.module';
import bootstrap from 'angular-ui-bootstrap';

require('./main.scss');
angular.module('app', [
  uirouter,
  bootstrap,
  'example'
]);
