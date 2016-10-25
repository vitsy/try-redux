"use strict";
const settings = require('./settings.js');
const log = settings.log;
const socketIO = (io) => {

  const
      socketToUserIdMap = {},
      socketToRoomMap = {},
      sessions = {};
  let msgId = 1;

  io.sockets.on('connection', (socket, sessionID, user) => {
    log.debug('new connection');

    function getSessionID() {
      return `S${msgId++}`;
    }

    function removeUser() {
      const sessionID = socketToRoomMap[socket.id],
          session =  sessions[sessionID],
          leaveUser = socketToUserIdMap[socket.id];
      if (leaveUser && session) {
        log.debug('removeUser',  sessionID,  leaveUser);
        socket.leave(sessionID);
        const index = session.users.findIndex( user => user.user === leaveUser);
        if (index !== -1) {
          const user = session.users.splice(index, 1);
          socket.broadcast.to(sessionID).emit('leave', leaveUser);
        }
        delete socketToRoomMap[socket.id];
        delete socketToUserIdMap[socket.id];
      }

    }

    function sendSessionMessages(sessionID){
     log.debug(`sendSession ${sessionID} Messages to user: ${socketToUserIdMap[socket.id]}` );
     log.debug(`send users : ${sessions[sessionID].users.join('|')}`);
     socket.emit('users', {users:sessions[sessionID].users, sessionID});
   //  io.in(sessionID).emit('test', sessionID);
     sessions[sessionID].msgs.forEach( (m) => {
       socket.emit('msg', m);
     })
    }



    socket.on('join', (msg) => {
      let session =  msg.sessionID && sessions[msg.sessionID];

      const user = Object.assign({}, msg);
      log.debug(`join to session  ${msg.sessionID} user:  ${msg.user} ${Object.keys(sessions)}` );
      if (!session)  {
        if (!msg.sessionID) {
          msg.sessionID = sessionID = getSessionID();
          sessions[sessionID] = { users: [user], msgs:[]};
          log.debug(`join to session(new) : ${msg.sessionID} user: ${user.user}`);
        } else {
          socket.emit('badSession', msg);
          return;
        }
      } else {
        if (user.user) {
          session.users.push(user);
          log.debug(`join to session : ${msg.sessionID} user: ${user.user}`);
        } else {
          session.users.push(user);
          log.debug(`session exist: ${msg.sessionID}`);
          socket.emit('goodSession', msg);
          return;
        }
      }
      socketToRoomMap[socket.id] = msg.sessionID;
      socketToUserIdMap[socket.id] = msg.user;
      socket.join(msg.sessionID);
      socket.broadcast.to(msg.sessionID).emit('join', msg);
      sendSessionMessages(msg.sessionID);
    });

    socket.on('leave',removeUser);
    socket.on('disconnect', removeUser);

    socket.on('vote', (msg) => {// {vote:}
      const sessionID = socketToRoomMap[socket.id];
      const session =  sessions[sessionID];
      if (session) {
        const userName = socketToUserIdMap[socket.id];
        log.debug(`vote for session '${sessionID} from ${userName} vote ${msg.vote}`);
        const user = session.users.find( u => u.user === userName);
        user.vote = msg.vote;
        io.in(sessionID).emit('vote', {user: userName, vote: msg.vote});
      } else {
        log.error(`vote for session '${sessionID} from ${userName} vote ${msg.vote}`);
      }
    });

    socket.on('reset', (msg) => {// {vote:}
      const sessionID = socketToRoomMap[socket.id];
      const session =  sessions[sessionID];
      log.debug(`reset for session '${sessionID}`);
      const user = session.users.forEach( u =>  delete u.vote);
      io.in(sessionID).emit('reset', {});
    });

    socket.on('msg', (msg) => {
      const sessionID = socketToRoomMap[socket.id];
      const session =  sessions[sessionID];
      log.debug(`msg for session '${sessionID} from ${socketToUserIdMap[socket.id]}`);
      session.msgs.push(msg);
      io.in(sessionID).emit('msg', msg);
    });
  });

}
module.exports = socketIO
/*
 // sending to sender-client only
 socket.emit('message', "this is a test");

 // sending to all clients, include sender
 io.emit('message', "this is a test");

 // sending to all clients except sender
 socket.broadcast.emit('message', "this is a test");

 // sending to all clients in 'game' room(channel) except sender
 socket.broadcast.to('game').emit('message', 'nice game');

 // sending to all clients in 'game' room(channel), include sender
 io.in('game').emit('message', 'cool game');

 // sending to sender client, only if they are in 'game' room(channel)
 socket.to('game').emit('message', 'enjoy the game');

 // sending to all clients in namespace 'myNamespace', include sender
 io.of('myNamespace').emit('message', 'gg');

 // sending to individual socketid
 socket.broadcast.to(socketid).emit('message', 'for your eyes only');
 */