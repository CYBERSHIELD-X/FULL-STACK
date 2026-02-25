const express = require("express");
const mongoose = require("mongoose");

const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const router = express.Router();

/* Create Account (Testing) */
router.post("/create", async (req, res) => {

  const acc = await Account.create(req.body);

  res.json(acc);
});


/* Money Transfer (Transaction) */
router.post("/transfer", async (req, res) => {

  const { fromId, toId, amount } = req.body;

  const session = await mongoose.startSession();

  session.startTransaction();

  try {

    const from = await Account.findById(fromId).session(session);
    const to = await Account.findById(toId).session(session);

    if (!from || !to) throw new Error("Account Not Found");

    if (from.balance < amount)
      throw new Error("Insufficient Balance ❌");

    // Debit
    from.balance -= amount;
    await from.save({ session });

    // Credit
    to.balance += amount;
    await to.save({ session });

    // Log
    await Transaction.create([{
      from: from.name,
      to: to.name,
      amount,
      status: "SUCCESS"
    }], { session });

    await session.commitTransaction();

    res.send("Transfer Successful ✅");

  } catch (err) {

    await session.abortTransaction(); // ROLLBACK ❗

    await Transaction.create({
      from: fromId,
      to: toId,
      amount,
      status: "FAILED"
    });

    res.status(400).send("Transfer Failed ❌ : " + err.message);

  } finally {
    session.endSession();
  }
});


/* Get Transaction Logs */
router.get("/logs", async (req, res) => {

  const data = await Transaction.find();

  res.json(data);
});

module.exports = router;
