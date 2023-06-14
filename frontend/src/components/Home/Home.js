import styles from './Home.module.css';
import { CgMouse } from "react-icons/cg";
import Product from './Product.js';

const product = {
    name: 'T-shirt',
    price: '$200',
    _id: '1',
    images: [{ url: 'https://th.bing.com/th/id/OIP.VX1qaQUtfLP73Mg3C3GkhgHaHa?pid=ImgDet&rs=1' }]
};

const Home = () => {
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

            <h2 className={styles['home-heading']} id='home-heading'>
                Featured Products
            </h2>

            <div className={styles['container']} id='container'>
                <Product product={product}></Product>
                <Product product={product}></Product>
                <Product product={product}></Product>
                <Product product={product}></Product>
                <Product product={product}></Product>
                <Product product={product}></Product>
                <Product product={product}></Product>
                <Product product={product}></Product>
            </div>
        </>
    )
}

export default Home;