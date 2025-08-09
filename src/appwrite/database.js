import conf from '../conf/conf'
import { Client, Databases, Query } from 'appwrite'

class DatabaseService {
	client = new Client()
	database
	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId)
		this.database = new Databases(this.client)
	}
	async createPost({
		title,
		slug,
		content,
		featuredImage,
		status,
		userId,
	}) {
		try {
			return await this.database.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
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
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.database.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
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
	async deletePost(slug) {
		try {
			await this.database.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			)
			return true
		} catch (error) {
			console.log('Appwrite service :: deletePost :: ' + error)
			return false
		}
	}
	async getPost(slug) {
		try {
			return await this.database.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			)
		} catch (error) {
			console.log('Appwrite service :: getPost :: ' + error)
			return false
		}
	}
	async getPosts(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.database.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
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
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
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
