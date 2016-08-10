var express = require('express');
var router = express.Router();
var RapidTest = require('../scripts/model/model').RapidTest;

/* GET users listing. */
router.get('/', function(req, res) {
    RapidTest.find(function(err, rapidTest) {
        if (err){
            console.log("Error "+err);
            res.status(404);
            res.json({ "Error" : "No RapidTest found" })
        }
        res.json(rapidTest); // return all todos in JSON format
    });
});

/* post users Add or Update Operations. */
router.post('/', function(req, res, next) {

    var now = new Date();
    var rapidTest = new RapidTest({
        "id": req.body.id,
        "name": req.body.name,
        "owner": req.body.owner,
        "approver": req.body.approver,
        "brand":  req.body.brand,
        "market": req.body.market, 
        "division": req.body.division,
        "department":req.body.department,
        "class":req.body.class,
        "type": req.body.type,
        "details": req.body.details,
        "output":req.body.output,
        "secoutput":req.body.secoutput,
        "objective":req.body.objective,
        "stylecount":req.body.stylecount,
        "cc_count": req.body.cc_count,
        "retailvalue":req.body.retailvalue,
        "bizimpact":req.body.bizimpact,
        "testweeks":req.body.testweeks,
        "offerflowmonth": req.body.offerflowmonth,
        "startdate": req.body.startdate,
        "resultdate": req.body.resultdate,
        "status": req.body.status,
        "created_by": req.body.created_by,
        "created_at": now,
        "updated_at": now
    });
    if (req.body._id != null) {
       rapidTest._id = req.body._id;
       
        RapidTest.findOneAndUpdate({_id: req.body._id}, {
                $set: {
                    "name": req.body.name,
                    "owner": req.body.owner,
                    "approver": req.body.approver,
                    "brand":  req.body.brand,
                    "market": req.body.market, 
                    "division": req.body.division,
                    "department":req.body.department,
                    "class":req.body.class,
                    "type": req.body.type,
                    "details": req.body.details,
                    "output":req.body.output,
                    "secoutput":req.body.secoutput,
                    "objective":req.body.objective,
                    "stylecount":req.body.stylecount,
                    "cc_count": req.body.cc_count,
                    "retailvalue":req.body.retailvalue,
                    "bizimpact":req.body.bizimpact,
                    "testweeks":req.body.testweeks,
                    "offerflowmonth": req.body.offerflowmonth,
                    "startdate": req.body.startdate,
                    "resultdate": req.body.resultdate,
                    "status": req.body.status,
                    "created_by": req.body.created_by,
                    "created_at": now,
                    "updated_at": now
                }
            },
            function(err) {
                if (!err) {
                    return console.log("created");
                } else {
                    rapidTest = {};
                    return console.log(err);
                }
            }); //set id to use same method for update
    } else {
        rapidTest.save(function(err) {
            if (!err) {
                return console.log("created");
            } else {
                return console.log(err);
                rapidTest = {};
            }
        });
    }
    return res.send(rapidTest);
});

router.delete('/:id', function(req, res, next) {
    return RapidTest.findById(req.params.id, function (err, rapidTest) {
        console.log(req.params.id+"  RapidTest exists "+rapidTest);
        if(rapidTest!=null){
        return RapidTest.remove(rapidTest, function (err) { //TODO Revisit code, There are better ways to remove
          if (!err) {
            return res.send({"Success":true});
          } else {
                console.log(err);
                res.status(err.status || 500).json(err);
                return res.send("Unable to Remove RapidTest");
            
          }
        });
        } else {
                res.status(400);
                return res.send("{ 'error': 'RapidTest not found'}");
                }
      });

});


module.exports = router;
