const getAllUsers = (req, res, db) => {
  db.select("*")
    .from("users")
    .then(users => {
      if (users.length) {
        res.json(users);
      } else {
        res.status(400).json("Users not found!");
      }
    })
    .catch(err => res.status(400).json("Error getting the user!"));
};

module.exports = {
  getAllUsers
};
