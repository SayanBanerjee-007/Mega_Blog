import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/database'
import storageService from '../appwrite/storage'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector(state => state.auth.userData)

  const isAuthor =
    post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then(post => {
        if (post) setPost(post)
        else navigate('/')
      })
    } else navigate('/')
  }, [slug, navigate])

  const deletePost = () => {
    databaseService.deletePost(post.$id).then(status => {
      if (status) {
        storageService.deleteImage(post.featuredImage)
        navigate('/')
      }
    })
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={storageService.getImagePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-36"
          />
        </div>
        <div className="flex justify-between">
          <div className="left">
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
          <div>
            {isAuthor && (
              <div className="">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="hover:bg-green-700 mr-3"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="hover:bg-red-700"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}
