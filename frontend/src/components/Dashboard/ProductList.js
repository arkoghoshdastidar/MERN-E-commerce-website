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
                        <h1>Product List Component</h1>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Dashboard;