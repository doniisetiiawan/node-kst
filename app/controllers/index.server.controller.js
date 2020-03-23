function render(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.send({
    title: 'Hello World',
  });
}

export default render;
