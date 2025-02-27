const express = require("express");
const app = express();
const router = require("./routes/");

const port = 3000;

app.use("/", router);

app.listen(process.env.PORT || port, () => {
    console.log(`Web server is listening at ${process.env.PORT || port}`);
});