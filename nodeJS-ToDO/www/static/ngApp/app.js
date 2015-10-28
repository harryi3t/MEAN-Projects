'use strict';
var www = angular.module('www', ['ngRoute','xeditable']);

www.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});

www.controller('homeCtrl', function ($scope,$http) {
  
  $http.get('/api/todos')
    .success(function (data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function (data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    $http.post('/api/todos', $scope.formData)
      .success(function (data) {
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.todos = data;
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http.delete('/api/todos/' + id)
      .success(function (data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.glyphicon_remove_hover = false;
  $scope.glyphicon_ok_hover = false;
  $scope.glyphicon_pencil_hover = false;

  $scope.glyphicon_remove_class = function () {
    return 'glyphicon glyphicon-remove-circle'
  };

  $scope.glyphicon_remove_hover_class = function () {
    return 'glyphicon-remove-hover glyphicon glyphicon-remove-circle'
  };

  $scope.glyphicon_pencil_class = function () {
    return 'glyphicon glyphicon-pencil'
  };

  $scope.glyphicon_pencil_hover_class = function () {
    return 'glyphicon-pencil-hover glyphicon glyphicon-pencil'
  };
  
  $scope.glyphicon_ok_class = function () {
    return 'glyphicon glyphicon-ok-circle'
  };

  $scope.glyphicon_ok_hover_class = function () {
    return 'glyphicon-ok-hover glyphicon glyphicon-ok-circle'
  };


});

// www.config(['$routeProvider', '$locationProvider',
//   function ($routeProvider, $locationProvider) {

//     var path = 'ngApp/scripts/';
//     $routeProvider
//       .when('/', {
//         templateUrl: path + 'home/home.html',
//         controller: 'homeCtrl'
//       })
//       .when('/index', {
//         templateUrl: path + 'home/index.html',
//         controller: 'homeCtrl2'
//       });
//     //$locationProvider.html5Mode(true);
//   }
// ]);