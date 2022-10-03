import {InteractionResponseType} from 'discord-interactions'
import {calculateHypotenuse} from './calculations.js'
import {sendDiscordRequest} from './requests.js'

/**
 * Hypotenuse command.
 */
export const HYPOTENUSE_COMMAND = {
  name: 'hypotenuse',
  description:
    'Calculate the distance between two characters at different elevations',
  options: [
    {
      name: 'distance',
      description: 'Horizontal distance between targets on x-axis',
      required: true,
      type: '4'
    },
    {
      name: 'height',
      description: 'Vertical distance between targets on y-axis',
      required: true,
      type: '4'
    }
  ],
  type: '1'
}

export const ALL_COMMANDS = [HYPOTENUSE_COMMAND]

/**
 * Handle incoming command request.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {object} data Request data object.
 * @param  {object} res  Instance of http.ServerResponse.
 * @return {any}         Command response.
 */
export function handleCommand(data, res) {
  const {name} = data

  if (!name) {
    return
  }

  const options = {}

  // Map options array to object on option name.
  Array.isArray(data?.options) &&
    data.options.forEach((option) => {
      if (!option?.name) {
        return
      }

      options[option.name] = option
    })

  // Handle specific command.
  switch (name) {
    case 'hypotenuse': {
      const distance = options?.distance?.value
      const height = options?.height?.value

      const hypotenuse = calculateHypotenuse(distance, height)

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content:
            // Display error message if calculation failed, else return result and original input.
            hypotenuse instanceof Error
              ? `*Error: ${hypotenuse.message}*`
              : `**Hypotenuse: ${hypotenuse}**  :triangular_ruler:  [Distance: ${distance}, Height: ${height}]`
        }
      })
    }
  }
}

/**
 * Register commands to a specific guild.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {number} appId    Discord app ID.
 * @param  {number} guildId  Discord guild ID.
 * @param  {Array}  commands Array of commands to register.
 * @return {void}
 */
export async function registerGuildCommands(appId, guildId, commands) {
  // Ensure guild and app IDs are valid.
  if (!appId || !guildId) {
    return
  }

  commands.forEach((command) => registerCommand(appId, command, guildId))
}

/**
 * Register command to Discord, globally or to a specified guild.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param {number} appId   Discord app ID.
 * @param {object} command Command data object.
 * @param {number} guildId Discord guild ID.
 */
export async function registerCommand(appId, command, guildId) {
  // Construct API endpoint with optional guild identifier.
  const endpoint = `applications/${appId}${
    guildId ? `/guilds/${guildId}` : ''
  }/commands`

  try {
    await sendDiscordRequest(endpoint, {method: 'POST', body: command})
  } catch (error) {
    console.error(error)
  }
}
