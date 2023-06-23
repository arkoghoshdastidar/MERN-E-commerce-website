import styles from './Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearError } from '../../actions/productActions';
import { useEffect, useState } from 'react';
import Loader from '../../components/layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Product from '../Home/Product';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const Products = (props) => {
    const { loading, error, productCount, products, resultPerPage } = useSelector(state => state.products);
    const [pageNo, setPageNo] = useState(1);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { keyword } = useParams();
    const count = (productCount && resultPerPage) ? Math.ceil(productCount / resultPerPage) : 0;

    useEffect(() => {
        dispatch(getProducts(keyword, pageNo));
    }, [dispatch, keyword, pageNo]);

    if (error) {
        alert.show(error);
        dispatch(clearError());
    }

    const clickHandler = (id) => {
        navigate('/product/' + id);
    }

    const changePageNo = (e, pageNo) => {
        setPageNo(pageNo);
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
                    {count > 1 && <div className={styles['pagination-container']}>
                        <Pagination count={count} onChange={changePageNo} page={pageNo}/>
                    </div>}
                </>
            }
        </>
    )
}

export default Products;