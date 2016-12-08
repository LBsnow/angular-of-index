/**
 * Created by pdog on 2016/11/28.
 */
/*

由于angular的异步请求对象不支持自定义回调函数名
    angular的随机分配的回调函数名称不被豆瓣支持
*/



(function (angular) {
    var http = angular.module("movie.services.http",[]);
    http.service("HttpService",['$document','$window',function ($document,$window) {
        this.jsonp = function (url, data, callback) {
            // 第一个参数是请求的地址，第二是path，第三是请求数据后的回调函数

            // 第一先挂载回调函数
            var funHou = Math.random().toString().replace(".","");
            var cbFunName='my_json_cb_'+funHou;



            // 第二步先将参数转化成url字符串的形式
            var queryString = url.indexOf("?")==-1 ? "?":"&";
            for (var key in data){
                queryString+= key+"="+data[key]+"&";
            }


            // 第三处理url的回调函数
            queryString+='callback='+cbFunName;


            // 第四创建script的标签
            var scriptElement = $document[0].createElement("script");
            scriptElement.src = url+queryString;
            $window[cbFunName]=function (data) {
                callback(data);
                $document[0].body.removeChild(scriptElement);

            };


            // 第五把标签添加到文档
            $document[0].body.appendChild(scriptElement);

        }



    }])



})(angular)