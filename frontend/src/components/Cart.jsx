import React, { useState, useEffect } from 'react';
import './Cart.css';
import { FiLock } from 'react-icons/fi';
import { FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartProduct, getUserProdCart, updateCartProduct } from '../features/user/userSlice';
import { Circles } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function Cart() {
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserProdCart()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(updateCartProduct({ cartItemId: productUpdateDetail.cartItemId, quantity: productUpdateDetail.quantity }));
      setTimeout(() => {
        dispatch(getUserProdCart());
      }, 200);
    }
  }, [productUpdateDetail, dispatch]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserProdCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    userCartState?.forEach(item => {
      sum += (Number(item.quantity) * item.price);
    });
    setTotalAmount(sum);
  }, [userCartState]);

  if (loading) {
    return (
      <div className="loader-container">
        <Circles
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 cart-header">
          <div>
            <Link to='/'>
              <h2 className='Al-Akbar'>Al-Akbar</h2>
            </Link>
          </div>
          <div className='slide-cart-div'>
            <h5>Bag <span>-------</span></h5>
            <h5>Address<span> -------</span></h5>
            <h5>Payment</h5>
          </div>
          <div className='secure-div'>
            <FiLock className="secure-icon" />
            <h5>100% Secure</h5>
          </div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5 lg-6">
          <h2>Your Orders</h2>
          {userCartState && userCartState.length > 0 ? (
            userCartState.map((item, index) => (
              <div key={index} className="card mb-3 card-div">
                <div className="card-body card-body-div">
                  <div className="parent-cart-element">
                    <div>
                      {item.productId && item.productId.images && item.productId.images.length > 0 && (
                        <img
                          src={item.productId.images[0].url}
                          className="card-img-top-product img-fluid"
                          alt="Product"
                        />
                      )}
                    </div>
                    <div className="product-title">
                      <h2>{item.productId?.title}</h2>
                      <h2 className='brand-title'>{item.productId?.brand}</h2>
                    </div>
                  </div>
                </div>
                <div className="price-quantity">
                  <div>
                    <h5>Rs: <span className='money'>{item?.price * item?.quantity}</span></h5>
                  </div>
                </div>
                <div className="btn-remove-div">
                  <button className="btn-remove" onClick={() => { deleteACartProduct(item?._id) }}>Remove</button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <div className="empty-cart-message">
              <h2>Your cart is empty</h2>
              <p>Browse our products and add items to your cart.</p>
              <Link to="/" className="btn btn-primary">Go to Home</Link>
            </div>
          )}
        </div>
        <div className="col-md-4 lg-6">
          <h2>Orders Details</h2>
          <div className="card mb-3">
            <div className="card-body">
              <div>
                <h6 className='coupon-title'>COUPONS</h6>
                <div className="price-apply-coupon-div">
                  <div className='coupon-1'>
                    <FaTag />
                    <h6>Apply coupon</h6>
                  </div>
                  <div>
                    <button className='btn-coupon p-2'>APPLY</button>
                  </div>
                </div>
                <div>
                  <h6 className='know'>
                    Know More
                  </h6>
                </div>
              </div>
              <hr />
              <div>
                <h5>Price Detail({userCartState?.length} item{userCartState?.length > 1 ? 's' : ''})</h5>
              </div>
              <div className="price-detail-div">
                <p>Total MRP</p>
                <h6>₹{totalAmount}</h6>
              </div>
              <div className="price-discount-div">
                <p>Discount On MRP</p>
                <h6>₹{totalAmount * 0.1}</h6>
              </div>
              <div className="price-coupon-div">
                <p>Coupon Discount</p>
                <h6>Apply Coupon</h6>
              </div>
              <div className="price-shipping-div">
                <p>Shipping Free <span>Know More</span></p>
                <h6>Apply Coupon</h6>
              </div>
              <hr />
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="price-total-div">
                  <p>Total Amount</p>
                  <h6>₹{totalAmount}</h6>
                </div>
              )}
              <div className="btn-place-order">
                <button className='btn-place'><Link to='/checkout'>CHECKOUT</Link></button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}

export default Cart;
