const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const usersList = [];

for (let i = 0; i < 10; i++) {
  usersList.push({
    id: i,
    name: `User ${i}`,
    email: `Email${i}@gmail.com`,
  });
}

app.get("/", function (req, res) {
  res.send("Hello World - Serveur Api");
});

// get all users
app.get("/users", function (req, res) {
  res.json({
    data: usersList,
  });
});

// get user by id
app.get("/users/:id", function (req, res) {
  const id = req.params.id;
  const user = usersList.find((user) => user.id === Number(id));
  res.json({
    data: user,
  });
});

// create user
app.post("/users", function (req, res) {
  const data = req.body;
  const dataId = { ...data, id };
  usersList.push(dataId);
  res.json({
    index: usersList.length,
    data: dataId,
  });
});

// update user by id
app.put("/users/:id", function (req, res) {
  const id = req.params.id;
  const userIndex = usersList.findIndex((user) => user.id === Number(id));
  if (userIndex !== -1) {
    usersList[userIndex] = req.body;
    res.json({
      message: "User updated successfully",
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

// delete user by id
app.delete("/users/:id", function (req, res) {
  const id = req.params.id;
  const userIndex = usersList.findIndex((user) => user.id === Number(id));
  if (userIndex !== -1) {
    usersList.splice(userIndex, 1);
    res.json({
      message: "User deleted successfully",
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
