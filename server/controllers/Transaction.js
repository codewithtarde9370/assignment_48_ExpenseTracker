import Transaction from '../models/Transaction.js'
import User from '../models/User.js';

const postTransaction = async (req, res) => {
/*[
    {
        "title": "Grocery Shopping",
        "amount": 150.75,
        "category": "Groceries",
        "type": "Expense",
        "user": "Rutuja More"
    },
    {
        "title": "Salary",
        "amount": 2500.00,
        "category": "Income",
        "type": "Income",
        "user": "Rutuja Wable"
    },
    {
        "title": "Utility Bill",
        "amount": 80.25,
        "category": "Bills",
        "type": "Expense",
        "user": "Rutuja Jadhav"
    },
    {
        "title": "Freelance Work",
        "amount": 500.00,
        "category": "Income",
        "type": "Income",
        "user": "Sakshi Shewale"
    },
    {
        "title": "Gym Membership",
        "amount": 45.00,
        "category": "Health",
        "type": "Expense",
        "user": "Nikita Raut"
    }
]
 */

  const { title, amount, category, type, user } = req.body;

  const transaction = new Transaction({
    title,
    amount,
    category,
    type,
    user
  });

  try {
    const savedTransaction = await transaction.save();

    res.json({
      success: true,
      message: "Transaction successful",
      data: savedTransaction
    })
  }
  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }
}

const getTransactions = async (req, res) => {
  const { userId } = req.query;

  const user = await User.findById(userId)

  if(!user){
    return res.json({
      success: false,
      message: "User not found",
      data: null
    })
  }

  const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1});

  res.json({
    success: true,
    message: "Transactions fetched successfully",
    data: transactions
  })
}

const deleteTransaction = async (req, res) => {
  const {id} = req.params;

  await Transaction.deleteOne({_id: id});

  res.json({
    success: true,
    message: "Transaction deleted successfully",
    data: null
  })
}

export {
  postTransaction,
  getTransactions,
  deleteTransaction
}