import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../../supabase/client';

const Actions = {
  onStart: 'ON_START',
  onSuccess: 'ON_SUCCESS',
  onError: 'ON_ERROR',
};

const KEY = 'CARS';

const reducer = (state, { type, payload }) => {
  if (type === Actions.onStart)
    return { ...state, cars: [], isLoading: true, error: '' };
  if (type === Actions.onSuccess)
    return { ...state, cars: payload.cars, isLoading: false, error: '' };
  if (type === Actions.onError)
    return { ...state, isLoading: false, error: payload.error };
  return state;
};

const initialState = {
  cars: [],
  isLoading: false,
  error: '',
};

export function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem(KEY));
    if (!cars) return;

    dispatch({
      type: Actions.onSuccess,
      payload: { cars },
    });
  }, []);

  useEffect(() => {
    if (!state.isLoading) return;

    const handleOnError = (error) =>
      dispatch({
        type: Actions.onError,
        payload: { error: error.message ?? 'on fetch data error!' },
      });

    const handleOnSuccess = (data) => {
      dispatch({
        type: Actions.onSuccess,
        payload: { cars: data },
      });
      localStorage.setItem(KEY, JSON.stringify(data));
    };
    fetchCars(handleOnError, handleOnSuccess);
  }, [state.isLoading]);

  const carsList = state.cars;

  return (
    <div>
      <button
        type='button'
        onClick={() => dispatch({ type: Actions.onStart })}
        disabled={state.isLoading}
      >
        {carsList.length > 0 ? 'Обновить' : 'Загрузить'} список машин 🚗
      </button>
      {state.isLoading && <p>Loading ...</p>}
      {state.error && <p>{state.error}</p>}
      {!!carsList.length && <CarsList cars={carsList} />}
    </div>
  );
}

function CarsList({ cars }) {
  return (
    <>
      <h2>Список машин:</h2>
      <ul>
        {cars.map((car) => (
          <li
            key={car.id}
            style={{ border: '1px solid white', marginBottom: '10px' }}
          >
            <p>
              car: {car.brand} / color: {car.color} / price: {car.price} (
              {car.isNew ? 'new' : 'secondhand'})
            </p>
            <Link
              to={`/${car.id}?brand=${car.brand}&color=${car.color}&isNew=${car.isNew}&price=${car.price}`}
            >
              <i>edit</i>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
