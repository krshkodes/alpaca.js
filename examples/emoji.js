const Alpaca = require('../index')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Your app doesn't need to be in a function, this is done only to use async/await with sleep
async function main () {
  const withEmoji = new Alpaca()

  withEmoji.log('debug', `VirusDetector v${require('../package.json').version}. CPU Architecture: ${process.arch}`)
  withEmoji.log('note', 'Found 8000 files to scan for viruses')
  withEmoji.log('info', 'Starting to scan all files...')
  withEmoji.log('success', 'Scanned & Recorded 8000 files')
  withEmoji.log('warn', 'deprecated-package is deprecated, please upgrade to new-package')
  withEmoji.log('error', 'TypeError: XYZConstant is not a constructor')

  await sleep(20 * 100)

  const withoutEmoji = new Alpaca({ components: { emoji: false } })

  withoutEmoji.log('debug', `VirusDetector v${require('../package.json').version}. CPU Architecture: ${process.arch}`)
  withoutEmoji.log('note', 'Found 8000 files to scan for viruses')
  withoutEmoji.log('info', 'Starting to scan all files...')
  withoutEmoji.log('success', 'Scanned & Recorded 8000 files')
  withoutEmoji.log('warn', 'deprecated-package is deprecated, please upgrade to new-package')
  withoutEmoji.log('error', 'TypeError: XYZConstant is not a constructor')

  await sleep(20 * 100)
}

main()
