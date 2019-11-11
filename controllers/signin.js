const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(async data => {
      const isValid = await bcrypt.compare(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("Unable to get the user!"));
      } else {
        res.status(400).json("Wrong credentials!");
      }
    })
    .catch(err => res.status(400).json("Wrong credentials!"));
};

module.exports = {
  handleSignin
};
