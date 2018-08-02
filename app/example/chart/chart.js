import chartHtml from './chart.html';
//this is a directive for the chart.
export default function(){
  return {
	restrict: 'AEC',
    template: chartHtml,
    scope: {
      title: '@',
      data: '@'
    },
	controller: ['$scope', '$element', '$attrs',
      //setting chart properties
	  function($scope, $element, $attrs) {
        $scope.chartConfig = {
          'chart': {
            'height': 500,
            'width': 800,
            'type': 'line'
          },
          'series': {},
          'title': {
            'text': 'Chart'
          }
        };
		//this is to setup the chart title (bcoz everytime we create a chart the title will be chart and then number of chart).
		$scope.$watch('title', function(newValue) {
          $scope.chartConfig.title.text = newValue;
        }, true);
		
		//this is to also setup the chart data.
		$scope.$watch('data', function(newValue) {
          var data = JSON.parse(newValue);
          $scope.chartConfig.series = new Object();
          for(var index in data) { 
            if (data[index].show) {
              $scope.chartConfig.series[index] = data[index];
            }
          }
        }, true);
	  }
    ]
  };
}
