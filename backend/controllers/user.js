exports.home = (req, res) => {
  res.status(200).json({ Message: "Hello from user" });
};
