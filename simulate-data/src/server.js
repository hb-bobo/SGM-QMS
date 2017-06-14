var http=require("http"),
    fs=require("fs"),
    path=require("path"),
    mime=require('mime'),
    cache={};
     // chatServer=require("./lib/chatServer"),
var qs = require('querystring');
function send404(response){
    response.writeHead(404,{"Content-Type":'text/plain'});
    response.write("Error 404:resource not found");
    response.end();
}
function sendFile(res,filePath,fileContents){
    res.writeHead(
        200,
        {"Content-Type":mime.lookup(path.basename(filePath))}
    );
    res.end(fileContents);
}
function serveStatic(res,cache,absPath){
    //文件是否在缓存中
    if(cache[absPath]){
        sendFile(res,absPath,cache[absPath]);
    }else{
        //检查文件是否存在
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){

                    }else{
                        cache[absPath]=data;
                        sendFile(res,absPath,data);
                    }
                })
            }else{
                //send404(res);
                var notFoundPath='./src/404.html';
                fs.readFile(notFoundPath,function(err,data){
                        sendFile(res,notFoundPath,data);
                })
            }
        });
    }
}
var server=http.createServer(function(req,res){

    var filePath=false;
    if(req.url=='/'){
        filePath='src/index.html';
    }else{
        filePath='src/'+req.url;
    }
    if (req.url=='/getdata' && req.method.toUpperCase() == 'POST') {
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
            var data = ''
            absPath = "./" + reqData.path;
            res.writeHead(200,{"Content-Type":'text/plain'});
            fs.exists(absPath, function(exists){
                // 判断文件是否存在
                if (exists) {
                    fs.readFile(absPath, 'utf8', function(err,data){
                        res.write(data);
                        res.end();
                    }) 
                } else {
                    console.log(reqData.path + ' not exist')
                }
            })
                       
        });
    }
    var absPath='./'+filePath;

    // serveStatic(res,cache,absPath);
});
server.listen(8083,function(){
    console.log("server listening at http://localhost:8083")
})
//chatServer.listen(server);
