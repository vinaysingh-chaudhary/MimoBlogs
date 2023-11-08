import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage, ErrorPage,ReadBlog, CreateBlog, EditBlog, LoginPage, SignUpPage, AboutPage, CategoryPage } from './Pages/PageConfig.js'
import { AuthLayout } from './Components/compConfig.js'



const routeConfig = createBrowserRouter([
  { 
    path :  "/",
    element : <App />,
    errorElement : <ErrorPage />,
    children : [

        {
          path : "/", 
          element: <HomePage /> 
        },
        {
          path : "/login", 
          element: (
            <AuthLayout authentication={false}>
                <LoginPage />
            </AuthLayout>)
        },
        {
          path : "/signup", 
          element: (
            <AuthLayout authentication={false}>
                <SignUpPage />
            </AuthLayout>)
        },
        {
          path : "/blog/:id", 
          element: (<ReadBlog />)
        },
        {
          path : "/category/:category", 
          element: (<CategoryPage />)
        },
        {
          path : "/edit/:id", 
          element: (
            <AuthLayout authentication>
                <EditBlog />
            </AuthLayout>)
        },
        {
          path : "/create", 
          element: (
            <AuthLayout authentication>
                <CreateBlog />
            </AuthLayout>)
        },
        {
          path : "/about", 
          element: (<AboutPage />)
        },
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routeConfig} />
  </Provider>

)
