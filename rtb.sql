// refactor into ORM 2

CREATE TABLE IF NOT EXISTS trainers (
  displayName TEXT UNIQUE,
  name TEXT,
  password TEXT,
  twitter TEXT,
  facebook TEXT,
  linkedin TEXT,
  timeAvailable TIMESTAMPTZ,
  location TEXT,
  email TEXT,
  relocateForClient BOOL,
  offerFitnessAssessment BOOL,
  offerNutritionPlan BOOL,
  price MONEY,
  takingNewClients BOOL,
  phoneNumber VARCHAR,
  id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS athletes (
  displayName TEXT UNIQUE,
  name TEXT,
  liftingStyle TEXT,
  location TEXT,
  trainer BOOL,
  password TEXT,
  twitter TEXT,
  facebook TEXT,
  linkedin TEXT,
  hasTrainer BOOL,
  preferedGyms TEXT,
  preferedLiftingTimes TIMESTAMPTZ,
  id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS athletes_trainers (
  athleteId INT references athletes,
  trainerId INT references trainers,
  PRIMARY KEY (athleteId, trainerId)
);
