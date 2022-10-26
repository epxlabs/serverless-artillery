const { execSync } = require('child_process')
const path = require('path')

const sls = 'serverless'

let slsFound = null

try {
  // eslint-disable-next-line global-require, import/no-unresolved, import/no-extraneous-dependencies
  slsFound = require(sls) // eslint-disable-line import/no-dynamic-require
  slsFound.dirname = require.resolve(sls)
  slsFound.resolveCliArgs = require(`${sls}/lib/cli/resolve-input`)
} catch (ex) {
  const npmGlobalRoot = execSync('npm -g root', { encoding: 'utf-8' }).trim()
  const slsGlobal = path.join(npmGlobalRoot, sls)

  // eslint-disable-next-line import/no-dynamic-require, global-require
  slsFound = require(slsGlobal) // throws if not globally installed
  slsFound.dirname = require.resolve(slsGlobal)
  slsFound.resolveCliArgs = require(`${slsGlobal}/lib/cli/resolve-input`)
}

module.exports = slsFound
