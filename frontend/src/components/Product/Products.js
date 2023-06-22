import styles from './Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearError } from '../../actions/productActions';
import { useEffect } from 'react';
import Loader from '../../components/layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Product from '../Home/Product';
import { useNavigate, useParams} from "react-router-dom";

const Products = (props) => {
    const { loading, error, productCount, products } = useSelector(state => state.products);

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { keyword } = useParams();
    
    useEffect(() => {
        dispatch(getProducts(keyword));
    }, [dispatch, keyword]);

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    const clickHandler = (id) => {
        navigate('/product/'+id);
    }

    return (
        <>
            {
                loading ? <Loader /> : !error && <>
                    <h2 className={styles['heading']}>All Products</h2>
                    <div className={styles['all-products']}>
                        {
                            products.map((product) => {
                                return <div key={product._id} 
                                        onClick={() => clickHandler(product._id)} >
                                    <Product disableLink={true} product={product} />
                                </div>
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default Products;