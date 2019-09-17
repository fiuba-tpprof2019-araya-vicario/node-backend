import { google } from 'googleapis'
import fs from 'fs'
import { client_email, private_key } from './account-service-key.json'
import { getBadRequest } from '../util/error.js'

const drive = google.drive('v3')
const jwtClient = new google.auth.JWT(client_email, null, private_key, ['https://www.googleapis.com/auth/drive'], null)

jwtClient.authorize((authErr) => {
  if (authErr) {
    console.log(authErr)
    return
  }

  console.log('Authorization drive account service successfully')
})

export const listFiles = () => {
  // Make an authorized requests
  // List Drive files.
  drive.files.list({ auth: jwtClient }, (listErr, resp) => {
    if (listErr) {
      console.log(listErr)
      return
    }
    resp.data.files.forEach((file) => {
      console.log(`${file.name} (${file.mimeType})`)
    })
  })
}

const getFileMetadata = (fileName, parentId) => {
  return {
    name: fileName,
    parents: [parentId]
  }
}

const getFileMedia = (mimeType, filePath) => {
  return {
    mimeType,
    body: fs.createReadStream(filePath)
  }
}

const createFile = (fileName, filePath) => {
  return drive.files.create({
    auth: jwtClient,
    resource: getFileMetadata(fileName, process.env.FOLDER_FIUBA_DRIVE_ID),
    media: getFileMedia('application/pdf', filePath)
  })
}

const getSharedLink = (fileId) => {
  return drive.files.get({
    auth: jwtClient,
    fileId: fileId,
    fields: 'webViewLink'
  })
}

export const uploadFile = async (fileName, content) => {
  let createResponse = await createFile(fileName, content)

  if (createResponse === null) return Promise.reject(getBadRequest('No se pudo crear el archivo'))

  let getLinkResponse = await getSharedLink(createResponse.data.id)
  if (getLinkResponse === null) return Promise.reject(getBadRequest('No se pudo obtener el link a compartir'))

  return Promise.resolve({ link: getLinkResponse.data.webViewLink, name: fileName })
}

// const fileMetadata = {
//   name: 'neo.txt',
//   parents: ['1rHeQwJgr91vVMoCUWVSxNvTc_CUmpdo_']
// }

// const media = {
//   mimeType: 'text/plain',
//   body: fs.createReadStream('./neo.txt')
// }
