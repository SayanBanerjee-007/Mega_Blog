import conf from '../conf/conf'
import { Client, ID, Storage } from 'appwrite'

class StorageService {
  client = new Client()
  storage
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
    this.storage = new Storage(this.client)
  }
  async uploadImage(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log('Appwrite service :: uploadImage :: ' + error)
      return false
    }
  }
  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId)
      return true
    } catch (error) {
      console.log('Appwrite service :: deleteImage :: ' + error)
      return false
    }
  }
  getImagePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
  }
}

const storageService = new StorageService()

export default storageService
