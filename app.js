import express from "express";
import cheerio from "cheerio";
import mongoose from "mongoose";
import path from "path";
import "dotenv/config";
import cors from "cors";
const app = express();
import fetch from "node-fetch";
import { writeFile } from "fs";

const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    data: Object,
  },
  { timestamps: true }
);

const myData = mongoose.model("myData", dataSchema);

mongoose.connect(
  process.env.mongoURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return err;
    app.listen(process.env.PORT || 3000, () => {
      console.log("started listenig at port ");
    });
  }
);
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.static("./public"));

app.post("/api/v1/postimage", (req, res) => {
  const toWrite = req.body.url.replace(/^data:image\/jpeg;base64,/, "");
  writeFile("election.jpeg", Buffer.from(toWrite, "base64"), function (err) {
    if (err) return console.log(err);
    res.send("heh");
  });
});

const __dirname = path.resolve();
app.get("/api/v1/image", (req, res) => {
  res.sendFile(path.join(__dirname, "election.jpeg"));
});

app.get("/api/v1/data", async (req, res) => {
  myData.find({}).exec((err, data) => {
    res.send(data);
  });
});
