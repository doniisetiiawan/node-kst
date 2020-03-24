function render(req, res) {
  res.send({
    title: 'Hello World',
    userFullName: req.user ? req.user.fullName : '',
  });
}

export default render;
