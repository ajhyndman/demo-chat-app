const WebSocket = require('ws');

/**
 * A simple observable list class.
 */
class Log {
  constructor() {
    this.log = [];
    this.subscribers = [];

    this.push.bind(this);
    this.subscribe.bind(this);
    this.getLog.bind(this);
  }

  push(event) {
    this.log = this.log.concat([event]);
    this.subscribers.forEach(subscriber => {
      subscriber(event);
    });
  }

  subscribe(subscriber) {
    // push any existing messages to subscriber before registering
    if (this.log.length > 0) {
      this.log.forEach(subscriber);
    }

    this.subscribers.push(subscriber);
  }

  getLog() {
    return this.log;
  }
}

const events = new Log();

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    events.push(message);
    console.log('action:', message);
    console.log('action log:', events.getLog());
  });

  events.subscribe(event => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(event);
    }
  });
});
