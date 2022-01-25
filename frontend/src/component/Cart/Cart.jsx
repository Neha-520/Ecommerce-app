import React from 'react';
import './Cart.css'
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';


const Cart = ({ history }) => {

    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (stock <= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;

        if (quantity <= 1) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    }

    const deleteCardItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkOutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <>
            <MetaData title="Cart" />
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <RemoveShoppingCartIcon />
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products"> View Products </Link>
                </div>
            ) : (
                <>
                    <div className='cartPage'>
                        <div className='cartHeader'>
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map((item, i) => (
                            <div className='cartContainer' key={i} >
                                <CartItemCard item={item} deleteCartItems={deleteCardItems} />
                                <div className='cartInput'>
                                    <button onClick={() => decreaseQuantity(item.productId, item.quantity)}>-</button>
                                    <input readOnly value={item.quantity} type="number" />
                                    <button onClick={() => increaseQuantity(item.productId, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className="cartSubtotal">
                                    {`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            {/* //for template grid */}
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                {/* reduce executes same funcn to all elements or array */}
                                <p>{`₹${cartItems.reduce((acc, item) =>
                                    acc + item.quantity * item.price, 0)}`}
                                </p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkOutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>)}
        </>
    );
};

export default Cart;
