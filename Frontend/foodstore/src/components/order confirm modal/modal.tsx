import React from 'react';
import './modal.css';
import { FaRegCircleCheck } from "react-icons/fa6";

type ModalProps = {
    closeModal: () => void;
    cart: Array<{
        idMeal: string;
        strMeal: string;
        strMealThumb: string;
        price?: number;
    }>;
    total: number;
    resetCart: () => void;
};

const Modal: React.FC<ModalProps> = ({ closeModal, cart, total, resetCart }) => {
    const handleNewOrder = () => {
        resetCart(); // Reset the cart and total
    };

    return (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                <FaRegCircleCheck style={{ color: 'green', fontSize: '30px', marginBottom: '5px' }} />
                <h1 style={{ color: 'black' }}>Order Confirmed</h1>
                <p style={{ fontSize: '13px', marginBottom: '10px' }}>We hope you enjoy your food!</p>
                <div className='cart-items-detail'>
                    {cart.map((item) => (
                        <div className='cart-item-div' key={item.idMeal}>
                            <div className='left-cart-div'>
                                <div className='order-img-div'>
                                    <img className='order-img' src={item.strMealThumb} alt={item.strMeal} />
                                </div>
                                <div className='para-div'>
                                    <p className='para-cart-1'>{item.strMeal}</p>
                                    <p className='para-cart-2'><span>1x</span>&nbsp; @ ${item.price}</p>
                                </div>
                            </div>
                            <div className='right-cart-item-div'>
                                <p>${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className='order-total'>Total: <span>${total.toFixed(2)}</span></p>
                <button className='start-order-new-btn' onClick={handleNewOrder}>Start New Order</button>
            </div>
        </div>
    );
}

export default Modal;
