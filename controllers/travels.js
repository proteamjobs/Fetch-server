const db = require("../models");

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
          let name = await db.users.findOne({
            where: {
              _id: travel.travelList[i].traveler_id
            },
            attributes: ["name"]
          });
          // console.log(name.dataValues.name);
          travel.travelList[i].travelerName = name.dataValues.name;
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
    get: (req, res) => {
      res.status(201).send("GET /travels/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      res.status(201).send("POST /travels/create OK!");
    }
  }
};
