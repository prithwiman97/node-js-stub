exports.showFormGET = async (req, res) => {
    res.render("home", {
        data: req.query,
        method: req.method
    });
}

exports.showFormPOST = async (req, res) => {
    res.render("home", {
        data: req.body,
        method: req.method,
    });
}