import styles from './Dashboard.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';

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
                <div>Dashboard</div>
            </>}
        </>
    )
}

export default Dashboard;