const isOnline = require('is-online');

var uri = 'mongodb://<>:<>@ds111204.mlab.com:11204/internetconn'

var MongoClient = require('mongodb').MongoClient
MongoClient.connect(uri, function (err, db) {
  if (err) throw err;
  var computers = db.collection('computers');
  var seed = {name:"home mac", status:"online"}

  
	
	function onlineTime(){ 
		isOnline().then(online => {
			var arr=[];
		    var dateString = "";  
			var newDate = new Date();    
			dateString += (newDate.getMonth() + 1) + "/";  
			dateString += newDate.getDate() + "/";  
			dateString += newDate.getFullYear()+ " - "; 

			var hours = newDate.getHours()
			if(hours>12){
				hours=(hours-12)
				var mer = "PM"
			}else{
				
				var mer = "AM"
			}
			var minutes = newDate.getMinutes()
			if(minutes<10){
				minutes="0"+minutes
			}

			dateString += hours+":";
			dateString += minutes+mer;
		    if(online){
		    	console.log(online)
				console.log("POST : "+dateString+" - You are online")
				arr.push({date:dateString, status:online})
				arr.map((conn)=>{
					console.log("what", conn.status)
					  computers.insert({name:"will comp", time:conn.date, status:conn.status}, function(err, results){
					  	if (err) throw err
					  })
				})
				arr=[];	
		    }else{
		    	console.log(dateString+" - NOT ONLINE")
		    	arr.push({date:dateString, status:online})
		    }
		});
	}

	setInterval(onlineTime, 450000)
})


