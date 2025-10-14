
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import MainItems from './pages/MainItems';
import CartItems from './pages/CartItems';
import { Filter } from './components/filter';
import MainLayout from './MainLayout';
import { AddProducts } from './components/AddProducts';

function App() {
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainItems /> },
      { path: "/cart", element: <CartItems /> },
      {path:"/Add", element:<AddProducts/>}
    ]
  }
]);
  return (
    <>

      <RouterProvider router={router}/>

    </>
  )
}

export default App
