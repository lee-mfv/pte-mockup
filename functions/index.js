const glob = require('glob')
const camelCase = require('camelcase')
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const settings = { timestampsInSnapshots: true }
const config = functions.config().firebase

admin.initializeApp(config)
admin.firestore().settings(settings)

const files = glob.sync('./**/*.f.js', { cwd: __dirname, ignore: './node_modules/**' })
for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f]
  const functionName = camelCase(file.slice(0, -5).split('/').join('_')) // Strip off '.f.js'
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file)
  }
}

const files2 = glob.sync('./**/*.api.js', { cwd: __dirname, ignore: './node_modules/**' })
for (let f = 0, fl = files2.length; f < fl; f++) {
  const file2 = files2[f]
  const patterns = file2.slice(0, -7).split('/');
  const functionName = patterns[patterns.length - 1]
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(file2)
  }
}
