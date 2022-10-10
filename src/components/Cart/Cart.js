import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [orderError, setOrderError] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const onOrderHandler = () => {
    setIsOrdered(true);
  };

  const onSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      `https://react-practice-80ae8-default-rtdb.europe-west1.firebasedatabase.app/orders.json`,
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedFood: cartCtx.items,
        }),
      }
    );
    if (response.status === "200") {
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
      console.log("done");
    } else {
      setOrderError(true);
    }
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>

      <button className={classes.button} onClick={onOrderHandler}>
        Order
      </button>
    </div>
  );

  const cartModalContent = (
    <>
      {hasItems && cartItems}
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdered && (
        <Checkout onSubmit={onSubmitHandler} onCancel={props.onClose} />
      )}
      {!isOrdered && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data . . .</p>;

  const didSubmitModalContent = (
    <>
      <p>Food ordered!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  const orderErrorModalContent = <p>Something went wrong with the order!</p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !orderError && isSubmittingModalContent}
      {orderError && orderErrorModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
