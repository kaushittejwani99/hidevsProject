const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

// Initialize Discord bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// Replace with your Discord bot token
const TOKEN = 'MTI5MDU5MTEwMzM5Njg3MjI0NA.G326qq.rdTX3tEBZyqdyqBlqpa_kJVksZcnbqTBOwkcSQ';
// Array of channel IDs where messages should be sent
const CHANNEL_IDS = [
  '1290613097110835220'  // Replace with actual channel ID
];

// Function to send a message to multiple channels
const sendMessageToChannels = async (message) => {
  for (const channelId of CHANNEL_IDS) { // Use for...of for proper async handling
    try {
      const channel = await client.channels.fetch(channelId);
      if (channel ) { // Check if the channel is a text channel
        await channel.send(message);
        console.log(`Message sent to channel ${channelId}`);
      } else {
        console.log(`Could not send message to channel ${channelId}.`);
      }
    } catch (error) {
      console.error(`Error sending message to channel ${channelId}:`, error);
    }
  }
};

// Event listener when the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Schedule to send a message every day at 7:00 AM
  cron.schedule('5 3 * * *', () => {
    const message = 'This is your message sent at 3:05 AM!';
    sendMessageToChannels(message);
  });

  // Schedule to send a message every hour starting from 8:00 AM
  cron.schedule('0 8-23 * * *', () => {
    const message = 'This is your hourly message!';
    sendMessageToChannels(message);
  });

  cron.schedule('0 10 * * 1', () => {
    const message = 'This is monday weekly message!';
    sendMessageToChannels(message);
  })

  console.log('Scheduling complete!');
});

// Log in to Discord with the bot's token
client.login(TOKEN)
  .then(() => console.log('Bot logged in!'))
  .catch(error => console.error('Failed to log in:', error));
