
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/Navbar';
import MainItems from './pages/MainItems';
import CartItems from './pages/CartItems';

function App() {
 
const router = createBrowserRouter([
  {
    path:"/",
    element: <MainItems/>
  },
  {
    path:"/cart",
    element:<CartItems/>
  }
])
  return (
    <>
      <RouterProvider router={router}>
      <MainItems/>
      <CartItems/>
      </RouterProvider>
    </>
  )
}

export default App
