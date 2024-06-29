import { useParams, useSearchParams } from 'react-router-dom';

export function CarCard() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get('brand');
  const color = searchParams.get('color');
  const isNew = searchParams.get('isNew');
  const price = searchParams.get('price');

  const hendleOnSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const carData = {
      id,
      brand: data.get('brand'),
      color: data.get('color'),
      isNew: Boolean(data.get('isNew')),
      price: Number(data.get('price')),
    };
    console.log(carData);
  };

  return (
    <form
      onSubmit={hendleOnSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <h2>Редактирование элемента</h2>
      <section
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <label>
          Brand:
          <input type='text' name='brand' defaultValue={brand} />
        </label>
        <label>
          Color:
          <input type='text' name='color' defaultValue={color} />
        </label>
        <label>
          New car:
          <input type='checkbox' name='isNew' defaultChecked={isNew} />
        </label>
        <label>
          Price:
          <input type='number' name='price' defaultValue={price} />
        </label>
      </section>
      <button type='submit'>Add</button>
    </form>
  );
}
