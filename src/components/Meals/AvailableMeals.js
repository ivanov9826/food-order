import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-practice-80ae8-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      //DB returns null value on index 0 even though there isnt such thing when checked in firebase console

      const fixedData = data.slice(1);

      setMeals(fixedData);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading . . . </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.ErrorMsg}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal, index) => (
    <MealItem
      id={index}
      key={index}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
