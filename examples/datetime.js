const Alpaca = require('../index')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Your app doesn't need to be in a function, this is done only to use async/await with sleep
async function main () {
  const withDate = new Alpaca({ components: { time: false } })

  withDate.log('debug', `VirusDetector v${require('../package.json').version}. CPU Architecture: ${process.arch}`)
  withDate.log('note', 'Found 8000 files to scan for viruses')
  withDate.log('info', 'Starting to scan all files...')
  withDate.log('success', 'Scanned & Recorded 8000 files')
  withDate.log('warn', 'deprecated-package is deprecated, please upgrade to new-package')
  withDate.log('error', 'TypeError: XYZConstant is not a constructor')

  await sleep(20 * 100)

  const withTime = new Alpaca({ components: { date: false } })

  withTime.log('debug', `VirusDetector v${require('../package.json').version}. CPU Architecture: ${process.arch}`)
  withTime.log('note', 'Found 8000 files to scan for viruses')
  withTime.log('info', 'Starting to scan all files...')
  withTime.log('success', 'Scanned & Recorded 8000 files')
  withTime.log('warn', 'deprecated-package is deprecated, please upgrade to new-package')
  withTime.log('error', 'TypeError: XYZConstant is not a constructor')

  await sleep(20 * 100)

  const withBoth = new Alpaca()

  withBoth.log('debug', `VirusDetector v${require('../package.json').version}. CPU Architecture: ${process.arch}`)
  withBoth.log('note', 'Found 8000 files to scan for viruses')
  withBoth.log('info', 'Starting to scan all files...')
  withBoth.log('success', 'Scanned & Recorded 8000 files')
  withBoth.log('warn', 'deprecated-package is deprecated, please upgrade to new-package')
  withBoth.log('error', 'TypeError: XYZConstant is not a constructor')

  await sleep(20 * 100)
}

main()
