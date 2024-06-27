import { useEffect, useReducer } from 'react';
import { fetchCars } from '../../supabase/client';

const Actions = {
  onStart: 'ON_START',
  onSuccess: 'ON_SUCCESS',
  onError: 'ON_ERROR',
};

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
    if (!state.isLoading) return;

    const handleOnError = (error) =>
      dispatch({
        type: Actions.onError,
        payload: { error: error.message ?? 'on fetch data error!' },
      });

    const handleOnSuccess = (data) =>
      dispatch({
        type: Actions.onSuccess,
        payload: { cars: data },
      });

    fetchCars(handleOnError, handleOnSuccess);

    /*
    const fetchCars = async () => {
      const { data, error } = await api.from('cars').select();
      if (error) {
        dispatch({
          type: Actions.onError,
          payload: { error: error.message ?? 'on fetch data error!' },
        });
        console.log(error);
      }
      if (data) {
        dispatch({
          type: Actions.onSuccess,
          payload: { cars: data },
        });
        console.log(data);
      }
    };
    */
  }, [state.isLoading]);

  return (
    <div>
      <button
        type='button'
        onClick={() => dispatch({ type: Actions.onStart })}
        disabled={state.isLoading}
      >
        Загрузить список машин 🚗
      </button>
      {state.isLoading && <p>Loading ...</p>}
      {state.error && <p>{state.error}</p>}
      {!!state.cars.length && <CarsList cars={state.cars} />}
    </div>
  );
}

function CarsList({ cars }) {
  return (
    <>
      <h2>Список машин:</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            car: {car.brand} / color: {car.color} / price: {car.price} (
            {car.isNew ? 'new' : 'secondhand'})
          </li>
        ))}
      </ul>
    </>
  );
}
