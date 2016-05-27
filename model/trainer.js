var orm = require('orm');
module.exports = {
  properties: {
    displayName: Text,
    name: Text,
    password: Text,
    timeAvailable: Date,
    location: Text,
    email: Text,
    driveForClient: Boolean,
    offerFitnessAssessment: Boolean,
    offerNutritionPlan: Boolean,
    price: Number,
    takingNewClients: Boolean,
    phoneNumber: Number,
    id: Serial
  }
};
