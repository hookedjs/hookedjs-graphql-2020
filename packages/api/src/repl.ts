import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'

const datasource = fs.readFileSync(path.join(__dirname, '../prisma/datasource.prisma'))

const moduleFiles = glob.sync("src/**/*.prisma", {})

const modules = moduleFiles.reduce((a,f) => {
  const module = fs.readFileSync(f)
  return a + module
}, '')

const schemaRaw = datasource + modules
const schemaMerged = prismaSchemaMergeExtends(schemaRaw)

fs.writeFileSync('prisma/schema.prisma', schemaMerged)

function prismaSchemaMergeExtends(schema: string) {
  const noExtends = schema.replace(/extends [^{]*[^}]*\}/sg, '')
  const onlyExtends = schema.match(/extends [^{]*[^}]*\}/sg) || []

  let merged = noExtends
  onlyExtends.forEach(extension => {
    const [_, extendsTo, extendsWith] = extension.match(/extends ([^ ]* [^ ]*) \{([^}]*)/) as string[]
    const extendsToRegExp = new RegExp(`${extendsTo}[^}]*}`)
    const extendsToNext = merged.match(extendsToRegExp)![0].replace('}', extendsWith + '}')
    // process.stdout.write(JSON.stringify(test, null, 2).replace(/\\n/g, '\n'))
    merged = merged.replace(extendsToRegExp, extendsToNext)
  })
  return merged
}