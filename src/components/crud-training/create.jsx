import { useState } from 'react';
import { addCars } from '../../supabase/client.js';

export function Create() {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnError = (error) => {
    console.log(error);
    setIsLoading(false);
  };

  const handleOnSuccess = (data) => {
    console.log(data);
    setIsLoading(false);
  };

  const hendleOnSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    const data = new FormData(evt.currentTarget);
    const carData = {
      brand: data.get('brand'),
      color: data.get('color'),
      isNew: Boolean(data.get('isNew')),
      price: Number(data.get('price')),
    };

    addCars(handleOnError, handleOnSuccess, [carData]);
  };

  return (
    <form
      onSubmit={hendleOnSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <h2>Добавление нового элемента</h2>
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <label>
          Brand:
          <input type='text' name='brand' />
        </label>
        <label>
          Color:
          <input type='text' name='color' />
        </label>
        <label>
          New car:
          <input type='checkbox' name='isNew' />
        </label>
        <label>
          Price:
          <input type='number' name='price' />
        </label>
      </section>
      <button type='submit' disabled={isLoading}>
        Add
      </button>
    </form>
  );
}
