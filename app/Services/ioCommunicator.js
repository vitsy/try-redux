"use strict";
import { EventEmitter } from 'events';
import socketIo from 'socket.io-client';
import logger from 'loglevel';
const log = logger.getLogger('io');
function ioCommunicator() {
//  EventEmitter.call(this);
  this.io = socketIo('http://localhost:5000');
  this.io.on('connect', () => log.debug('socket to server connected'));
  this.io.on('disconnect', () => log.debug('socket from server disconnected'));

}


ioCommunicator.prototype.send = function sendCommand(command, msg, dispatch) {
  log.debug(`send socket command ${command} ${msg.toString()}`);
  this.io.emit(command, msg);
  //this.io.emit(command', command);

  /*dispatch({
    type: COMMAND_SENT,
    command
  });*/
};
const communicator = new ioCommunicator();
export default communicator;
