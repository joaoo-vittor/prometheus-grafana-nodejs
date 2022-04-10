class ExampleRoute {
  index(req, res) {
    return res.status(200).json({ msg: "Hello World :)" });
  }
}

export default new ExampleRoute();
