import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '../components'
import App from '../App'
import {
	Home,
	Login,
	Signup,
	MyPosts,
	EditPost,
	AddPost,
	Post,
	Account,
} from '../pages'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: (
					<AuthLayout authentication={false}>
						<Login />
					</AuthLayout>
				),
			},
			{
				path: '/signup',
				element: (
					<AuthLayout authentication={false}>
						<Signup />
					</AuthLayout>
				),
			},
			{
				path: '/account',
				element: (
					<AuthLayout authentication>
						<Account />
					</AuthLayout>
				),
			},
			{
				path: '/my-posts',
				element: (
					<AuthLayout authentication>
						<MyPosts />
					</AuthLayout>
				),
			},
			{
				path: '/add-post',
				element: (
					<AuthLayout authentication>
						<AddPost />
					</AuthLayout>
				),
			},
			{
				path: '/edit-post/:slug',
				element: (
					<AuthLayout authentication>
						<EditPost />
					</AuthLayout>
				),
			},
			{
				path: '/post/:slug',
				element: <Post />,
			},
		],
	},
])
