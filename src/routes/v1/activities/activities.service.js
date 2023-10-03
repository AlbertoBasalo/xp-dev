// Services should not know about the HTTP layer nor the database layer implementation details

const activitiesRepository = require("./activities.repository");

async function readActivities() {
  return await activitiesRepository.selectActivities();
}

async function readActivity(id) {
  return await activitiesRepository.selectActivity(id);
}

async function readActivityBookings(id) {
  return (await activitiesRepository.selectActivityBookings(id)) || [];
}

async function createActivity(activity) {
  return await activitiesRepository.insertActivity(activity);
}

async function updateActivity(id, activity) {
  return await activitiesRepository.updateActivity(id, activity);
}

async function deleteActivity(id) {
  return await activitiesRepository.deleteActivity(id);
}

module.exports = {
  readActivities,
  readActivity,
  readActivityBookings,
  createActivity,
  updateActivity,
  deleteActivity,
};
