import xs from 'xstream'

let promiseCon = Promise
let producers = {}
let streams = {}

class Producer {
  constructor (channel) {
    this.channel = channel
    this.listener = null
  }

  start (listener) {
    this.listener = listener
  }

  stop () {}

  method (method) {
    function methodFn (...args) {
      let reply = new promiseCon((resolve) => {
        this.listener.next({
          channel: this.channel,
          topic: 'rpc',
          method: method,
          args: args,
          reply: resolve
        })
      })
      return reply
    }
    return methodFn.bind(this)
  }

  publish (topic) {
    return (body) => {
      this.listener.next({
        channel: this.channel,
        topic: topic,
        body: body
      })
    }
  }
}

function makeChannel (channel) {
  let producer
  if (!(channel in producers)) {
    producer = new Producer(channel)
    producers[channel] = producer
  } else {
    producer = producers[channel]
  }

  let stream
  if (!(channel in streams)) {
    stream = xs.create(producer)
    streams[channel] = stream
  }
}

export default {
  setPromiseImplementation: function (promise) {
    promiseCon = promise
  },
  producer: function (channel) {
    makeChannel(channel)
    return producers[channel]
  },

  rpc: function (channel, methodName, method) {
    this.stream(channel)
      .filter(msg => msg.topic === 'rpc' && msg.method === methodName)
      .addListener({ next: (msg) => {
        let resp = method(...msg.args)
        if (typeof resp.then !== 'undefined') {
          resp.then(msg.reply)
        } else {
          msg.reply(resp)
        }
      }})
  },

  stream: function (channel) {
    makeChannel(channel)
    return streams[channel]
  }
}
