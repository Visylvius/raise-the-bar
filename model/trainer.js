var orm = require('orm');
module.exports = {
  properties: {
    displayName: String,
    name: String,
    password: String,
    location: String,
    email: String,
    bio: Object,
    driveForClient: Boolean,
    offerFitnessAssessment: Boolean,
    offerNutritionPlan: Boolean,
    price: Number,
    takingNewClients: Boolean,
    phoneNumber: {type: 'number', size: 8},
    id: {type: 'serial', key: true}
  }
};


//TODO create a relationship table User
//fields are only email (primary key, unique), athleteId, trainerId
