const { AppError, MemoryRepository } = require("../shared/_shared.index");
const activities = require("../db/activities.data.json");
const bookings = require("../db/bookings.data.json");

const activitiesRepository = MemoryRepository(activities);
const bookingsRepository = MemoryRepository(bookings);

async function readAll(userId) {
  return await bookingsRepository.selectByKeyValue("userId", userId);
}

async function readById(id, userId) {
  const booking = await bookingsRepository.selectById(id);
  if (!booking) {
    throw new AppError(`Booking with id: ${id} not found `, "NOT_FOUND", "bookings.service.readById");
  }
  // ToDo: validate user is owner of booking or the activity
  return booking;
}

async function readActivity(id, userId) {
  const booking = await readById(id, userId);
  return await activitiesRepository.selectById(booking.activityId);
}

create = async (booking, userId) => {
  const activity = activitiesRepository.selectById(booking.activityId);
  if (!activity) throw new AppError(`Activity ${booking.activityId} not found`, "NOT_FOUND", "bookings.service.create");
  booking.userId = userId;
  booking.id = new Date().getTime();
  booking.createdAt = new Date().toISOString();
  return await bookingsRepository.insert(booking);
};

async function update(id, booking, userId) {
  const current = await readById(id, userId);
  guardIsOwner(userId, current, "bookings.service.update");
  const updated = { ...current, ...booking, updatedAt: new Date().toISOString() };
  await bookingsRepository.update(id, updated);
  return updated;
}

const deleteById = async (id, userId) => {
  const current = await bookingsRepository.selectById(id);
  if (!current) return;
  guardIsOwner(userId, current, "bookings.service.deleteById");
  return await bookingsRepository.deleteById(id);
};

function guardIsOwner(userId, current, source) {
  if (userId !== current.userId) {
    throw new AppError("User is not the owner of the booking", "FORBIDDEN", source);
  }
}

/**
 * Business logic for Activities entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const bookingsService = {
  readAll,
  readById,
  readActivity,
  create,
  update,
  deleteById,
};

module.exports = bookingsService;