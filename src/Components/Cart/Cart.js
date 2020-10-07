import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeItemCart, addCountCartItem, removeCountCartItem } from "../../Redux/Slice";
import { fixedPrice } from "../../Addons/func";

import "./Cart.css";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.session);
  const total = {
    itemsAll: cart.length, // Речей у кошику
    itemsAllDc: cart.reduce((acc, item) => (item.priceNew ? acc + 1 : acc + 0), 0), // Речей зі знижкою
    itemsAllCt: cart.reduce((acc, item) => acc + item.count, 0), // Речей у кошику + кількість кожної одиниці
    itemsAllDcCt: cart.reduce((acc, item) => (item.priceNew ? acc + item.count : acc + 0), 0), // Речей у кошику з знижкою + кількість кожної одиниці
    priceItemsCart: fixedPrice(cart.reduce((acc, item) => acc + item.price * item.count, 0)), // Сума усіх речей без знижки
    priceItemsCartDc: fixedPrice(cart.reduce((acc, item) => acc + (item.priceNew ? item.priceNew : item.price) * item.count, 0)), // Сума усіх речей зі знижкою
    priceDc: fixedPrice(cart.reduce((acc, item) => acc + (item.priceNew ? (item.price - item.priceNew) * item.count : 0), 0)), // Сума знижки
  };
  return (
    <div className="container cart">
      <h2>Cart</h2>
      {cart && cart.length > 0 ? (
        <div className="cart__list">
          <ul className="cart__left-list">
            {cart.map((item) => (
              <li className="cart__item" key={"cart" + item.id}>
                <div className="cart__poster">
                  <img src={item.images[0]} alt={item.title} />
                </div>
                <div className="cart__info">
                  <h2 className="cart__title">
                    {item.title} - {item.category}
                  </h2>
                  <h3 className="cart__info-text">
                    <div>
                      {item.priceNew && "OLD PRICE"}
                      <p>
                        ${fixedPrice(item.price)} x {item.count}
                      </p>
                      <p>total: ${fixedPrice(item.price * item.count)}</p>
                    </div>
                    {item.priceNew && (
                      <div>
                        NEW PRICE
                        <p>
                          ${fixedPrice(item.priceNew)} x {item.count}
                        </p>
                        <p>total: ${fixedPrice(item.priceNew * item.count)}</p>
                        (Discount: ${fixedPrice((item.price - item.priceNew) * item.count)})
                      </div>
                    )}
                  </h3>
                </div>
                <div className="cart__count">
                  <div className="cart__count-btns">
                    <button className="btn" onClick={() => dispatch(addCountCartItem(item.id))}>
                      +
                    </button>
                    <h3 className="cart__count-text">{item.count}</h3>
                    <button disabled={item.count <= 1 ? true : false} className="btn" onClick={() => dispatch(removeCountCartItem(item.id))}>
                      -
                    </button>
                  </div>
                  <button className="btn" onClick={() => dispatch(removeItemCart(item.id))}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart__right-list">
            <h2>Total:</h2>
            <div className="cart__total">
              <p>Items in cart: </p>
              <p>{total.itemsAll}</p>
              <p>Items in cart with discount:</p>
              <p>{total.itemsAllDc}</p>
              <p>Items in cart + count: </p>
              <p>{total.itemsAllCt}</p>
              <p>Items in cart + count with discount:</p>
              <p>{total.itemsAllDcCt}</p>
              <p>Total price:</p>
              <p>${total.priceItemsCart}</p>
              <p>Total discount:</p>
              <p>${total.priceDc}</p>
              <p>Total price with discount: </p>
              <p>
                <b>${total.priceItemsCartDc}</b>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="cart__noItems"> NO ITEMS IN CART</h2>
      )}
    </div>
  );
};

export default Cart;
