// Here are defined the functions to be used in Handler

const i18n = require('i18n');
const Freetime = require('./Schema');

exports.getFreetime = (req, res, next) => {
  const _id = req.params._id;
  Freetime.findById(_id)
    .populate('owner')
    .lean()
    .exec((err, freetime) => {
      if (!freetime) res.status(500).json({ result: 'error', message: i18n.__('FREETIME.NOT_FOUND') });
      else res.status(200).json({ data: freetime });
    });
};

exports.getEmployeeFreetimes = (req, res, next) => {
  const _id = req.params._id;
  Freetime.find({ owner: _id })
    .populate('owner')
    .lean()
    .exec((err, freetimes) => {
      if (err) res.status(500).json({ result: 'error', message: err.message });
      else res.status(200).json({ data: freetimes });
    });
};

exports.postFreetime = (req, res, next) => {
  const _id = req.body._id;
  if (_id) {
    Freetime.findByIdAndUpdate(_id, req.body, { new: true })
      .lean()
      .exec((err, freetime) => {
        if (err) res.status(500).json({ result: 'error', message: err.message });
        else {
          if (!freetime) res.status(500).json({ result: 'error', message: i18n.__('FREETIME.NOT_FOUND') });
          else res.status(200).json({ data: freetime, message: i18n.__('FREETIME.RETRIEVED') });
        }
      });
  } else {
    let newFreetime = new Freetime(req.body);
    newFreetime.save(function (err) {
      if (err) res.status(500).json({ result: 'error', message: err.message });
      else res.status(200).json({ data: newFreetime, message: i18n.__('FREETIME.RETRIEVED') });
    });
  }
};

exports.deleteFreetime = (req, res, next) => {
  const _id = req.params._id;
  Freetime.findById(_id).exec((err, freetime) => {
    if (err) res.status(500).json({ result: 'error', message: err.message });
    else {
      freetime.remove(next);
      res.status(200).json({ data: { status: 'deleted' }, message: i18n.__('FREETIME.DELETED') });
    }
  });
};

exports.getByEmployees = async (employees) => {
  return Freetime.find({ owner: { $in: employees }, state: { $ne: 'cancelled' } })
    .select('-_id')
    .lean()
    .exec()
    .then((freetimes) => {
      return freetimes;
    });
};
