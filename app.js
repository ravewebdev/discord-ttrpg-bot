import 'dotenv/config'
import express from 'express'
import {
  handleInteractions,
  verifyDiscordRequest
} from './lib/utils.js'

// Create express app.
const app = express()

// Get port, default to 3000.
const PORT = process.env.PORT || 3000

// Parse request body and verify incoming requests via discord-interactions.
app.use(express.json({verify: verifyDiscordRequest(process.env.PUBLIC_KEY)}))

// Handle interaction requests.
app.post('/interactions', handleInteractions)

})

app.listen(PORT, () => {})
