import { use, useState } from "react";
import toast from "react-hot-toast";
import { getProducts as getProductsRequest} from "../../services/api";

export const useProducts = () => {
    const [products, setProducts] = useState(null);

    const getProducts = async () => {
        const productsData = await getProductsRequest();

        if(productsData.error){
            return toast.error(
                productsData.e?.response?.data || 'Error to show the products'
            )
        }

        /*if(!isLogged){
            return setProducts({
                products: productsData.data.products
            })
        }*/
    }

    return {
        getProducts,
        isFetching: !Boolean(products),
        allProducts: products?.products
    }
}