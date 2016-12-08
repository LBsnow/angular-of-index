/**
 * Created by pdog on 2016/12/1.
 */

(function (angular) {
    'use strict';


    // 在创建子模块
    var module = angular.module('movie.movie_detail', ['ngRoute','movie.services.http'])

    // 在创建子模块的路由
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail/view.html',
            controller: 'MovieDetailController'
        });
    }]);

    // 在创建子模块的控制器
    module.controller('MovieDetailController', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
        $scope.movie = {};
        $scope.load = true;
        var id =$routeParams.id;
        var apiAddress = 'http://api.douban.com/v2/movie/subject/'+id;
        HttpService.jsonp(apiAddress,{},function (data) {
                $scope.movie = data;
                $scope.load = false;
                $scope.$apply();
        })

    }]);
})(angular);


/*$http.get('/app/theater.json').then(function (res) {
 // 这里的代码是在异步请求完成之后才会执行的代码
 // 这里直接用data是不行的，首先获取数据回来是在一个对象里面的，所以要用对象.数据才可以获取到信息的
 if(res.status==200){
 $scope.subjects = res.data.subjects
 }else {
 $scope.message = '获取数据错误';
 }
 },function (error) {
 console.log(error);
 $scope.message='获取数据错误';
 })*/
