var express = require('express');
var router = express.Router();
var User = require('../scripts/model/model').User;

/* GET users listing. */
router.get('/', function(req, res) {

    User.find(function(err, users) {
        if (err)
            res.send(err)
        res.json(users); // return all todos in JSON format
    });
});

/* post users Add or Update Operations. */
router.post('/', function(req, res, next) {

    var now = new Date();
    var user = new User({
        "id": req.body.id,
        "name": req.body.name,
        "lastname": req.body.lastname,
        "email": req.body.email,
        "password": req.body.password,
        //"age": req.body.age,
        "sex": req.body.sex,
        "role": req.body.role,
        "created_at": now,
        "updated_at": now

    });
    //console.log(user)
    if (req.body._id != null) {
       user._id = req.body._id;
       //user.delete
       console.log("user is "+req.body._id)
      
        User.findOneAndUpdate({_id: req.body._id}, {
                $set: {
                    "name": req.body.name,
                    "lastname": req.body.lastname,
                    "email": req.body.email,
                    "password": req.body.password,
                    //"age": req.body.age,
                    "sex": req.body.sex,
                    "role": req.body.role,
                    "updated_at": now
                }
            },
            function(err) {
                if (!err) {
                    return console.log("created");
                } else {
                    user = {};
                    return console.log(err);
                }
            }); //set id to use same method for update
    } else {
        user.save(function(err) {
            if (!err) {
                return console.log("created");
            } else {
                return console.log(err);
                user = {};
            }
        });
    }

    return res.send(user);
});

router.delete('/:id', function(req, res, next) {
    return User.findById(req.params.id, function (err, user) {
	  	console.log(req.params.id+"  User exists "+user);
	  	if(user!=null){
	    return User.remove(user, function (err) { //TODO Revisit code, There are better ways to remove
	      if (!err) {
	        return res.send({"Success":true});
	      } else {
	        	console.log(err);
	       		res.status(err.status || 500).json(err);
				return res.send("Unable to Remove User");
	        
	      }
	    });
		} else {
				res.status(400);
				return res.send("{ 'error': 'User not found'}");
				}
	  });

});

module.exports = router;
