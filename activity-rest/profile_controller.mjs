import 'dotconfig/config'
import * as profiles from './profile_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// Update a profile with a name and birthdate
app.put('/profiles', (req, res) => {
    // Check if all required fields are provided
    if (!req.body._id || !req.body.name || !req.body.birthdate ) {
        res.status(400).json({ Error: 'All fields are required' });
        return;
    }

    profiles.updateProfile(req.body._id, req.body.name, req.body.birthdate)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, birthdate: req.body.birthdate})
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});