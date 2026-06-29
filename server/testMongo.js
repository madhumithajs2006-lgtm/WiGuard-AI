const mongoose = require("mongoose");

const uri = "mongodb+srv://madhumithajs2006_db_user:<ltEHCAv46Y1MAALH>@wiguardcluster.qvvxpb9.mongodb.net/?appName=WiGuardCluster";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Failed");
    console.log(err);
    process.exit(1);
  });
