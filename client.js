angular.module('calculatorApp', []);

angular.module('calculatorApp').controller('MainController', function($scope){

    $scope.firstRow = ['C', '='],
    $scope.secondRow = ['+', '-', '*', '/'];
    $scope.thirdRow = [5, 6, 7, 8, 9];
    $scope.fourthRow = [0, 1, 2, 3, 4];

    $scope.calcDisplay = '0';

    $scope.calculationLog = [];

    var pointInEquation; //values are 'empty', 'firstNumber', 'operator', 'secondNumber', 'complete'

    $scope.logClick = function(value) {

          function operatorClicked(operator) {
              if (pointInEquation === 'firstNumber') {
                  $scope.calcDisplay = $scope.calcDisplay + operator;
                  pointInEquation = 'operator';
              } else {
                  console.log('It\'s not a good time for operations');
              }
          };

          if ($scope.calcDisplay === '0' || value === 'C' || pointInEquation === 'complete') {
              $scope.calcDisplay = '';
              pointInEquation = 'empty';
          }

          if (typeof value === 'number' && pointInEquation === 'operator') {
              $scope.calcDisplay = $scope.calcDisplay + value.toString();
              pointInEquation = 'secondNumber';
          } else if (typeof value === 'number' && pointInEquation === 'empty') {
              $scope.calcDisplay = $scope.calcDisplay + value.toString();
              pointInEquation = 'firstNumber';
          } else if (typeof value === 'number') {
              $scope.calcDisplay = $scope.calcDisplay + value.toString();
          }

          if (value === '+') {
            operatorClicked('+');
          }

          if (value === '-') {
            operatorClicked('-');
          }

          if (value === '*') {
            operatorClicked('*');
          }

          if (value === '/') {
            operatorClicked('/');
          }

          if (value === '=' && pointInEquation === 'secondNumber') {
            $scope.calcDisplay = $scope.calcDisplay + '=' + eval($scope.calcDisplay);
            $scope.calculationLog.unshift($scope.calcDisplay);
            pointInEquation = 'complete';
          } else if (value === '=') {
            console.log('Please complete equation');
          }

          console.log(pointInEquation);

    }

})
