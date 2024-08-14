import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from './Layout';
import Body from './components/Body'
import Cart from './components/Cart.jsx'
import ErrorPage from './components/ErrorPage'
import NotFound from './components/NotFound';
import './main.css'
import { CartContext } from './context/CartContext';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Body/>,
      },
      {
        path:'cart',
        element: <Cart/>,
      },
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContext>
      <RouterProvider router={router} />
      </CartContext>
  </StrictMode>,
)
