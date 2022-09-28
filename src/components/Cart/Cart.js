import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";

const Cart = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrderHandler = () => {
    cartCtx.orderFood();
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      props.onClose();
    }, 10000);
  };

  return (
    <Modal onClose={props.onClose}>
      {hasItems && cartItems}
      <div className={classes.total}>
        {!isOrdered ? (
          <>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </>
        ) : (
          <span style={{ margin: "auto" }}>Food is ordered!</span>
        )}
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={onOrderHandler}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
