var orm = require('orm');
module.exports = {
  properties: {
    displayName: String,
    name: String,
    password: String,
    location: String,
    email: String,
    driveForClient: Boolean,
    offerFitnessAssessment: Boolean,
    offerNutritionPlan: Boolean,
    price: Number,
    takingNewClients: Boolean,
    phoneNumber: {type: 'number', size: 8},
    id: {type: 'serial', key: true}
  }
};
