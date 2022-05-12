var http = require('http');
var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'node-mysql'
})

db.connect();

var app = http.createServer(function (request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/'){
        response.writeHead(200);
        response.end(`<table>
<tr>
<td>id<input type="text"></td>
</tr>
<tr>
<td>pw<input type="text"></td>
</tr>
<tr>
<td><input type="submit" value="login"><form action="/create"><input type="submit" value="create"></form></td>
</tr>
</table>`)
    }
    else if(pathName === '/create'){
        response.writeHead(200)
        response.end(`<p>Create</p>
<table>
<form action="create/process" method="post">
<tr>
<td>ID<input type="text" name="id"></td>
</tr>
<tr>
<td>PW<input type="text" name="pw"></td>
</tr>
<tr><td><input type="submit" value="create"></td></tr>
</form>
</table>`)
    }
    else if(pathName === '/create/process'){
        var body = '';

        request.on('data', function(data){
            body = body + data;
        });

        request.on('end', function(){
            var post = qs.parse(body);
            db.query("select * from userdata", function (error, userdata){
                for (i = 0; i < userdata.length; i++){
                    if(post.id === userdata[i].id){
                        response.writeHead(302, {Location: "/create"})
                        response.end(`<p>Create</p>
<table>
<form action="create/process" method="post">
<tr>
<td>ID<input type="text" name="id"></td>
</tr>
<tr>
<td>PW<input type="text" name="pw"></td>
</tr>
<tr><td><input type="submit" value="create"></td></tr>
</form>
</table><script>alert("This ID is already taken")</script>`)
                    }
                }
            })
        });
    }
})

app.listen(8000);