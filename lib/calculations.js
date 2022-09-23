/**
 * Calculate hypotenuse value between two targets at different heights.
 *
 * @author Rae Van Epps <rave@ravewebdev.com>
 * @param  {number} distance Distance between targets on x-axis.
 * @param  {number} height   Distance between targets on y-axis.
 * @return {number}          Euclidean distance between targets.
 */
export function calculateHypotenuse(distance, height) {
  let x = !isNaN(distance) ? parseInt(distance, 10) : NaN
  let y = !isNaN(height) ? parseInt(height, 10) : NaN

  // Return error if either value is invalid. (This check should be unnecessary as Discord performs type checking before submission.)
  if (isNaN(x) || isNaN(y)) {
    return new Error(
      isNaN(x) ? 'Distance value is invalid' : 'Height value is invalid'
    )
  }

  // Calculate hypotenuse.
  const hypotenuse = Math.sqrt(Math.pow(distance, 2) + Math.pow(height, 2))

  // Return error if hypotenuse is not a valid number.
  if (isNaN(hypotenuse)) {
    new Error('Something went wrong...')
  }

  // Return hypotenuse rounded to one decimal place.
  return Math.round(hypotenuse * 10) / 10
}
