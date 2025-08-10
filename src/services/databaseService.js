import config from '../constants/config'
import { Client, Databases, Query, ID } from 'appwrite'

class DatabaseService {
	client = new Client()
	database
	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId)
		this.database = new Databases(this.client)
	}
	async createPost({
		title,
		content,
		featuredImage,
		status,
		userId,
	}) {
		try {
			return await this.database.createDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				ID.unique(),
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			)
		} catch (error) {
			console.log('Appwrite service :: createPost :: ' + error)
			return false
		}
	}
	async updatePost(
		postId,
		{ title, content, featuredImage, status }
	) {
		try {
			return await this.database.updateDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				postId,
				{
					title,
					content,
					featuredImage,
					status,
				}
			)
		} catch (error) {
			console.log('Appwrite service :: updatePost :: ' + error)
			return false
		}
	}
	async deletePost(postId) {
		try {
			await this.database.deleteDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				postId
			)
			return true
		} catch (error) {
			console.log('Appwrite service :: deletePost :: ' + error)
			return false
		}
	}
	async getPost(postId) {
		try {
			return await this.database.getDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				postId
			)
		} catch (error) {
			console.log('Appwrite service :: getPost :: ' + error)
			return false
		}
	}
	async getPosts(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.database.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				queries
			)
		} catch (error) {
			console.log('Appwrite service :: getPosts :: ' + error)
			return false
		}
	}

	// Method to get posts with search
	async searchPosts(searchTerm, queries = []) {
		try {
			const searchQueries = [
				...queries,
				Query.search('title', searchTerm),
			]
			return await this.database.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				searchQueries
			)
		} catch (error) {
			console.log('Appwrite service :: searchPosts :: ' + error)
			return false
		}
	}
}

const databaseService = new DatabaseService()

export default databaseService
