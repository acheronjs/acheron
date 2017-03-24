var acheron = require('../dist/acheron.js')

function runPublisher () {
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
}

function runRpc() {
  // Add rpc method listener
  acheron.rpc(CHANNEL_NAME, 'get', (str1, str2, obj) => {
    console.log('call args:', [str1, str2, obj])
    return 'rpc call response'
  })

  // Creates a message producer
  let producer = acheron.producer(CHANNEL_NAME)

  // Creates a rpc call method function
  let getRpcMethod = producer.method('get')

  // Calls the method, returning a promise of the response
  getRpcMethod('hello', 'world', {'arg': 3})
    .then((resp) => {
      console.log('call resp:', resp)
    })
}

runPublisher()
runRpc()
