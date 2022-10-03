import {InteractionResponseType, InteractionType} from 'discord-interactions'
import 'dotenv/config'
import {handleCommand} from './commands.js'

/**
 * Handle incoming interaction requests.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {object} req Instance of http.IncomingMessage.
 * @param  {object} res Instance of http.ServerResponse.
 * @return {any}        Command response.
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
