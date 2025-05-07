import { Route, Routes} from 'react-router-dom';
import { useEffect } from "react";
import { Products } from "../../components/products/Products";
import { useProducts } from "../../shared/hooks/useProducts";
import { ProductView } from '../../components/products/ProductView';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ProductForm } from '../../components/products/ProductForm';
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