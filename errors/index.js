exports.handle400 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes400 = {
    23505 /* <---- this is code in error object */: 'Duplicate key violation',
  };
  if (errorCodes400[code]) {
    res.status(400).send({ message: errorCodes400[code] });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes404 = {
    23505 /* <---- this is code in error object */: 'Duplicate key violation',
  };
  if (errorCodes404[code]) {
    res.status(404).send({ message: errorCodes404[code] });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes422 = {
    23505 /* <---- this is code in error object */: 'Duplicate key violation',
  };
  if (errorCodes422[code]) {
    res.status(422).send({ message: errorCodes422[code] });
  } else next(err);
};
