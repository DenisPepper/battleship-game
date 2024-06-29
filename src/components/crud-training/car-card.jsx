import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { udateCarData } from '../../supabase/client';

const KEY = 'CARS';

export function CarCard() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [car, setCar] = useState({
    id: Number(id),
    brand: searchParams.get('brand'),
    color: searchParams.get('color'),
    isNew: Boolean(searchParams.get('isNew')),
    price: searchParams.get('price'),
  });
  const [inProcess, setInProcess] = useState(false);
  const [error, setError] = useState('');

  const onError = (error) => {
    setInProcess(false);
    setError(error.message ?? 'error on update this car!');
  };

  const onSuccess = (data) => {
    setInProcess(false);
    console.log(data.at(0));
  };

  const hendleOnSubmit = (evt) => {
    evt.preventDefault();
    setInProcess(true);
    const data = new FormData(evt.currentTarget);
    const carData = {
      id,
      brand: data.get('brand'),
      color: data.get('color'),
      isNew: Boolean(data.get('isNew')),
      price: Number(data.get('price')),
    };
    console.log(carData);
    udateCarData(onError, onSuccess, carData);
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setCar((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form
        onSubmit={hendleOnSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <h2>{`Редактирование элемента c id ${id}`}</h2>
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <label>
            Brand:
            <input
              type='text'
              name='brand'
              value={car.brand}
              onChange={onChange}
            />
          </label>
          <label>
            Color:
            <input
              type='text'
              name='color'
              value={car.color}
              onChange={onChange}
            />
          </label>
          <label>
            New car:
            <input
              type='checkbox'
              name='isNew'
              checked={car.isNew}
              onChange={onChange}
            />
          </label>
          <label>
            Price:
            <input
              type='number'
              name='price'
              value={car.price}
              onChange={onChange}
            />
          </label>
        </section>
        <button type='submit' disabled={inProcess}>
          Save
        </button>
      </form>
    </>
  );
}
