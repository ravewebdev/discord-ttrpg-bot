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
