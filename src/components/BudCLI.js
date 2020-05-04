import React, {useState, useEffect} from 'react'
import {Box, Static, Color, Text} from 'ink'
import Divider from 'ink-divider'
import Link from 'ink-link'
import {prompt} from 'enquirer'
import {bud as BudCore} from './../bud'

const DEFAULT_BUDFILE = {actions: [], label: 'Budfile', prompts: []}

/**
 * Bud CLI
 *
 * @prop {string} budFile
 * @prop {string} outDir
 */
const BudCLI = ({
  label,
  budFile = DEFAULT_BUDFILE,
  outDir,
  command = null,
  children,
}) => {
  const interpolatedPrompts =
    !command && budFile.prompts ? budFile.prompts : null
  const [prompts, setPrompts] = useState(interpolatedPrompts)

  const [data, setData] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    ;(async () => {
      !command
        ? prompt(prompts).then(answers => {
            setPrompts(null)
            setData(answers)
          })
        : (() => {
            setPrompts(null)
            setData(command)
          })()
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      data &&
        (await BudCore.init({
          data,
          budFile,
          outDir,
        })
          .actions()
          .subscribe({
            next: message => setMessage(message),
            complete: message => setMessage(message),
          }))
    })()
  }, [data])

  return (
    <Box flexDirection="column" justifyContent="flex-start">
      <ViewMast label={label} />
      {children && children}
      {!command && message && (
        <Box marginTop={1} marginBottom={1}>
          <Text>{message}</Text>
        </Box>
      )}
    </Box>
  )
}

/**
 * Application Mast
 *
 * @prop {string} label
 */
const ViewMast = ({label}) => (
  <Static>
    <Box flexDirection="column">
      <Box
        width={50}
        marginTop={1}
        flexDirection="row"
        justifyContent="space-between">
        {label && (
          <Box>
            <Text>{label}</Text>
          </Box>
        )}
        <Box flexDirection="row">
          <Box>
            <Text>{`🌱`}</Text>
          </Box>

          <Box marginLeft={1}>
            <Text bold>
              <Link url="https://roots.io/bud">
                <Color green>{'Bud'}</Color>
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
      <Divider padding={0} />
    </Box>
  </Static>
)

export default BudCLI