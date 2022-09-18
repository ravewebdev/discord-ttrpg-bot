import {InteractionResponseType, InteractionType} from 'discord-interactions'
import 'dotenv/config'
import express from 'express'
import {VerifyDiscordRequest} from './lib/utils.js'

// Create express app.
const app = express()

// Get port, default to 3000.
const PORT = process.env.PORT || 3000

// Parse request body and verify incoming requests via discord-interactions.
app.use(express.json({verify: VerifyDiscordRequest(process.env.PUBLIC_KEY)}))

app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const {type, id, data} = req.body

  /**
   * Handle verification requests.
   */
  if (type === InteractionType.PING) {
    return res.send({type: InteractionResponseType.PONG})
  }
})

app.listen(PORT, () => {})
