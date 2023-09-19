class MessageFactory {
  createMessage (type, msgObj) {
    const objTypes = {
      [MsgTypes.ERROR]: new ErrorMessage(msgObj),
      [MsgTypes.SUCCESS]: new SuccessMessage(msgObj)
    }
    return objTypes[type] ?? new Error('Invalid message type')
  }
}
export const messageFactory = new MessageFactory()

export const MsgTypes = {
  NOT_FOUND: 'not found',
  SERVER_ERROR: 'server error',
  BAD_REQUEST: 'bad request',
  UNAUTHORIZED: 'unauthorized',
  SUCCESS: 'success',
  ERROR: 'error'
}

class ErrorMessage {
  constructor ({ status, msg }) {
    this.ok = false
    this.status = status
    this.msg = msg
  }
}
class SuccessMessage {
  constructor ({ status, msg, data }) {
    this.ok = true
    this.status = status
    this.msg = msg
    this.data = data || {}
  }
}
