// use this when a successful result needs to be sent to the client
function createSuccess(data) {
  return { status: 'success', data }
}

// use this when an error needs to be sent to the client
function createError(error) {
  return { status: 'error', error }
}

// use this send the error or success automatically
function createResult(error, data) {
  return error ? createError(error) : createSuccess(data)
}

module.exports = {
  createError,
  createSuccess,
  createResult,
}
