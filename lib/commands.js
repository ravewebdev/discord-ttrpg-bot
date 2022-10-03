import {InteractionResponseType} from 'discord-interactions'
import {calculateHypotenuse} from './calculations.js'

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
}
