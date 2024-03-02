import { config } from 'dotenv'

config({
  path: '.env.test' // Los test de jest utilizarán los .env.test
})