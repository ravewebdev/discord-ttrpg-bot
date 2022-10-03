import 'dotenv/config'
import express from 'express'
import {ALL_COMMANDS, registerGuildCommands} from './lib/commands.js'
import {verifyDiscordRequest} from './lib/requests.js'
import {handleInteractions} from './lib/utils.js'

// Create express app.
const app = express()

// Get port, default to 3000.
const PORT = process.env.PORT || 3000

// Parse request body and verify incoming requests via discord-interactions.
app.use(express.json({verify: verifyDiscordRequest(process.env.PUBLIC_KEY)}))

// Handle interaction requests.
app.post('/interactions', handleInteractions)

// Listen for changes.
app.listen(PORT, () => {
  // Register commands to the specified guild.
  registerGuildCommands(process.env.APP_ID, process.env.GUILD_ID, ALL_COMMANDS)
})
