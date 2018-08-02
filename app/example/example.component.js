const axios = require('axios');
import exampleHtml from './example.html';
import exampleService from './example.service';

//class of each data category to be represented in the charts (temperature, humibidty, and pressure)
class weatherModel {
  constructor() {
    this.temp = {
      name: "Temperature",
      id: 's1',
      data: [],
      type: 'line',
      color: '#ccc',
      show: false
    };
    this.humidity = {
      name: "Humidity",
      id: 's3',
      data: [],
      type: 'line',
      color: '#ccc',
      show: false
    };
    this.pressure = {
      name: "Pressure",
      id: 's2',
      data: [],
      type: 'line',
      color: '#ccc',
      show: false
    };
  }
}

/* @ngInject */
let exampleComponent = {
  template: exampleHtml,
  controllerAs: 'example',
  controller: ['$scope', 'exampleService',
    function($scope, exampleService) {
      let vm = this;
      getData();
      vm.weatherData = null;
	  
	  //setting and initializing 
	  vm.title = exampleService.title();
      vm.editorMode = false;
      vm.weather = new weatherModel;
      vm.chartList = [];
      vm.chartTitle = "Default chart";

	  //setting minimum date for calendar
      vm.calendarOtions = {
        minDate: new Date(),
        showWeeks: true
      };
	  
	  //setting up the calendar for date format and other properties
	  vm.datepickerOptions = {
        format: 'dd-MMMM-yyyy',
        date: new Date(),
        popupOpened: false,
        dateOptions: {
          formatYear: 'yy',
          maxDate: new Date(2020, 5, 22),
          minDate: new Date(),
          startingDay: 1
        }
      }
	  
	  //this function is to add a new chart to the chart list, and initializing weatherData for it.
	  vm.addChart = function() {
        const chartId = vm.chartList.length + 1;

        vm.editorMode = true;
        vm.chartList.push({
          id: chartId,
          label: `Chart ${chartId}`,
          data: {}
        });
        vm.chartTitle = `Chart ${chartId}`;
        vm.weather = new weatherModel;
        getWeather();
      }
	  
	  //-----------------------------------
	  vm.onMenuClick = function(e, chart) {
        e.preventDefault();
        vm.chartTitle = `Chart ${chart.id}`;
        vm.weather = vm.setWeatherData(chart.data);
      }
	  
	  //this onChange of the visibility of the element (temp, humidity, pressure) once it is selected to be added then it changes to shown.
	  vm.onVisibilityChange = function(element) {
        return !element.show;
      }
	  
	  //once the user clicks the Save button editing mode is closed, and data is set for the chart.
	  vm.saveChart = function() {
        vm.editorMode = false;
        vm.chartList[vm.chartList.length - 1].data = vm.weather;
      }
	  
	  //function to set the data from JSON file.
	  vm.setWeatherData = function(data) {
        return JSON.parse(JSON.stringify(data));
      }
	  
	  //function to show the calendar popup once it's clicked.
	  vm.openPopup = function() {
        vm.datepickerOptions.popupOpened = true;
      }
	  
	  //once the date is picked, random data is generated for the data (temp, humidity, pressure)
	  $scope.$watch('example.datepickerOptions.date', function(newValue) {
        let data = vm.weatherData;
        if (data) {
          data.list.forEach(element => {
            element.main.temp = Math.random(50);
			element.main.humidity = Math.random(50);
            element.main.pressure = Math.random(50);
          });

          vm.setWeatherList();

          vm.weather.temp.data = [];
		  vm.weather.humidity.data = [];
          vm.weather.pressure.data = [];
          getWeather();          
        }
      }, true);
	  
	  //setWeatherList: cleans and emptys chartList. This is used once the date is changed and new data is generated.
	  //then it pushes new data to the chartlist.
	  
	  //cleaning old data.
      vm.setWeatherList = function() {        
        let data = vm.weatherData;

        vm.chartList.forEach((chart) => {
          chart.data.temp.data = [];
          chart.data.pressure.data = [];
          chart.data.humidity.data = [];
        });
		
		//to push the random data in the chartlist
        vm.chartList.forEach((chart) => {
          data.list.forEach(element => {
            chart.data.temp.data.push(element.main.temp);
            chart.data.pressure.data.push(element.main.pressure);
            chart.data.humidity.data.push(element.main.humidity);
          });
        });
		
	}
	
	//this function pushes the data to its category (temp, humidity, pressure)
    function getWeather() {
        let data = vm.weatherData;
        data.list.forEach(element => {
          vm.weather.temp.data.push(element.main.temp);
          vm.weather.pressure.data.push(element.main.pressure);
          vm.weather.humidity.data.push(element.main.humidity);
        });
      }
	  
	  //getting data from public data API (not used anymore)
      function getData() {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=0b299052f8e76479be0f8ec49e9a93c7')
        .then(response => {
          vm.weatherData = response.data;
        })
        .catch(e => {
          console.log(e);
        });
      }
	}
  ]
}
export default exampleComponent;
