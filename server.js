const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const JENKINS_URL = "http://localhost:8080/job/demo/lastBuild/api/json";

const auth = {
  username: "Sobika_Easwaramoorthy",
  password: "sobika@2006"
};

app.get('/api/build', async (req, res) => {
  try {
    const response = await axios.get(JENKINS_URL, { auth });
    const data = response.data;

    res.json({
      buildNumber: data.number,
      status: data.result || "RUNNING"
    });
  } catch (err) {
    console.log(err.message);

    res.json({
      buildNumber: "N/A",
      status: "ERROR"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});