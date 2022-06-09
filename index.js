/**
 * @module AlpacaJS - Logging for Node.js ✍️  with a opinionated theme 🎨  and configurable API  🍭
 * @author Krish Gupta <https://krshkodes.co>
 * @exports Alpaca
 */
const { createLogger, format } = require('winston')
const { Console } = require('winston/lib/winston/transports')

const deepmerge = require('deepmerge')
const emoji = require('node-emoji')
const nodeColors = require('colors')

/**
 * @typedef {Object} AlpacaOptions
 * @property {Object} [components] - Whether to include date, time, and emoji in the log message. Defaults all to true. Optional.
 * @property {Boolean} [components.date] - Whether to show date in the log. Default to true. optional.
 * @property {Boolean} [components.time] - Whether to show time in the log. Default to true. Optional.
 * @property {Boolean} [components.emoji] - Whether to show emojis in the log. Default to true. Optional.
 * @property {Boolean} [components.colors] - Whether to use colors in the log. Default to true. Optional.
 */

/**
 * @constant {AlpacaOptions} defaultOptions
 * @type {AlpacaOptions}
 * @default
 */
const defaultOptions = {
  components: {
    date: true,
    time: true,
    emoji: true,
    colors: true
  }
}

/**
 * @class
 * @classdesc Logging for Node.js ✍️  with a opinionated theme 🎨  and configurable API  🍭
 * @param {AlpacaOptions} [options=defaultOptions] - Options for the Alpaca logger. Defaults to the default options. Optional.
 * @returns {Alpaca} Returns an instance of the Alpaca Logger.
 * @example const logger = new Alpaca() // Create an instace of Alpaca with all components & minimumPriority to log being 'info' or 'note' [default]
 * @example const logger = new Alpaca({ components: { colors: false } }) // Create an instace of Alpaca with colors disabled & minimumPriority to log being 'info' or 'note' [default minimum priority]
 * @example const logger = new Alpaca({ minimumPriority: 'error' }) // Create an instace of Alpaca with minimumPriority to log being 'error' or 'success' [default components]
 */
class Alpaca {
  /**
   * @constructs Alpaca
   * @param {AlpacaOptions} [options=defaultOptions] - Options for the Alpaca logger. Defaults to the default options. Optional.
   * @returns {Alpaca} Returns an instance of the Alpaca Logger.
   * @hideconstructor
   */
  constructor (options) {
    console.log('')

    this.config = deepmerge(defaultOptions, options ?? {})

    this.levels = {
      success: 0,
      error: 0,
      warn: 1,
      info: 2,
      note: 2,
      debug: 3
    }

    this.logger = createLogger({
      level: 'debug',
      levels: this.levels,
      transports: [new Console()],
      format: format.printf((info) => {
        const DateTime = new Date()

        const date = `${DateTime.getDate()}/${DateTime.getMonth() + 1}/${DateTime.getFullYear()}`
        const time = `${DateTime.getHours()}:${DateTime.getMinutes()}:${DateTime.getSeconds()}`

        const components = []

        if (this.config?.components?.date) {
          components.push(this.config.components.colors ? nodeColors.gray(date) : date)
        }

        if (this.config?.components?.time) {
          components.push(this.config.components.colors ? nodeColors.gray(time) : time)
        }

        if (this.config?.components?.emoji) {
          components.push(this.levelEmoji(info.level))
        }

        components.push(this.config?.components?.colors ? this.levelColors(info.level) : info.level)

        return `${components.join(' ')} ${info.message}`
      })
    })
  }

  levelEmoji (level) {
    const levels = Object.keys(this.levels)
    if (!levels.includes(level)) { return this.log('error', `${level} is not a valid level`) }

    const emojiMap = {
      success: 'white_check_mark',
      error: 'x',
      warn: 'construction',
      info: 'loudspeaker',
      note: 'memo',
      debug: 'bug'
    }

    return emoji.emojify(`${emoji.get(emojiMap[level])}`)
  }

  levelColors (level) {
    const colors = {
      success: nodeColors.green,
      error: nodeColors.red,
      warn: nodeColors.yellow,
      info: nodeColors.blue,
      note: nodeColors.cyan,
      debug: nodeColors.gray
    }

    return colors[level](level)
  }

  log (level, message) {
    this.logger.log(level, message)
  }
}

module.exports = Alpaca
module.exports.default = Alpaca
