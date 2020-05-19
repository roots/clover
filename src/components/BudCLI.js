import {join} from 'path'
import {existsSync} from 'fs'
import React, {useState, useEffect} from 'react'
import {Box, Color, Text, useApp, useStdout} from 'ink'
import Link from 'ink-link'
import Spinner from 'ink-spinner'
import {prompt} from 'enquirer'
import {bud as BudCore} from './../bud'

const DEFAULT_BUDFILE = {
  actions: [],
  label: 'Budfile',
  prompts: [],
}

/**
 * Bud CLI
 *
 * @prop {string} label
 * @prop {string} budFile
 * @prop {string} outDir
 * @prop {object} values
 * @prop {object} children
 * @prop {bool}   noClear
 */
const BudCLI = ({
  label,
  templateDir,
  sprout = DEFAULT_BUDFILE,
  outDir,
  values = null,
  inert = false,
  children,
  noClear = false,
}) => {
  /**
   * Parse values from .bud/bud.config.json
   */
  const config = join(process.cwd(), '.bud/bud.config.json')
  const [configData] = useState(existsSync(config) ? require(config) : null)

  /**
   * Parse values from prompt
   */
  const [prompts, setPrompts] = useState(!values && sprout.prompts ? sprout.prompts : null)

  const {exit} = useApp()
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(null)
  const [complete, setComplete] = useState(false)
  const [budSubscription, setBudSubscription] = useState(false)

  /**
   * Assemble data from config files, prompt & cli args/flags.
   */
  useEffect(() => {
    prompts
      ? prompt(prompts).then(data => {
          setPrompts(null)
          setData({
            ...(configData && configData.project ? configData.project : []),
            ...(configData && configData.dev ? configData.dev : []),
            ...data,
            ...(values ? values : []),
          })
        })
      : (() => {
          setPrompts(null)
          setData({
            ...(configData && configData.project ? configData.project : []),
            ...(configData && configData.dev ? configData.dev : []),
            ...(values ? values : []),
          })
        })()
  }, [])

  /**
   * Run the budfile actions
   */
  useEffect(() => {
    data &&
      !inert &&
      !budSubscription &&
      setBudSubscription(
        BudCore.init({
          data,
          templateDir,
          sprout,
          outDir,
        })
          .actions()
          .subscribe({
            next: next => setStatus(next),
            complete: () => setComplete(true),
          }),
      )
  }, [data, status])

  useEffect(() => {
    complete &&
      (async () => {
        await budSubscription.unsubscribe()
        exit()
      })()
  }, [complete, budSubscription])

  /**
   * Render TTY
   */
  return (
    <Box flexDirection="column" justifyContent="flex-start" padding={1}>
      <Box marginBottom={1} flexDirection="row" justifyContent="space-between">
        {label && <Text>{label}</Text>}
        <Box flexDirection="row">
          <Text>{`🌱`}</Text>
          <Text bold>
            <Link url="https://roots.io/bud">
              <Color green>{'  Bud'}</Color>
            </Link>
          </Text>
        </Box>
      </Box>

      <Tasks data={data} status={status} complete={complete} noClear={noClear} />

      {children && children}
    </Box>
  )
}

/**
 * Tasks
 */
const Tasks = ({data, status, complete, noClear}) => {
  const {stdout} = useStdout()
  useEffect(() => {
    data && !noClear && stdout.write('\x1B[2J\x1B[0f')
  }, [data])

  return status ? (
    <Box>
      {complete ? (
        <Color green>⚡️ All set.</Color>
      ) : (
        <Text>
          <Color green>
            <Spinner type="dots" />
          </Color>
          {` ${status}`}
        </Text>
      )}
    </Box>
  ) : (
    []
  )
}

export default BudCLI
