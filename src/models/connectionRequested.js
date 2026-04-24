const mongoose = require("mongoose");

const connectionRequestedSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["liked", "disliked", "accepted", "rejected"],
        message: "{VALUE} is not a valid status",
      },
    },
  },
  { timestamps: true },
);

connectionRequestedSchema.pre("save", async function () {
  if (this.senderId.equals(this.receiverId)) {
    throw new Error("Can't send connection request to yourself");
  }
});

connectionRequestedSchema.index(
  { senderId: 1, receiverId: 1 },
  { unique: true },
);

const connectionRequested = mongoose.model(
  "connectionRequested",
  connectionRequestedSchema,
);

module.exports = connectionRequested;
