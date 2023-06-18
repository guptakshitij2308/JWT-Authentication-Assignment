const mongoose = require("mongoose");

const app = require("./app");

mongoose
  .connect(
    "mongodb+srv://kshitijg:ZSaJgm2MWxyf3y5V@cluster0.1pqxmtj.mongodb.net/ToDo?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log("errorrrrrrrrrrrrr");
    console.log(err);
  });

const port = 3000;

const server = app.listen(port, () =>
  console.log("Server running on port 3000")
);

// kshitijg
// zcvYqSCbbZyNCqca
