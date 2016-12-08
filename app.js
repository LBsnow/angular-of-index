(function (angular) {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('movie', [
        'ngRoute',
        'movie.movie_detail',
        'movie.movie_list'
    ]).
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        /*$locationProvider.hashPrefix('!');*/

        $routeProvider.otherwise({redirectTo: '/in_theaters/1'})
    }]).controller('NavController',['$scope','$location',function ($scope,$location) {
        $scope.$location = $location;
        $scope.$watch('$location.path()',function (now) {
            if (now.startsWith('/in_theaters/')){
                $scope.type = 'in_theaters';
            }else if (now.startsWith('/coming_soon/')){
                $scope.type = 'coming_soon';
            }
            else if (now.startsWith('/top250/')){
                $scope.type = 'top250';
            }
        })
    }]).controller('SearchController',['$scope','$route',function ($scope,$route) {
        $scope.input = "";
        $scope.search = function () {
            $route.updateParams({category:'search',q:$scope.input})
        };



    }])
    ;






})(angular)
