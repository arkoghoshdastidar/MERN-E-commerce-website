import styles from './Home.module.css';
import { CgMouse } from "react-icons/cg";
import Product from './Product.js';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { clearError } from '../../actions/productActions';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error, productCount } = useSelector(state => state.products);
    const alert = useAlert();

    if(error){
        alert.show(error);
        dispatch(clearError());
    }

    return (
        <>
            <div className={styles['banner']}>
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS HERE</h1>
                <a href="#home-heading">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            {
                loading ? <Loader /> :
                    <>
                        <h2 className={styles['home-heading']} id='home-heading'>
                            Top Products
                        </h2>

                        <div className={styles['container']} id='container'>
                            {products && products.map((product) => {
                                return <Product key={product._id} product={product}></Product>
                            })
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Home;