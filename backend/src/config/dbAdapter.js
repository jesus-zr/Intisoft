const { useFirebase, db } = require('./firebase');
const mockUsers = require('./mockUsers');

// helper to convert firebase snapshot to array
async function getAllUsersFirebase() {
  const snapshot = await db.ref('users').get();
  const users = [];
  if (!snapshot.exists()) return users;
  snapshot.forEach(child => {
    users.push({ id: child.key, ...(child.val()) });
  });
  return users;
}

async function getUserByIdFirebase(userId) {
  const snapshot = await db.ref(`users/${userId}`).get();
  if (!snapshot.exists()) return null;
  return { id: userId, ...(snapshot.val()) };
}

async function findUserByUsernameFirebase(username) {
  const snapshot = await db.ref('users').get();
  if (!snapshot.exists()) return null;
  let found = null;
  snapshot.forEach(child => {
    const userData = child.val();
    if (userData.user === username) {
      found = { id: child.key, ...userData };
    }
  });
  return found;
}

async function findUserByEmailFirebase(email) {
  const snapshot = await db.ref('users').get();
  if (!snapshot.exists()) return null;
  let found = null;
  snapshot.forEach(child => {
    const userData = child.val();
    if (userData.email === email) {
      found = { id: child.key, ...userData };
    }
  });
  return found;
}

// Mock implementations
function getAllUsersMock() {
  return Object.keys(mockUsers).map(key => ({ id: key, ...mockUsers[key] }));
}

function getUserByIdMock(userId) {
  const u = mockUsers[userId];
  return u ? { id: userId, ...u } : null;
}

function findUserByUsernameMock(username) {
  const entries = Object.entries(mockUsers);
  for (const [key, value] of entries) {
    if (value.user === username) return { id: key, ...value };
  }
  return null;
}

function findUserByEmailMock(email) {
  const entries = Object.entries(mockUsers);
  for (const [key, value] of entries) {
    if (value.email === email) return { id: key, ...value };
  }
  return null;
}

module.exports = {
  getAllUsers: useFirebase ? getAllUsersFirebase : async () => getAllUsersMock(),
  getUserById: useFirebase ? getUserByIdFirebase : async (id) => getUserByIdMock(id),
  findUserByUsername: useFirebase ? findUserByUsernameFirebase : async (username) => findUserByUsernameMock(username),
  findUserByEmail: useFirebase ? findUserByEmailFirebase : async (email) => findUserByEmailMock(email),
  useFirebase
};
