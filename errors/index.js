exports.handle400 = (err, req, res, next) => {
  // console.log(err);
  // console.log(res.status(400).send({ message: 'mp not found' })
  const { code } = err;
  const errorCodes400 = {
    '22P02': 'Bad Request - ID should be an Integer',

  };
  if (errorCodes400[code] || err.status === 400) {
    res.status(400).send({ message: errorCodes400[code] || err.msg });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  // console.log(err);
  const { code } = err;
  const errorCodes404 = {
    // '22P02': 'Route Does Not Exist',
  };
  if (errorCodes404[code] || err.status === 404) {
    res.status(404).send({ message: errorCodes404[code] || err.msg });
  } else next(err);
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
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
  }
};
