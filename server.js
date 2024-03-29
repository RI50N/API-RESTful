var express = require("express");
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var port = 8080;

app.listen(port);

var db = new mongodb.Db(
    'z',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/',function (req, res) {
  res.send({msg:'Olá'});
});

app.post('/api', function(req, res){
    var dados = req.body;

    db.open( function (err, mongoclient) {
        mongoclient.collection('postagens', function (err, collection) {
            collection.insert(dados, function (err, records) {
                if(err){
                    res.json({'status' : '0'});
                }else{
                    res.json({'status' : 'Inclusao realizada com sucesso'});
                }
                mongoclient.close();
            });
        });
    });
});
