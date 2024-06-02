import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import Banner from '../components/Banner';
import FeaturedProduct from '../components/FeaturedProduct';
import FragnanceProduct from '../components/FragnanceProduct';
import AkEnterprise from '../components/AkEnterprise';
import { Circles } from 'react-loader-spinner';

function Home() {
    const [loading, setLoading] = useState(true);
    const authState = useSelector((state) => state.auth);
    const user = authState?.user;

    useEffect(() => {
        // Simulate loading for demonstration
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust time as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <Circles
                    height="100"
                    width="100"
                    color="#000"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    return (
        <div>
            <div>
                <Banner />
            </div>
            {user ? (
                <>
                    <div>
                        <FeaturedProduct />
                    </div>
                    <div>
                        <FragnanceProduct />
                    </div>
                    <div>
                        <AkEnterprise />
                    </div>
                </>
            ) : (
                <div className="login-message">
                    <h2>Please log in to see our products</h2>
                </div>
            )}
        </div>
    );
}

export default Home;
