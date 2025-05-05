import { Route, Routes} from 'react-router-dom';
import { useEffect } from "react";
import { Products } from "../../components/products/Products";
import { useProducts } from "../../shared/hooks/useProducts";
import { getProducts } from '../../services/api';
import { ProductView } from '../../components/products/ProductView';

const ProductsPage = () => {
  
  useEffect(() => {
    const getProducts = useProducts();
  }, []);

  return(
    <div>
      <Routes>
        <Route path='/' element={<Products products={getProducts}/>}/>
        <Route path='/:id' element={}/>
      </Routes>
    </div>
  )
};

export default ProductsPage