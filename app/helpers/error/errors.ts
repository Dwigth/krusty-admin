/**
 * =============================================
 * 
 * Diccionario de los posibles codigos de errores 
 * que se puedan encontrar en los procesos.
 * 
 * =============================================
 */
export const ErrorDictionary = {
    100: { name: 'Continue' },
    101: { name: 'Switching Protocols' },
    200: { name: 'OK Everything is normal' },
    201: { name: 'Created' },
    202: { name: 'Accepted' },
    203: { name: 'Non - Authoritative Information' },
    204: { name: 'No Content' },
    205: { name: 'Reset Content' },
    206: { name: 'Partial Content' },
    300: { name: 'Multiple Choices' },
    301: { name: 'Moved Permanently', notes: 'Update your URL, this has moved for good.' },
    302: { name: 'Found' },
    303: { name: 'See Other' },
    304: { name: 'Not Modified' },
    305: { name: 'Use Proxy' },
    306: { name: 'Unused' },
    307: { name: 'Temporary', notes: `Redirect This is temporarly moved, don't update your bookmarks, notes:.` },
    400: { name: 'Bad Request', notes: `Server didn't understand the URL you gave it.` },
    401: { name: 'Unauthorized', notes: `Must be authenticated` },
    402: { name: 'Payment Required', notes: `Not used really` },
    403: { name: 'Forbidden', notes: `Server refuses to give you a file, authentication won't help` },
    404: { name: 'Not Found', notes: `A file doesn't exist at that address` },
    405: { name: 'Method Not Allowed', notes: `` },
    406: { name: 'Not Acceptable', notes: `` },
    407: { name: 'Proxy Authentication Required', notes: `` },
    408: { name: 'Request Timeout', notes: `Browser took too long to request something` },
    409: { name: 'Conflict', notes: `` },
    410: { name: 'Gone', notes: `` },
    411: { name: 'Lengh Required', notes: `` },
    412: { name: 'Precondition Failed', notes: `` },
    413: { name: 'Request Entity Too Large', notes: `` },
    415: { name: 'Unsupported Media Type', notes: `` },
    416: { name: 'Request Range Not Satisfiable', notes: `` },
    417: { name: 'Expectation Failed', notes: `` },
    500: { name: 'Internal Server Error', notes: `Something on the server didn't work right.` },
    501: { name: 'Not Implemented', notes: `` },
    502: { name: 'Bad Gateway', notes: `` },
    503: { name: 'Service Unavailable', notes: `Too busy to respond to a client` },
    504: { name: 'Gateway Timeout', notes: `` },
    505: { name: 'HTTP Version Not Supported', notes: `` }
}