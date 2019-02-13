exports.handle400 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes400 = {
    23505 /* <---- this is code in error object */: 'Not Found',
  };
  if (errorCodes400[code]) {
    res.status(400).send({ message: errorCodes400[code] });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes404 = {
    23505 /* <---- this is code in error object */: 'Bad Request',
  };
  if (errorCodes404[code]) {
    res.status(404).send({ message: errorCodes404[code] });
  } else next(err);
};

exports.handle405 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes405 = {
    23505 /* <---- this is code in error object */: 'Method Not Allowed',
  };
  if (errorCodes405[code]) {
    res.status(405).send({ message: errorCodes405[code] });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes422 = {
    23505 /* <---- this is code in error object */: 'Unprocessable Entity',
  };
  if (errorCodes422[code]) {
    res.status(422).send({ message: errorCodes422[code] });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  if (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  } else next(err);
};
