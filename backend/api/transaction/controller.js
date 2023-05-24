require('dotenv').config();
const transaction = require('../../model/transaction');

exports.transactionhistory = async (req, res) => {
  try {
    const transactionData = await transaction.aggregate([
      {
        $lookup: {
          from: 'signups',
          localField: 'loginId',
          foreignField: 'loginId',
          as: 'user_details',
        },
      },
      {
        $unwind: {
          path: '$user_details',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.send({
      status: true,
      data: transactionData,
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
