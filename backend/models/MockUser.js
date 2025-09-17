// Mock User model for development without MongoDB
class MockUser {
  constructor(userData) {
    this._id = userData._id || Math.random().toString(36).substr(2, 9);
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.firstName = userData.firstName || '';
    this.lastName = userData.lastName || '';
    this.role = userData.role || 'user';
    this.createdAt = new Date();
    this.lastLogin = null;
  }

  // Mock comparePassword method
  async comparePassword(password) {
    // For demo purposes, we'll just compare directly
    // In a real application, you would hash passwords
    return this.password === password;
  }

  // Mock save method
  async save() {
    this.lastLogin = new Date();
    // In a real implementation, this would save to database
    return this;
  }
}

// Mock User collection
const mockUsers = [
  new MockUser({
    _id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  }),
  new MockUser({
    _id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user'
  })
];

// Mock User model methods
class UserModel {
  static async findOne(query) {
    if (query.email) {
      return mockUsers.find(user => user.email === query.email) || null;
    }
    if (query.username) {
      return mockUsers.find(user => user.username === query.username) || null;
    }
    if (query._id) {
      return mockUsers.find(user => user._id === query._id) || null;
    }
    return null;
  }

  static async findById(id) {
    return mockUsers.find(user => user._id === id) || null;
  }

  static async create(userData) {
    const newUser = new MockUser(userData);
    mockUsers.push(newUser);
    return newUser;
  }
}

module.exports = UserModel;