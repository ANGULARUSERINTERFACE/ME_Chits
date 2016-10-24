var express         =         require("express");
var mysql           =         require("mysql");
var bodyParser           =         require("body-parser");
var app             =         express();

app.use(bodyParser());

/*
  * Configure MySQL parameters.
*/
var connection      =         mysql.createConnection({
	host        :         "localhost",
	user        :         "root",
	password    :         "",
	database     :         "me_chits"
});

connection.connect(function(error){
  if(error)
    {
      console.log("Problem with MySQL"+error);
    }
  else
    {
      console.log("Connected with Database");
    }
});

/*
  * Configure Express Server.
*/
app.use(express.static(__dirname + '/angular'));
app.use(express.static(__dirname + '/stylesheet'));
app.use(express.static(__dirname + '/scripts'));
/*
  * Define routing of the application.
*/
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/load',function(req,res){
  connection.query("SELECT * from group_master_table",function(err,rows){
    if(err)
      {
        console.log("Problem with MySQL"+err);
      }
      else
        {
          res.end(JSON.stringify(rows));
        }
  });
});

app.post('/delete',function(req,res){
	var groupID = req.body.GROUP_ID;
	connection.query("DELETE from group_master_table WHERE GROUP_ID='" + groupID + "'",function(err,rows){
		if(err) {
			console.log("Problem with MySQL"+err);
		}
		else {
			console.log('seccessfully Deleted');
		}
	});
	connection.query("SELECT * from group_master_table",function(err,rows){
		if(err) {
			console.log("Problem with MySQL"+err);
		}
		else {
		  res.end(JSON.stringify(rows));
		}
	});
});
app.post('/add',function(req,res){
	connection.query("INSERT INTO `me_chits`.`group_master_table` (`GROUP_ID`, `MEMBERS`, `AMOUNT`, `DUE_AMOUNT`, `COMMISSION`, `START_DATE`, `END_DATE`, `DUE_DATE`) VALUES ('" + req.body.GROUP_ID + "', '" + req.body.MEMBERS + "', '" + req.body.DUE_AMOUNT + "', '" + req.body.AMOUNT + "', '" + req.body.COMMISSION + "', '" + "2016-07-11" +  "', '2018-02-20', '" + req.body.DUE_DATE + "');",function(err,rows){
		if(err) {
			console.log("Problem with MySQL"+err);
		}
		else {
			console.log('seccessfully Added');
		}
	});
	connection.query("SELECT * from group_master_table",function(err,rows){
		if(err) {
			console.log("Problem with MySQL"+err);
		}
		else {
		  res.end(JSON.stringify(rows));
		}
	});
});
app.post('/edit',function(req,res){

	connection.query("UPDATE `me_chits`.`group_master_table` SET `group_master_table`.`GROUP_ID` = '" + req.body.GROUP_ID + "' , `MEMBERS` = '" + req.body.MEMBERS + "', `AMOUNT` = '" + req.body.AMOUNT + "', `DUE_AMOUNT` = '" + req.body.DUE_AMOUNT + "', `COMMISSION` = '" + req.body.COMMISSION + "', `START_DATE` = '" + req.body.START_DATE	+  "', `END_DATE` = '" + req.body.END_DATE + "', `DUE_DATE` = '" + req.body.END_DATE + "', `DUE_DATE` = '" + req.body.DUE_DATE	+  "' WHERE `group_master_table`.`GROUP_ID` = '" + req.body.originalID + "' LIMIT 1",function(err,rows){
		if(err) {
			console.log("Problem with MySQL"+err);
		}
		else {
			console.log('seccessfully Modified');
		}
	});
	connection.query("SELECT * from group_master_table",function(err,rows){
		if(err) {
			console.log("Problem with MySQL"+err);
		}
		else {
		  res.end(JSON.stringify(rows));
		}
	});
});
/*
  * Start the Express Web Server.
*/
app.listen(3000,function(){
  console.log("It's Started on PORT 3000");
});
