let fs = require('fs')
console.log('Creating symlinks ...')
if (fs.existsSync('node_modules/@rest-modules')) {
  console.log('link exists already ')
} else {
  let source = '../@rest-modules'
  console.log(`creating link for ${source}`)
  fs.symlinkSync(source, 'node_modules/@rest-modules', 'junction')
  console.log('done')
}