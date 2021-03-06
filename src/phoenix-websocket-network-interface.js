import { print } from 'graphql/language/printer'
import { Socket as PhoenixSocket } from 'phoenix'
import { w3cwebsocket as W3CWebSocket } from 'websocket'

export class PhoenixWebSocketNetworkInterface {
	constructor (opts) {
		let defaultLogger = (kind, msg, data) => console.log(`phoenix apollo \n\t ${kind}: ${msg}`, data)
		// Enable debugging
		opts.debug === true ? opts.logger = opts.logger || defaultLogger : opts.logger = null
		// user node-based websocket when running on a server (eg. SSR)
		if (typeof window === 'undefined' && !opts.transport) opts.transport = W3CWebSocket
		let socket = new PhoenixSocket(opts.uri, opts)
		try {
			socket.connect()
			this._joinChannel(socket)
		} catch (err) {
			console.error(err)
		}
	}

	_joinChannel (socket) {
		const CHANNEL_TOPIC = '__absinthe__:control'
		let channel = socket.channel(CHANNEL_TOPIC, {})
		this._channel = channel
		channel.join()
		// TODO: wrap channel join in promise for error catching/reporting
	}

	// Required by the NetworkInterface interface spec
	query ({ operationName, query, variables }) {
		query = print(query)
		// console.log('Phoenix apollo \n\t query:', query)
		return new Promise((resolve, reject) => {
			this._channel.push('doc', { operationName, query, variables })
				.receive('ok', resolve)
				.receive('ignore', resolve)
				.receive('error', reject)
				.receive('timeout', reject)
		})
	}

	// TODO: support middleware
	use (middlewares) {
		console.warning('Middleware is not supported at this time.')
		return this
	}

	// TODO: support afterware
	useAfter (afterwares) {
		console.warning('Afterware is not supported at this time.')
		return this
	}
}

export function createPhoenixWebSocketNetworkInterface (opts) {
	return new PhoenixWebSocketNetworkInterface(opts)
}
