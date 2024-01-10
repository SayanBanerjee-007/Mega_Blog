import { useEffect, useState } from 'react'
import databaseService from '../appwrite/database'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    databaseService.getPosts().then(posts => {
      if (posts) {
        setPosts(posts.documents)
      } else {
        setPosts([])
      }
    })
  }, [authStatus])

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-4xl font-bold">
                {authStatus
                  ? 'No post is available'
                  : 'Login to read posts'}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map(post => (
            <div
              key={post.$id}
              className="p-2 w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
