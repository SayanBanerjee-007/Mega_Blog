import React from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from './router'
import { store } from './store'
import { ErrorBoundary } from './components'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>
)
