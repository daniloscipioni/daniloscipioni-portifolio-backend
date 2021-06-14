const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
exports.verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Necessário uso de um token!' });

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // eslint-disable-next-line no-console
    // console.log(err);

    if (err) return res.status(403).json({ message: 'Token Expirado ou token inválido!' });

    req.userId = decoded.id;
    next();
  });
};

exports.jwtSignin = (id) => {
  // Token expira em 100 segundos
  const expiresIn = 100;
  const token = jwt.sign({ id }, process.env.SECRET, { expiresIn });

  return { token, expiresIn };
};
