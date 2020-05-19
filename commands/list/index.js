import React, {useState, useEffect} from 'react'
import {Text, Box} from 'ink'
import Spinner from 'ink-spinner'
import Table from 'ink-table'
import BudCLI from '../../src/components/BudCLI'
import globby from 'globby'

/**
 * Budfile glob paths
 */
const rootsBudsGlob = `${process.cwd()}/node_modules/@roots/bud/src/budfiles/**/*.bud.js`
const moduleBudsGlob = `${process.cwd()}/node_modules/**/bud-plugin-*/*.bud.js`
const projectBudsGlob = `${process.cwd()}/.bud/**/*.bud.js`

/** Command: generate list */
/// List available budfiles
const List = () => {
  /**
   * Project buds
   */
  const [projectBuds, setProjectBuds] = useState([])
  useEffect(() => {
    projectBuds.length == 0 &&
      (async () => {
        const buds = await globby(projectBudsGlob)

        buds &&
          setProjectBuds(
            buds
              .map(bud => {
                const src = require(bud)
                return {
                  command: `yarn generate ${src.name}`,
                  source: 'project',
                  name: src.name,
                  description: src.description,
                }
              })
              .filter(bud => bud.name),
          )
      })()
  }, [])

  /**
   * Module buds
   */
  const [moduleBuds, setModuleBuds] = useState([])
  useEffect(() => {
    ;(async () => {
      const buds = await globby(moduleBudsGlob)

      buds &&
        setModuleBuds(
          buds
            .map(bud => {
              const src = require(bud)

              return {
                command: `yarn generate ${src.name}`,
                source: src.source ? src.source : null,
                name: src.name,
                description: src.description,
              }
            })
            .filter(bud => bud.name),
        )
    })()
  }, [])

  /**
   * Module buds
   */
  const [rootsBuds, setRootsBuds] = useState([])
  useEffect(() => {
    rootsBuds.length == 0 &&
      (async () => {
        const buds = await globby(rootsBudsGlob)

        buds &&
          setRootsBuds(
            buds
              .map(bud => {
                const src = require(bud)
                return src.name !== 'bud' && src.name !== 'init'
                  ? {
                      command: `yarn generate ${src.name}`,
                      source: '@roots/bud',
                      name: src.name,
                      description: src.description,
                    }
                  : {}
              })
              .filter(bud => bud.name),
          )
      })()
  }, [])

  const buds = [...projectBuds, ...rootsBuds, ...moduleBuds]

  /**
   * Render
   */
  return (
    <>
      <BudCLI label={'Available commands'} inert={true}>
        <Box flexDirection="column" marginTop={1} marginBottom={1}>
          {!moduleBuds.length > 0 && (
            <Box flexDirection="row" marginBottom={1} alignItems="center">
              <Spinner type="monkey" /> <Text>Looking for modules</Text>
            </Box>
          )}
          <Box width={200} flexDirection="column" flexGrow={1} justifyContent="space-between">
            {buds.length > 0 && <Table width={200} data={buds} />}
          </Box>
        </Box>
      </BudCLI>
    </>
  )
}

export default List
