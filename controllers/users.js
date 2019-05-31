module.exports = {
  info: {
    get: (req, res) => {
      res.send("GET /users/info OK!");
    }
  },
  signin: {
    post: (req, res) => {
      res.status(201).send(`POST /users/signin OK! body :: ${req.body}`);
    }
  },
  deleteaccount: {
    delete: (req, res) => {
      res
        .status(201)
        .send(`DELETEd /users/deleteaccount OK! body :: ${req.body}`);
    }
  },
  register: {
    post: (req, res) => {
      res.status(201).send("POST users/signup/register OK!");
    }
  },
  checkemail: {
    get: (req, res) => {
      res
        .status(201)
        .send(`GET users/signup/checkemail OK! body :: ${req.body}`);
    }
  },
  changeprofile: {
    update: (req, res) => {
      res.status(201).send("UPDATE users/changeprofile OK!");
    }
  },
  travellist: {
    get: (req, res) => {
      res.status(201).send("GET users/travellist OK!");
    }
  },
  orderlist: {
    get: (req, res) => {
      res.status(201).send("GET users/orderlist OK!");
    }
  },
  applylist: {
    get: (req, res) => {
      res.status(201).send("GET users/applylist OK!");
    }
  }
};
