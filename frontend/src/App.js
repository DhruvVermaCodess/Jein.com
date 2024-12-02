import './App.css';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProductPage from './pages/ProductPage'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/CreateProduct'
import EditAndDeleteProducts from './pages/admin/EditAndDeleteProducts';
import User from './pages/admin/User'
import Navbar from './components/Navbar'
import ProductDetailsPage from './pages/ProductDetailsPage'
import PrivateComponent from './components/PrivateComponent'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import CategoryPage from './pages/CategoryPage';
import SearchResultPage from './pages/SearchResults';
import ReactWebcam from './pages/ReactWebcam'
import CartPage from './pages/CartPage';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/allProducts' element={<ProductPage/>} />
        <Route path='/product/:id' element={<ProductDetailsPage/>} />
        <Route path='/category/:category' element={<CategoryPage/>} />
        <Route path='/search' element={<SearchResultPage/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/admin' element={<PrivateComponent><AdminPage/></PrivateComponent>}>
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='product' element={<Products/>} />
          <Route path='editAndDelete' element={<EditAndDeleteProducts/>} />
          <Route path='user' element={<User/>} />
        </Route>
        <Route path='/cam' element={<ReactWebcam/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
