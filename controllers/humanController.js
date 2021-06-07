const Human = require('../models/humanModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createHuman = catchAsync(async (req, res, next) => {
  const newHuman = await Human.create({
    name: req.body.name,
    age: req.body.age,
  });

  res.status(201).json(newHuman);
});

exports.getAllHumans = catchAsync(async (req, res, next) => {
  const humans = await Human.find();

  // SEND RESPONSE
  res.status(200).json(humans);
});

exports.getHuman = catchAsync(async (req, res, next) => {
  const human = await Human.findById(req.params.human_id);

  if (!human) {
    return next(new AppError('No human found with that ID', 404));
  }

  res.status(200).json(human);
});

exports.deleteHuman = catchAsync(async (req, res, next) => {
  const human = await Human.findByIdAndDelete(req.params.human_id);

  if (!human) {
    return next(new AppError('No human found with that ID', 404));
  }

  res.status(204).json();
});
