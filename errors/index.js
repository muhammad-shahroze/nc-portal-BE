exports.handle400 = (err, req, res, next) => {
  // console.log(err);
  const { code } = err;
  const errorCodes400 = {
    22003: 'Bad Request - Username should be an String',
    '22P02': 'Bad Request - ID should be an Integer',
    23502: 'Bad Request - Description property missing!',
  };
  if (errorCodes400[code] || err.status === 400) {
    res.status(400).send({ message: errorCodes400[code] || err.msg });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  // console.log(err);
  const { code } = err;
  const errorCodes404 = {
  };
  if (errorCodes404[code] || err.status === 404) {
    res.status(404).send({ message: errorCodes404[code] || err.msg });
  } else next(err);
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle422 = (err, req, res, next) => {
  // console.log(err);
  const { code } = err;
  const errorCodes422 = {
    23503: 'Unique Key Violation!. Request cannot be proccessed',
    23505: 'Unique Key Violation!. Request cannot be proccessed',
  };
  if (errorCodes422[code] || err.status === 422) {
    res.status(422).send({ message: errorCodes422[code] || err.msg });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  const { code } = err;
  const errorCodes500 = {
    42703: 'Property does not Exist - Internal Server Error',
  };
  if (errorCodes500[code]) {
    res.status(500).send({ message: errorCodes500[code] });
  }
};
