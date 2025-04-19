const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const USER_PROTO_PATH = path.join(__dirname, 'protos/user.proto');
const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH);
const userProto = grpc.loadPackageDefinition(userPackageDefinition);

const client = new userProto.user.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

module.exports = {
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      client.CreateUser(userData, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
  },

  listUsers: () => {
    return new Promise((resolve, reject) => {
      client.ListUsers({}, (err, response) => {
        if (err) reject(err);
        else resolve(response.users);
      });
    });
  },

  updateUser: (userData) => {
    return new Promise((resolve, reject) => {
      client.UpdateUser(userData, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
  },

  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      client.DeleteUser({ userId }, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
  },

  getUser: (userId) => {
    return new Promise((resolve, reject) => {
      client.GetUser({ userId }, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
  }
}
