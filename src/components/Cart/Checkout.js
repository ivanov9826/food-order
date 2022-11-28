import classes from "./Checkout.module.scss";
import useInput from "../../hooks/useInput";

const isNotEmpty = (value) => value.trim() !== "";
const isFourChars = (value) => value.trim().length === 4;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    setInputValueHandler: setNameInputValueHandler,
    onBlurHandler: onNameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    setInputValueHandler: setSteetInputValueHandler,
    onBlurHandler: onStreetBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    setInputValueHandler: setCityInputValueHandler,
    onBlurHandler: onCityBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    setInputValueHandler: setPostalCodeInputValueHandler,
    onBlurHandler: onPostalCodeBlurHandler,
  } = useInput(isFourChars);

  let formIsValid = false;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: nameValue,
      street: streetValue,
      city: cityValue,
      postalCode: postalCodeValue,
    });
  };

  const nameControlClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  if (nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid) {
    formIsValid = true;
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={setNameInputValueHandler}
          onBlur={onNameBlurHandler}
          value={nameValue}
        />
        {nameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={setSteetInputValueHandler}
          onBlur={onStreetBlurHandler}
          value={streetValue}
        />
        {streetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={setCityInputValueHandler}
          onBlur={onCityBlurHandler}
          value={cityValue}
        />
        {cityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={setPostalCodeInputValueHandler}
          onBlur={onPostalCodeBlurHandler}
          value={postalCodeValue}
        />
        {postalCodeHasError && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
