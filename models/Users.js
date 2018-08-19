const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose; // ini sama aja dengan baris 2

const userSchema = new Schema({
	googleId: String,
	name: String
});

mongoose.model('users', userSchema);
