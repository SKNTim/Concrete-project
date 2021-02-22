// use express method
var express = require('express');
var app = express();
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'data'
});


// create ejs
var engine = require('ejs-locals');
app.engine('ejs',engine);
app.set('files','./files');
app.set('view engine','ejs');



// create object
var data = "";

// check running enviroment
var port = process.env.PORT || 3000;

// create
app.listen(port);

// only print hint link for local enviroment 
if(port === 3000){
  console.log('RUN http://localhost:3000/')
}



//index page
app.get('/', function(req, res){
  var uid = "";
  var uid = req.query.UID;
  var inside_diameter = "";
  var inside_diameter = req.query.Inside_diameter;
  var length = "ㄛ";
  var length = req.query.Length;
  var thickness = "";
  var thickness = req.query.Thickness;
  var filter = "";
  var Today=new Date();
  var localdate = Today.getFullYear()+"_"+(Today.getMonth()+1) +"_"+Today.getDate()+"_"+Today.getHours()+"_"+Today.getMinutes();
  /*connection.query('select * into outfile "D:/project/downloadfile/?.xls" from specification',localdate, function(err, rows) {
    console.log(localdate);
  });*/
  if (uid) {
    filter = 'WHERE UID = ?';
    connection.query('SELECT * FROM specification '+ filter,uid, function(err, rows) {
      if (err) throw err;
       data = rows;
      console.log('1');
      res.render('index',{data: data, uid: uid});
    });
  }
  else if (inside_diameter) {
    filter = 'WHERE Inside_diameter = ?';
    connection.query('SELECT * FROM specification '+ filter,inside_diameter, function(err, rows) {
      if (err) throw err;
       data = rows;
       console.log('2');
       res.render('index',{data: data, uid: uid});
    });
  }
  else if (length) {
    filter = 'WHERE Length = ?';
    connection.query('SELECT * FROM specification '+ filter,length, function(err, rows) {
      if (err) throw err;
       data = rows;
       console.log('3');
       res.render('index',{data: data, uid: uid});
    });
  }
  else if (thickness) {
    filter = 'WHERE Thickness = ?';
    connection.query('SELECT * FROM specification '+ filter,thickness, function(err, rows) {
      if (err) throw err;
       data = rows;
       console.log('4');
       res.render('index',{data: data, uid: uid});
    });
  }
  //console.log(uid);
  else{
  connection.query('SELECT * FROM specification ', function(err, rows) {
    //if (err) throw err;
     data = rows;
     console.log("hell1 => ", data[0].Inside_diameter)
     res.render('index',{data: data, uid: uid});
    //  console.log('5');
  });
}
});



//datarange page
app.get('/datarange', function(req, res){

 
  connection.query('SELECT * FROM data_range ', function(err, rows) {
    //if (err) throw err;
     datarange = rows;
     //console.log(datarange)
     res.json({datarange: datarange});
    //  console.log('5');
  });
});


//add page
app.get('/add', function(req, res, next) {
  //console.log("hell1 => ", data)
  res.render('add');

});


app.post('/add', function(req, res, next) {
  console.log(req.body);
 
  var sql = {
      UID: req.body.UID,
      Inside_diameter: req.body.Inside_diameter,
      Length: req.body.Length,
      Thickness: req.body.Thickness,
      Outer_diameter: req.body.Outer_diameter,
      Material: req.body.Material,
      Steel_ring_material: req.body.Steel_ring_material,
      Steel_ring_type: req.body.Steel_ring_type,
      date: req.body.date,
      update_date: req.body.update_date
  };

  //console.log(sql);
  var qur = connection.query('INSERT INTO specification SET ?', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

// edit page
app.get('/edit', function(req, res, next) {

  var uid = req.query.UID;
  var data = "";
  connection.query('SELECT * FROM specification WHERE UID = ?', uid, function(err, rows) {
      if (err) {
          console.log(err);
      }

      var data = rows;
      res.render('edit', { data: data });
  });

});


app.post('/edit', function(req, res, next) {

  var uid = req.body.UID;
  var sql = {
    Inside_diameter: req.body.Inside_diameter,
    Length: req.body.Length,
    Thickness: req.body.Thickness,
    Outer_diameter: req.body.Outer_diameter,
    Material: req.body.Material,
    Steel_ring_material: req.body.Steel_ring_material,
    Steel_ring_type: req.body.Steel_ring_type,
    update_date: req.body.update_date
};
console.log(req);
  var qur = connection.query('UPDATE specification SET ? WHERE UID = ?', [sql, uid], function(err, rows) {
      if (err) {
          console.log(err);
      }
     //console.log(qur);

      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});


//delete page
app.get('/delete', function(req, res, next) {

  var uid = req.query.UID;

  var qur = connection.query('DELETE FROM specification WHERE UID = ?', uid, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.redirect('/');
  });
});


//reg page
app.get('/reg', function(req, res, next) {

  
  res.render('reg');
});


app.post('/reg', function(req, res, next) {
  console.log(req.body);
 
  var sql = {
      user_name: req.body.user_name,
      user_password: req.body.user_password
  };

  console.log(sql);
  var qur = connection.query('INSERT INTO user_data SET ?', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

//adddefault page
app.get('/adddefault', function(req, res, next) {
  //console.log("hell1 => ", data)
  res.render('adddefault');

});


app.post('/adddefault', function(req, res, next) {
  console.log(req.body);
 
  var sql = {
      Inside_diameter: req.body.Inside_diameter,
      Inside_diameter_positive: req.body.	Inside_diameter_positive,
      Inside_diameter_negative: req.body.Inside_diameter_negative,
      Length: req.body.Length,
      Length_positive: req.body.Length_positive,
      Length_negative: req.body.Length_negative,
      Thickness: req.body.Thickness,
      Thickness_positive: req.body.Thickness_positive,
      Thickness_negative: req.body.Thickness_negative,
      Outer_diameter: req.body.Outer_diameter,
      Outer_diameter_positive: req.body.Outer_diameter_positive,
      Outer_diameter_negative: req.body.Outer_diameter_negative  
  };

  //console.log(sql);
  var qur = connection.query('INSERT INTO data_range SET ? ', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});


//defaultdata page
app.get('/defaultdata', function(req, res){
  var Inside_diameter = "";
  Inside_diameter = req.query.Inside_diameter;

  connection.query('SELECT * FROM data_range', function(err, rows) {
    if (err) throw err;
     data = rows;
     console.log("hell1 => ", data[0].Inside_diameter)
     res.render('defaultdata',{data: data});
    //  console.log('5');
  });
  
});







