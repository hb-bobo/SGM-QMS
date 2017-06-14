var http=require("http"),
    fs=require("fs");
var qs = require('querystring');

var server=http.createServer(function(req,res){

    if (req.url=='/getData' && req.method.toUpperCase() == 'POST') {
        var postData = "";
        /**
         * 因为post方式的数据不太一样可能很庞大复杂，
         * 所以要添加监听来获取传递的数据
         * 也可写作 req.on("data",function(data){});
         */
        req.addListener("data", function (data) {
            postData += data;
        });
        /**
         * 这个是如果数据读取完毕就会执行的监听方法
         */
        req.addListener("end", function () {
            // 拿body的参数
            var query = qs.parse(postData);
            var reqData = JSON.parse(postData);
            var fileName = reqData.path;
            var filePath = "./src/" + fileName;
            res.writeHead(200,{"Content-Type":'text/plain'});
            fs.exists(filePath, function(exists){
                // 判断文件是否存在
                if (exists) {
                     fs.readFile(filePath, 'utf8', function(err,data){
                        console.log((new Date()).toLocaleString() + "返回了(backFile): " + fileName);
                        res.write(data);
                        res.end();
                    })  
                } else {
                    console.log('waring: ' + reqData.path + ' not exist')
                }
            })
                     
        });
    }
});
server.listen(8083,function(){
    console.log("server listening at http://localhost:8083")
})

