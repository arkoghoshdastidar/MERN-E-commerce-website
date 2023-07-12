import styles from './Dashboard.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();
    const role = (user === undefined) ? undefined : user.user === undefined ? undefined : user.user.role;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);

    if (role !== 'admin') {
        navigate('/login');
    }

    return (
        <>
            {loading ? <Loader /> : <>
                <div className={styles['dashboard']}>
                    <Sidebar />
                    <div className={styles['details-board']}>
                        <h1>Welcome Back To The Dashboard</h1>
                        <div className={styles['total-amount']}>Total ₹50</div>
                        <div className={styles['summary']}>
                            <div>Products <br/> <span>150</span></div>
                            <div>Users <br/> <span>10</span></div>
                            <div>Orders <br/> <span>100</span></div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Dashboard;