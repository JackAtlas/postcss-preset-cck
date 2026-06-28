import consola from 'consola'

interface RunMessages {
  info: string
  success: string
  error: string
}

export async function run<T>(
  script: Promise<T>,
  messages: RunMessages,
  onError?: () => Promise<void>
) {
  consola.info(messages.info)
  try {
    const response = await script
    consola.success(messages.success)
    return response
  } catch (err) {
    consola.error(messages.error)
    consola.error(err)

    if (onError) {
      await onError()
    }

    process.exit(1)
  }
}
