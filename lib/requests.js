import {verifyKey} from 'discord-interactions'
import fetch from 'node-fetch'

/**
 * Verify request from Discord.
 *
 * @see https://github.com/discord/discord-example-app/blob/07afa70d2b0adf576fbce68439b6c9385a96b313/utils.js
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {any}  publicKey The public key from the Discord developer dashboard.
 * @return {void}
 */
export function verifyDiscordRequest(publicKey) {
  return function (req, res, buf) {
    const signature = req.get('X-Signature-Ed25519')
    const timestamp = req.get('X-Signature-Timestamp')

    const isValidRequest = verifyKey(buf, signature, timestamp, publicKey)

    if (!isValidRequest) {
      res.status(401).send('Bad request signature')
    }
  }
}

/**
 * Send fetch request to Discord API.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {string} endpoint Discord API endpoint.
 * @param  {object} options  API request options.
 * @return {object}          Fetch response.
 */
export async function sendDiscordRequest(endpoint, options) {
  // Append endpoint to root API URL.
  const url = 'https://discord.com/api/v10/' + endpoint

  // Stringify body data.
  const fetchOptions = {
    ...options,
    ...(options?.body ? {body: JSON.stringify(options.body)} : {})
  }

  // Send request to Discord.
  const response = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8'
    },
    ...fetchOptions
  })

  // Check for errors.
  if (!response?.ok) {
    const data = await response.json()

    console.error(response.status)
    throw new Error(JSON.stringify(data))
  }

  return response
}
