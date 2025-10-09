
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AddProduct from './components/products/AddProduct'
import PrivateRoute from './components/common/PrivateRoute'
import EditProduct from './components/products/EditeProduct'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ProductListPage from './pages/ProductListPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetails from './components/products/ProductDetails'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import ProfilePage from './pages/ProfilePage'
  const App = () =>{
    return(
      
        <Router>
          <AuthProvider>
          <div className='d-flex flex-colum min-vh-100'>
            <Navbar/>
           
            <main className='flex-grow-1'>
              <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>


                {/* Mention privateRoute memmber */}
                <Route path ="/addproduct" element={<PrivateRoute>
                  <AddProduct/>
                  </PrivateRoute>}/>
                  <Route path="/product-update/:id"
                  element={<PrivateRoute>
                    <EditProduct/>
                  </PrivateRoute>}/>
                  <Route path="/products-list"element={<ProductListPage/>}/>
                  <Route path="/carts"element={<PrivateRoute>
                    <CartPage/>
                  </PrivateRoute>}/>
                  <Route path="/orders" element={
                    <PrivateRoute><OrderPage/></PrivateRoute>
                  }/>
                  <Route path="/profile-update/" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>

              </Routes>

            </main>
          </div>
          <Footer/>
          </AuthProvider>
          </Router>
          
         
        
    )
  }

export default App
