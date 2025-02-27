const bestRoute = (req, res) => {
    res.send("Hello Best!");
};

const hannaRoute = (req, res) => {
    res.send("Hello Hannah!");
};

const sarahRoute = (req, res) => {
    res.send("Hello Sarah!");
};


module.exports = { bestRoute, hannaRoute, sarahRoute };