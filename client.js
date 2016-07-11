//Angular!
angular.module('calculatorApp', []);

angular.module('calculatorApp').controller('MainController', function($scope){

    //to declare the buttons
    $scope.firstRow = ['C', '='],
    $scope.secondRow = ['+', '-', '*', '/'];
    $scope.thirdRow = [5, 6, 7, 8, 9];
    $scope.fourthRow = [0, 1, 2, 3, 4];

    //upon page load, the calcDisplay reads 0
    $scope.calcDisplay = '0';

    //initialize the array to store previous calculations
    $scope.calculationLog = [];

    //this will control whether an operator can be added to the equation, as well as when the equation can be evaluated
    var pointInEquation; //values are 'empty', 'firstNumber', 'operator', 'secondNumber', 'complete'

    //here's what happens when you click one of any of the buttons...
    $scope.logClick = function(value) {

          //this function will handle the operator buttons below
          function operatorClicked(operator) {
              //if there's one number (including those with multiple digits) in calcDisplay, an operator can be added
              if (pointInEquation === 'firstNumber') {
                  //show the operator after the first number on the calcDisplay
                  $scope.calcDisplay = $scope.calcDisplay + operator;
                  pointInEquation = 'operator';
              //in any of the other situations, adding an operator is prohibited
              } else {
                  alert('This calculator is enabled to compute equations with two values and one operator. This is the way it must be.');
                  console.log('It\'s not a good time for operations');
              }
          };

          //if the page just loaded and calcDisplay is still reading 0, or the C button was pushed, or = was just previously pushed
          if ($scope.calcDisplay === '0' || value === 'C' || pointInEquation === 'complete') {
              //clear whatever's on calcDisplay
              $scope.calcDisplay = '';
              //reset the pointInEquation
              pointInEquation = 'empty';
          }

          //if a number was clicked and the last button clicked was an operator
          if (typeof value === 'number' && pointInEquation === 'operator') {
              //display the number of the calcDisplay
              $scope.calcDisplay = $scope.calcDisplay + value.toString();
              //the pointInEquation is now secondNumber, because there has been a firstNumber and an operator
              pointInEquation = 'secondNumber';
          //if a number was clicked and calcDisplay is empty
          } else if (typeof value === 'number' && pointInEquation === 'empty') {
              //display the number on calcDisplay
              $scope.calcDisplay = $scope.calcDisplay + value.toString();
              //the pointInEquation is firstNumber
              pointInEquation = 'firstNumber';
          //if a number was clicked and any of the other conditions are true
          } else if (typeof value === 'number') {
              //display the number on calcDisplay
              $scope.calcDisplay = $scope.calcDisplay + value.toString();
          }

          //if a + was clicked, go through the operatorClicked function
          if (value === '+') {
            operatorClicked('+');
          }

          //if a - was clicked, go through the operatorClicked function
          if (value === '-') {
            operatorClicked('-');
          }

          //if a * was clicked, go through the operatorClicked function
          if (value === '*') {
            operatorClicked('*');
          }

          //if a / was clicked, go through the operatorClicked function
          if (value === '/') {
            operatorClicked('/');
          }

          //if = was clicked and two numbers, seperated by an operator, have been entered into calcDisplay
          if (value === '=' && pointInEquation === 'secondNumber') {
            //evaluate the equation and show its solution after the equation itself and an =
            $scope.calcDisplay = $scope.calcDisplay + '=' + eval($scope.calcDisplay);
            //save the equation with the solution as a string to the beginning of the calculationLog array
            $scope.calculationLog.unshift($scope.calcDisplay);
            //to prevent the addition of more numbers to calcDisplay before it's cleared
            pointInEquation = 'complete';
          //if = was clicked but the equation has not been completed, evaluation is prohibited  
          } else if (value === '=') {
            alert('This calculator is enabled to compute equations with two values and one operator. This is the way it must be.');
            console.log('Please complete equation');
          }

          console.log(pointInEquation);

    }

})
