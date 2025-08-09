import { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import databaseService from '../appwrite/database'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
	const [post, setPosts] = useState(null)
	const { slug } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (slug) {
			databaseService.getPost(slug).then(post => {
				if (post) {
					setPosts(post)
				}
			})
		} else {
			navigate('/')
		}
	}, [slug, navigate])
	return post ? (
		<Container>
			<div className="py-8">
				<PostForm post={post} />
			</div>
		</Container>
	) : null
}

export default EditPost
