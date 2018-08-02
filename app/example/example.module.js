import angular from 'angular';
import routing from './example.route';
import example from './example.component';
import chart from './chart/chart';
import service from './example.service';
import bootstrap from 'angular-ui-bootstrap';
import highchartsNg from 'highcharts-ng';
/* @ngInject */
angular
  .module('example', [
    bootstrap, 
    highchartsNg
  ])
  .directive('chart', chart)
  .component('example', example)
  .factory('exampleService', service)
  .config(routing);
