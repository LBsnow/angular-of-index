
(function (angular) {
    'use strict';


    // 在创建子模块
    var module = angular.module('movie.movie_list', ['ngRoute','movie.services.http'])

    // 在创建子模块的路由
        module.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/:category/:page', {
                templateUrl: 'movie_list/view.html',
                controller: 'MovieListController'
            });
        }])

    // 在创建子模块的控制器
        module.controller('MovieListController', ['$scope','$route','$routeParams','HttpService',function($scope,$route,$routeParams,HttpService) {
            var count = 10;  /*每一页的条数*/
            var page = parseInt($routeParams.page);  /*当前的页数*/
            var start = (page-1)*count;    /*当前页开始的数目*/



         // 在控制器里面重要是分为两步，第二是暴露数据，第二是暴露行为
            $scope.load=true;
            $scope.subjects = [];
            $scope.message='';
            $scope.title = 'Loading...';
            $scope.countTotal = 0;
            $scope.totalPages = 0;  /*总的页数*/
            $scope.currentPage = page;
            // 测试$http的请求
            HttpService.jsonp("http://api.douban.com/v2/movie/"+$routeParams.category,{start:start,count:count,q:$routeParams.q},function (data) {
                $scope.title = data.title;
                $scope.subjects = data.subjects;
                $scope.countTotal = data.total;
                $scope.totalPages = Math.ceil($scope.countTotal/count);
                $scope.load=false;
                // $apply就是让指定的表达式重新同步
                $scope.$apply();


                // 暴露行为
                $scope.go = function (page) {
                    // 当前传入第几页就跳转到第几页
                    if(page>=1 && page<=$scope.totalPages){
                        $route.updateParams({page:page})
                    }

                }



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
