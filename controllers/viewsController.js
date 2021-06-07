const Human = require('../models/humanModel');
const catchAsync = require('../utils/catchAsync');

exports.getDashboard = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const humans = await Human.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Humans',
    humans,
  });
});
