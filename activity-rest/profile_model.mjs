import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    weight: { type: String, required: false },
    height: { type: Number, required: false }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Profile = mongoose.model("Profile", profileSchema);


// TODO: update to be createProfile
const createActivity = async (name, start, end, amount, color, memo) => {
    // Call the constructor to create an instance of the model class User
    const activity = new Activity({ name: name, start: start, end: end, amount: amount, color: color, memo: memo });
    // Call save to persist this object as a document in MongoDB

    return activity.save();
}

// TODO: update to be findProfileById
const findActivityById = async (_id) => {
    const query = Activity.findById(_id);
    return query
}

// TODO: update to be findProfile
const findActivities = async (filter) => {
    // Use the 'find' method to retrieve users based on the query
    const query = Activity.find(filter);
    return query.exec();
}

const replaceProfile = async (_id, name, birthdate) => {
    const updatedProfile = await Profile.findByIdAndUpdate(
        _id,
        { name, birthdate},
        { new: true } // This option returns the updated document instead of the old one.
    );

    if (updatedProfile) {
        return 1; 
    } else {
        return 0; 
    }
}

const updateProfile = async (_id, update) => {
    /* A method to update a profile by passing the id and an object with the parameters name and birthdate and the update values for each.
        update = {name: "someName", birthdate:"date"}
    */
    return Profile.updateOne({ _id }, update).exec();
};

// TODO: update to delete a profile
const deleteById = async (_id) => {
    // Use the 'deleteOne' method to delete the activity with the specified _id
    const result = await Activity.deleteOne({ _id }).exec();
    return result.deletedCount;
};


export { createActivity, findActivityById, findActivities, replaceProfile, updateProfile, deleteById }

