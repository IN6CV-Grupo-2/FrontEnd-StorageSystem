import { Route, Routes} from 'react-router-dom';
import { useEffect } from "react";
import { Products } from "../../components/products/Products";
import { useProducts } from "../../shared/hooks/useProducts";
import { ProductView } from '../../components/products/ProductView';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProductForm } from '../../components/products/ProductForm';
import Sidebar from '../../components/dashboard/sidebar';
import Navbar from '../../components/navbars/navbar';
import './products.css';

const ProductsPage = () => {
  
  
    const {getProducts, allProducts, isFetching } = useProducts();

    useEffect(() => {
      getProducts()
    },[])

    if(isFetching){
      return <LoadingSpinner/>
    }

  return(
    <div>
      <div className="layout d-flex flex-column">
        <Sidebar/>
        <Navbar/>
      </div>
      <Routes>
        <Route path='/' element={<Products products={allProducts}/>}/>
        <Route path='/new' element={<ProductForm modo='crear'/>}/>
        <Route path='/edit/:id' element={<ProductForm modo='editar'/>}/>
        <Route path='/:id' element={<ProductView getProducts={getProducts}/>}/>
      </Routes>
    </div>
  )
};

export default ProductsPage
