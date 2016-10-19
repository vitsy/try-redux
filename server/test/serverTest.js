"use script";
const assert = require('chai').assert;
const socketIoClient = require('socket.io-client');
const Promise  = require('bluebird');

/**
 * Server must run at localhost:5000 ! npm start
 */
describe('Check Server Socket IO', () => {

  const backendUrl = 'http://localhost:5000';
  const userName1 = 'testUser1';
  const userName2 = 'testUser2';

  function prepareSession(userName) {
    return new Promise((resolve, reject) => {
      const socket = socketIoClient(backendUrl);
      socket.on('users', msg => {
        resolve({socket, msg});
      });
      socket.on('connect', () => socket.emit('join', { user: userName}));
    });
  }

  function someError(err) {
    console.log(`ERROR: ${err}`);
  }
  describe('websocket endpoint', () => {
    it('should accept websocket connections', done => {
      const socket = socketIoClient(backendUrl, {
        transports: ['websocket']
        , 'force new connection': true
      });
      socket.on('connect', () =>  done());
    });

    it('should handle correctly join command', done => {
      prepareSession(userName1).then(
          (res) => {
            const msg = res.msg;
            assert(msg);
            assert.isArray(msg.users);
            assert.isString(msg.sessionID);
            assert.isObject(msg.users.find(u => u.user === userName1))
            done();
          },
          someError
      )
    });

    it('should handle correctly send/recive msg', done => {
      prepareSession(userName1).then(
          (rez) => {
            const socket = rez.socket,
                users = rez.msg;
            assert(users);
            socket.emit('msg', {msg: 'one'})
            socket.on('msg', msg => {
              assert.isString(msg.msg);
              assert.equal(msg.msg, 'one');
              done();
            });
          },
          someError
      );
    });

    it('should handle correctly join to existing session', done => {
      prepareSession(userName1).then(
          (rez) => {
            const usersMsg = rez.msg;
            assert(usersMsg);
            const sessionID = usersMsg.sessionID

            const socket2 = socketIoClient(backendUrl);
            socket2.on('users', msg => {
              assert.equal(msg.users.length, 2);
              done();
            });
            socket2.on('connect', () => socket2.emit('join', {user: userName2, sessionID: sessionID}));
          }, someError);
    });

    it('should handle correctly join to existing session and then leave', done => {
      prepareSession(userName1).then(
          (rez) => {
            const usersMsg = rez.msg;
            assert(usersMsg);
            const sessionID = usersMsg.sessionID

            const socket2 = socketIoClient(backendUrl);
            socket2.on('users', msg => {
              assert.equal(msg.users.length, 2);
              socket2.on('leave', (user) => {
                assert.equal(user, userName1);
                done();
              })
              rez.socket.emit('leave', {});
            });
            socket2.on('connect', () => socket2.emit('join', {user: userName2, sessionID: sessionID}));
          }, someError);
    });

  });


});


