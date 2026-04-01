const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Account = require('../models/Account');
const Log = require('../models/TransactionLog');

router.post('/transfer', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { from, to, amount } = req.body;

    const sender = await Account.findOne({ name: from }).session(session);
    const receiver = await Account.findOne({ name: to }).session(session);

    if (!sender || sender.balance < amount) {
      throw new Error("Insufficient balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    await Log.create([{ from, to, amount, status: "Success" }], { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Transaction Successful" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    await Log.create({
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount,
      status: "Failed"
    });

    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
