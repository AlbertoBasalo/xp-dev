const { AppError } = require("../shared/_shared.index");

const usersRepository = require("./users.repository");
const activitiesRepository = require("./activities.repository");
const bookingsRepository = require("./bookings.repository");

const readById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) throw new AppError(`User with id: ${id} not found `, "NOT_FOUND", "users.service.readById");
  guardIsOwner(userId, current, "users.service.readById");
};

const readByEmail = async (email) => {
  const users = await usersRepository.selectByKeyValue("email", email);
  return users[0] || undefined;
};

async function readActivities(userId) {
  const activities = await activitiesRepository.selectAll();
  return await activitiesRepository.selectByKeyValue("userId", userId);
}

async function readBookings(userId) {
  return await bookingsRepository.selectByKeyValue("userId", userId);
}

const create = async (user) => {
  const current = await readByEmail(user.email);
  if (current) throw new AppError("User already exist", "CONFLICT", "users.service.create");
  user.id = new Date().getTime();
  user.createdAt = new Date().toISOString();
  return await usersRepository.insert(user);
};

const deleteById = async (id, userId) => {
  const current = await usersRepository.selectById(id);
  if (!current) return;
  guardIsOwner(userId, current, "users.service.deleteById");
  return await usersRepository.deleteById(id);
};

const guardIsOwner = (userId, item, source) => {
  if (userId !== item.id) {
    throw new AppError("User is not the owner", "FORBIDDEN", source);
  }
};

/**
 * Business logic for Users entities
 * @description should not know about the HTTP layer nor the database layer implementation details
 */
const usersService = {
  readActivities,
  readBookings,
  readById,
  readByEmail,
  create,
  deleteById,
};

module.exports = usersService;
