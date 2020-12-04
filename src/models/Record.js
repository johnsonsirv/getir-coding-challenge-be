const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
    {
        counts: [Number],
        key: String,
        value: String,
    },
    { timestamps: true },
);

// optimize search
recordSchema.index({ createdAt: 1 });

module.exports = mongoose.model('records', recordSchema);
