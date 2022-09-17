import {verifyKey} from 'discord-interactions'
import 'dotenv/config'

/**
 * Verify request from Discord.
 *
 * @see https://github.com/discord/discord-example-app/blob/07afa70d2b0adf576fbce68439b6c9385a96b313/utils.js
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {any}  publicKey The public key from the Discord developer dashboard.
 * @return {void}
 */
export function VerifyDiscordRequest(publicKey) {
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
