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

// const listFiles = () => {
//   // Make an authorized requests
//   // List Drive files.
//   drive.files.list({ auth: jwtClient }, (listErr, resp) => {
//     if (listErr) {
//       console.log(listErr)
//       return
//     }
//     resp.data.files.forEach((file) => {
//       console.log(`${file.name} (${file.mimeType})`)
//     })
//   })
// }

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

const createFile = (fileName, filePath, folder) => {
  return drive.files.create({
    auth: jwtClient,
    resource: getFileMetadata(fileName, folder),
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

export const uploadProposalFile = async (fileName, content) => {
  let createResponse = await createFile(fileName, content, process.env.PROPOSAL_FOLDER_FIUBA_DRIVE_ID)

  if (createResponse === null) return Promise.reject(getBadRequest('No se pudo crear el archivo'))

  let getLinkResponse = await getSharedLink(createResponse.data.id)
  if (getLinkResponse === null) return Promise.reject(getBadRequest('No se pudo obtener el link a compartir'))

  return Promise.resolve({ id: createResponse.data.id, link: getLinkResponse.data.webViewLink, name: fileName })
}

export const uploadRequirementFile = async (fileName, content) => {
  let createResponse = await createFile(fileName, content, process.env.REQUIREMENT_FOLDER_FIUBA_DRIVE_ID)

  if (createResponse === null) return Promise.reject(getBadRequest('No se pudo crear el archivo'))

  let getLinkResponse = await getSharedLink(createResponse.data.id)
  if (getLinkResponse === null) return Promise.reject(getBadRequest('No se pudo obtener el link a compartir'))

  return Promise.resolve({ id: createResponse.data.id, link: getLinkResponse.data.webViewLink, name: fileName })
}

export const removeFile = (fileId) => {
  return drive.files.delete({ auth: jwtClient, fileId: fileId })
}
