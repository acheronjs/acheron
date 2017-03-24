# Acheron

A lightweight javascript event bus with rpc support.

## Resources

* [Description](#Description)
* [Installation](#Installation)
* [Usage](#Usage)
  * [Publish/Subscribe](#PublishSubscribe)
  * [RPC](#RPC)
  * [Promises](#Promises)
* [Roadmap](#Roadmap)

## Description

Acheron is a message bus, similar to what RabbitMQ (with the AMQP protocol)
is for the server side services. The aim of the project is to make modules
communication in a big webapp easy.

The name Acheron came from one of the 4 rivers from the realm of Hades, from
greek mythology. The idea is that the messages should flow with the stream.

The only dependency required to use this lib is
[Xstream](https://github.com/staltz/xstream), the library that powers
[Cycle.JS](https://cycle.js.org/).

## Installation

To install this package use the following commands:

```
yarn add acheron
# or
npm install --save acheron
```

## Usage

Acheron has three main elements that need to be understood, there are
producers, streams and listeners. Producers generate messages, which are
passed down to the streams, and streams distribute messages to the listeners.
That's it, simple like that!

### Publish/Subscribe

Now some code to show how to create a publisher/subscriber logic:

```javascript
// If you are using a bundler with babel, like webpack:
import acheron from 'acheron'
// or if you are using nodejs/es5
var acheron = require('acheron')

// The first thing you need to create is a stream
// Streams are named channels in which your messages flow
var stream = acheron.stream('channel.name')

// Next you need to create a listener for your messages
// In this case we will be filtering messages by the topic 'log'
stream
  .filter((msg) => msg.topic === 'log')
  .addListener({ next: (msg) => {
    console.log('msg received:', msg)
  }})

// After all listeners were configured, you can start publishing messages
// Fist we have to create a message producer for the stream we configured before
var producer = acheron.producer('channel.name')

// The we make the message topic sender
var publishLog = producer.topic('log')

// And finally, we send the message using the publisher
publishLog({'log': 'data'})
```

The streams returned are raw [Xstream](https://github.com/staltz/xstream)
streams, so you can use any method available. For example, you can create
a message pre-processor using the stream's map method. How to do this and
more can be found on the Xstream docs.

### RPC

RPCs in Acheron are an extension to the publish/subscribe model. They use the
same concepts, you add a rpc call listener to a stream, and publish a rpc call
with the producer to get the response. An example of this is shown bellow:

```javascript
import acheron from 'acheron'

// First you need to add a rpc method listener
// You don't need to create the stream, Acheron creates it for you
acheron.rpc(CHANNEL_NAME, 'get', (str1, str2, obj) => {
  console.log('call args:', [str1, str2, obj])
  return 'rpc call response'
})

// Then create a message producer
let producer = acheron.producer(CHANNEL_NAME)

// To call the method RPC method, you create a method caller function
let getRpcMethod = producer.method('get')

// Finally you call the method
// The method call returns a promise of the response
getRpcMethod('hello', 'world', {'arg': 3})
  .then((resp) => {
    console.log('call resp:', resp)
  })

// You can also use the async/await syntax if it's available in your environment
let resp = await getRpcMethod('hello', 'world', {'arg': 3})
```

### Promises

If you want to use a Promise polyfill library or use an implentation other
than the native, you can set the promise constructor like this:

```javascript
var bluebird = require('bluebird')
var acheron = require('acheron')

// Set acheron to use Bluebird to create promises
acheron.setPromiseImplementation(bluebird)
```

## Roadmap

* Before 1.0
  * Add instances for channels naming isolation
  * Stabilize APIs
  * Add unit tests
  * Add browser tests
