const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'UserCollection',
        required: [true, 'Please provide user']
    }

}, { timestamps: true });


module.exports = mongoose.model('JobCollection', JobSchema);
    

// schemaType :- configuration object for individual property (also called path)
// {
//     type: String,
//     required: [true, 'Please provide company name'],
//     maxlength: 50
// },


// Schema can be called as a configuration object for mongoose model
// A SchemaType is different from a type