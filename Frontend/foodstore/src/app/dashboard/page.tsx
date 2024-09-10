'use client'
import { getData } from './getdata';
import React from 'react';
import './dashboard.css';
import Modal from '@/components/order confirm modal/modal';

//icons
import { FaCartPlus } from 'react-icons/fa';
import { BsCartDash } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

//react hooks
import { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
    interface Meal {
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
        price?: number;
    }

    const [modal, setModal] = useState(false);
    const [cart, setAddCart] = useState<Meal[]>([]);
    const [data, setData] = useState<Meal[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetch() {
            const result = await getData();
            console.log(result.meals, "results....");
            const mealsWithPrice = result.meals.map((meal: Meal) => ({
                ...meal,
                price: 6.50,
            }));
            setData(mealsWithPrice);
        }
        fetch();
    }, []);

    useEffect(() => {
        function orderTotal() {
            let total = 0;
            for (let i = 0; i < cart.length; i++) {
                total += cart[i].price || 0;
            }
            setTotal(total);
            console.log(total, "Total");
        }
        orderTotal();
    }, [cart]);

    function orderConfirm() {
        setModal(true);
    }

    function closeModal() {
        setModal(false);
    }

    function resetCart() {
        setAddCart([]);
        setTotal(0);
        setModal(false);
    }

    const addToCart = (item: Meal) => {
        console.log(item);
        const copy = [...cart];
        copy.push(item);
        setAddCart(copy);
        console.log(cart);
    };

    function remove(index: number) {
        const copy = [...cart];
        copy.splice(index, 1);
        setAddCart(copy);
    }

    return (
        <div className="container1">
            <div className='container-space'>
                <div className='left-div'>
                    <h1 className='heading'>Desserts</h1>
                    <div className='images-div'>
                        {data && data.map((item, index) => (
                            <div className='item-main-div' key={item.idMeal}>
                                <div className='item-div'>
                                    <img className='img' src={item.strMealThumb} alt={item.strMeal} />
                                    <button className='cart-btn' onClick={() => addToCart(item)}>
                                        <FaCartPlus style={{ color: '#a56955', fontSize: '17px' }} /> Add to Cart
                                    </button>
                                </div>
                                <p className='text2'>{item.strMeal}</p>
                                <p className='text3'>$6.50</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='right-div'>
                    {cart.length > 0 ? (
                        <div className='cart-div-order'>
                            <h3>Your Cart {cart.length}</h3>

                            <div className='cart-divs'>
                                {cart.map((item, index) => (
                                    <div className='cart-item' key={item.idMeal}>
                                        <div className='cart-text'>
                                            <p className='p1'>{item.strMeal}</p>
                                            <p className='p2'><span>1x</span>&nbsp;&nbsp;&nbsp;@{item.price} &nbsp;<span>${item.price}</span></p>
                                        </div>
                                        <div className='cart-cancel-img'>
                                            <MdCancel style={{ color: 'rgb(192, 192, 192)', cursor: 'pointer' }} onClick={() => remove(index)} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='total'>
                                <div>
                                    <p className='p4'>Order Total</p>
                                </div>
                                <div>
                                    <p className='p5' >${total}</p>
                                </div>
                            </div>
                            <button className='order-btn' onClick={orderConfirm}>
                                Confirm Order
                            </button>
                            {modal && <Modal closeModal={closeModal} cart={cart} total={total} resetCart={resetCart} />}
                        </div>
                    ) : (
                        <div className='cart-div'>
                            <h3>Your Cart (0)</h3>
                            <div className='cart-icon-div'>
                                <BsCartDash style={{ fontSize: '150px' }} />
                            </div>
                            <p className='cart-text'>Your added item will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
