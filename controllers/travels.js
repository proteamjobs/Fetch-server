const db = require("../models");
const passport = require("passport");

module.exports = {
  list: {
    get: async (req, res) => {
      try {
        let travel = {
          travelList: []
        };
        let list = await db.travels.findAll();
        list.map(item => {
          let temp = {
            travel_id: item.dataValues._id,
            destination: item.dataValues.destination,
            arrivingDate: item.dataValues.arrivalDate,
            traveler_id: item.dataValues.traveler_id
          };
          travel.travelList.push(temp);
        });

        for (let i = 0; i < travel.travelList.length; i++) {
          let user = await db.users.findOne({
            where: {
              _id: travel.travelList[i].traveler_id
            },
            attributes: ["name", "image"]
          });
          // console.log(user.dataValues);
          travel.travelList[i].travelerName = user.dataValues.name;
          travel.travelList[i].travelerImageUrl = user.dataValues.image;
        }

        travel.travelList.reverse();

        if (req.query.max) {
          travel.travelList = travel.travelList.splice(0, req.query.max);
          res.status(200).send(travel);
        } else {
          res.status(200).send(travel);
        }
      } catch (err) {
        console.log("ERROR ::: ", err);
        res.status(400).send(err);
      }
      // res.status(201).send("GET /travels/list OK!");
    }
  },
  detail: {
    get: async (req, res) => {
      try {
        let travelDetail = {};
        let list = await db.travels.findOne({
          where: {
            _id: req.query.travel_id
          }
        });
        let user = await db.users.findOne({
          where: {
            _id: list.traveler_id
          },
          attributes: ["_id", "name", "image"]
        });

        travelDetail.traveler_id = user.dataValues._id;
        travelDetail.travelerName = user.dataValues.name;
        travelDetail.travelerImageUrl = user.dataValues.image;
        travelDetail.destination = list.dataValues.destination;
        travelDetail.description = list.dataValues.description;
        travelDetail.arrivingDate = list.dataValues.arrivalDate;
        travelDetail.departingDate = list.dataValues.departureDate;

        res.status(200).send(travelDetail);
      } catch (err) {
        console.log("ERROR ::: ", err);
        res.status(400).send(err);
      }
      // res.status(201).send("GET /travels/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        // console.log(user);
        // console.log(req.body);
        db.travels
          .create({
            destination: req.body.destination,
            departureDate: req.body.departingDate,
            arrivalDate: req.body.arrivingDate,
            description: req.body.description,
            traveler_id: user.dataValues._id
          })
          .then(() => {
            res.status(201).send("POST /travels/create OK!");
          })
          .catch(err => {
            res.status(400).send(err);
            console.log("ERROR ::: ", err);
          });
      })(req, res);
      // console.log(req.headers.authorization);
    }
  }
};
