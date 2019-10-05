import express from "express";
import bodyParser from "body-parser";
import lusca from "lusca";

// Controllers (route handlers)
import { router as userRoute } from "./routes/user.routes";


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", " x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method == "OPTIONS") {
    res.json({"error": undefined});
  } else {
    next();
  }
});
app.use((req, res, next): void => {
  console.log("body, query", req.body, req.query);
  next();
});



app.use("/probe", (req, res): void => {
  res.status(200).json({message: "success", data: {}, error: false});
});

/**
 * Primary app routes.
 */

app.use("/user", userRoute);

// 404 error
app.use((req, res) => {
  const err = new Error("Not Found");
  res.status(404);
  res.json({"error": true});
});

export default app;
