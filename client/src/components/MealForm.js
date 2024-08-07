import React, { useState } from 'react';
import { addMeal } from '../services/mealService';
import { AutoCompleteFood, getFoodID, getNutrients, getCalories } from '../services/AutoCompleteFood';
import './MealForm.css';
import { useNavigate, Link } from 'react-router-dom';

const MealForm = ({ refreshMeals, existingMeal, handleUpdate, setEditingMeal }) => {
  const currentDate = new Date().toISOString().substring(0, 10);
  const [meal, setMeal] = useState(existingMeal || { name: '',date: existingMeal?.date?.split('T')[0] || currentDate, mealType: '', calories: '' });
  const [queryList, setQueryList] = useState([]);
  const [FoodID, setFoodID] = useState("");
  const [Calories, setCalories] = useState("");

  const navigate = useNavigate()
  


  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleNameChange = async (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
    const results = await AutoCompleteFood(e.target.value);
    console.log(results);
    setQueryList(results);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingMeal) {
      await handleUpdate(meal);
      navigate("/meals")
    } else {
      await addMeal(meal);
      refreshMeals();
      setMeal({ name: '', date: '', mealType: '', calories: '' });
      setCalories('');
      navigate("/meals")
    }
    
  };

  const handelNameClick = async (value) =>{
    console.log("The clicked meal is:" + value);
    setMeal(prevMeal => ({
      ...prevMeal,
      name: value
    }));
    const id = await getFoodID(value);
    console.log(id);
    const calories = await getCalories(id);
    if(typeof(calories) !== Number){
      setCalories(calories);
      setMeal(prevMeal => ({
        ...prevMeal,
        calories: calories
      }));
    }
    else{
      setCalories(null);
    }
    // console.log(calories);
    setFoodID(id);
    setQueryList([]);
  }

  const handleCancel = () => {
    setEditingMeal(null);
  };

  return (
    <form className="meal-form" onSubmit={handleSubmit}>
      <h3>{existingMeal ? 'Edit Meal' : 'Add Meal'}</h3>
            <input type="text" name="name" placeholder="Name" value={meal.name} onChange={handleNameChange} required />
      {
        queryList.length>0 && (<div className='queryList'><ul className='queryList-ul'>
          {queryList.map((value, index)=>(<li className='queryList-li' key={index} onClick={()=>handelNameClick(value)}>{value}</li>))}
          </ul></div>)
      }
      <input type="date" name="date" value={meal.date.split('T')[0]} onChange={handleChange} required />
      <select name="mealType" value={meal.mealType} onChange={handleChange} required>
        <option value="" disabled>Select Meal Type</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <input type="number" name="calories" placeholder="Calories" value={(Calories) ? Calories : meal.calories} onChange={handleChange} required />
      <button type="submit">{existingMeal ? 'Update Meal' : 'Add Meal'}</button>

      {existingMeal && <button onClick={handleCancel}>{existingMeal ? 'Cancel' : ''}</button>}

    </form>
  );
};

export default MealForm;






