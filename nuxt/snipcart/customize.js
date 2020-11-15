import fs from 'fs'
import path from 'path'
import { minify } from 'html-minifier'

const minifiOptionsConfig = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  removeComments: true,
  quoteCharacter: '"',
}

const templateFileNames = fs.readdirSync(path.join(__dirname, 'templates'))

const fileStringArray = []
for (const fileName of templateFileNames) {
  const fileString = fs.readFileSync(
    path.join(__dirname, 'templates', fileName),
    {
      encoding: 'utf-8',
    }
  )
  fileStringArray.push(minify(fileString, minifiOptionsConfig))
}
// console.log(fileStringArray)

export default fileStringArray
