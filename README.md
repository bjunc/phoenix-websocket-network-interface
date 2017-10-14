# Phoenix WebSocket Network Interface

Apollo network interface for communication with Phoenix (using Absinthe) over websockets.

Currently supports request/response queries and mutations over socket in both browser and server.  _Subscriptions coming soon._

### Example

```javascript
import { createPhoenixWebSocketNetworkInterface } from 'phoenix-websocket-network-interface'
import ApolloClient from 'apollo-client'

let options = {
  uri: 'ws://localhost:4000/socket',
  params: { token: 'ABCDEF123456' }
  logger: true
}

const networkInterface = createPhoenixWebSocketNetworkInterface(options)
const client = new ApolloClient({ networkInterface })

```

### Options

Options have similar parity to Apollo's default network interface where applicable.  Hopefully, the additional options are intuitive.

#### `uri : String`

Socket endpoint declared in your Phoenix app.

Example: `ws://localhost:4000/socket`

#### `params : Object`

Parameters to be sent to your socket connection.  See [Phoenix.js hexdocs](https://hexdocs.pm/phoenix/js/).  One example would be to pass a JWT, which can be used by Guardian to verify permissions to connect.

#### `ssr : Boolean`

If true, node-based w3cwebsocket transport will be used to prevent `window` errors while running on a server.  You can override the transport with the `transport` option.

#### `transport : String`

The Websocket Transport, for example WebSocket or Phoenix.LongPoll.
Defaults to WebSocket with automatic LongPoll fallback in the browser, and w3cwebsocket when `ssr:true`

#### `debug : Boolean`

Log socket and channel info to console.  If `options.logger` function is not set, default is used.

#### `logger: Function`

Logging function.  Default:

```js
(kind, msg, data) => console.log(`phoenix apollo \n\t ${kind}: ${msg}`, data)
```





