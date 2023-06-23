import styles from './Products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, clearError } from '../../actions/productActions';
import { useEffect, useState } from 'react';
import Loader from '../../components/layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Product from '../Home/Product';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import NoReview from './NoReview';

const Products = (props) => {
    const MIN_PRICE = 100;
    const MAX_PRICE = 10000;
    const STEPS = 1000;
    const { loading, error, productCount, products, resultPerPage } = useSelector(state => state.products);
    const [pageNo, setPageNo] = useState(1);
    const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
    const [finalPrice, setFinalprice] = useState([MIN_PRICE, MAX_PRICE]);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { keyword } = useParams();
    const count = (productCount && resultPerPage) ? Math.ceil(productCount / resultPerPage) : 0;

    useEffect(() => {
        dispatch(getProducts(keyword, pageNo, finalPrice));
    }, [dispatch, keyword, pageNo, finalPrice]);

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

    const sliderHandler = (e, val) => {
        setPrice(val);
    }

    const finalpriceHandler = (e, val) => {
        setFinalprice(val);
    }

    const marks = [
        {
            value: MIN_PRICE,
            label: `₹${MIN_PRICE}`
        },
        {
            value: MAX_PRICE,
            label: `₹${MAX_PRICE}`
        }
    ]

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

                    {products.length === 0 && <NoReview text={"No Products"} />}

                    <div className={styles['slider-container']}>
                        <div>Filter Price</div>
                        <Slider
                            aria-label="Price filter"
                            valueLabelDisplay="auto"
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            marks={marks}
                            value={price}
                            step={STEPS}
                            onChange={sliderHandler}
                            onChangeCommitted={finalpriceHandler}
                            color="primary"
                        />
                    </div>

                    {count > 1 && <div className={styles['pagination-container']}>
                        <Pagination 
                            count={count} 
                            onChange={changePageNo} 
                            page={pageNo} 
                            color="primary"
                            variant="outlined"
                        />
                    </div>}
                </>
            }
        </>
    )
}

export default Products;