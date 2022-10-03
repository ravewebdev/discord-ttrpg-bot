import {verifyKey} from 'discord-interactions'
import 'dotenv/config'
import {handleCommand} from './commands.js'

/**
 * Handle incoming interaction requests.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {object} req Instance of http.IncomingMessage.??
 * @param  {object} res Instance of http.ServerResponse.??
 * @return {any}         Command response.
 */
export async function handleInteractions(req, res) {
  // Interaction type and data.
  const {type, data} = req.body

  /**
   * Handle verification requests.
   */
  if (type === InteractionType.PING) {
    return res.send({type: InteractionResponseType.PONG})
  }

  /**
   * Handle slash command requests.
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    return handleCommand(data, res)
  }
}

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
      throw new Error('Bad request signature')
    }
  }
}
