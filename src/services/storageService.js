import config from '../constants/config'
import { Client, ID, Storage } from 'appwrite'

class StorageService {
	client = new Client()
	storage
	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId)
		this.storage = new Storage(this.client)
	}
	async uploadImage(file) {
		try {
			return await this.storage.createFile(
				config.appwriteBucketId,
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
			await this.storage.deleteFile(config.appwriteBucketId, fileId)
			return true
		} catch (error) {
			console.log('Appwrite service :: deleteImage :: ' + error)
			return false
		}
	}
	getImagePreview(fileId) {
		return this.storage.getFilePreview(
			config.appwriteBucketId,
			fileId
		) // Paid now
	}
	getImageView(fileId) {
		return this.storage.getFileView(config.appwriteBucketId, fileId)
	}
}

const storageService = new StorageService()

export default storageService
