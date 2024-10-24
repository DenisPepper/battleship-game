import './add-form.scss';

export function AddForm() {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <fieldset className='add-form__ship-type'>
        <legend>type of ship</legend>
        <label>
          4
          <input type='radio' name='ship-type' value={4} />
        </label>
        <label>
          3
          <input type='radio' name='ship-type' value={3} />
        </label>
        <label>
          2
          <input type='radio' name='ship-type' value={2} />
        </label>
        <label>
          1
          <input type='radio' name='ship-type' value={1} defaultChecked />
        </label>
      </fieldset>
      <fieldset className='add-form__ship-position'>
        <legend>position</legend>
        <select name='ship-position'>
          <option value='vertical'>vertical</option>
          <option value='horizontal'>horizontal</option>
        </select>
      </fieldset>
      <button type='submit' className='add-form__button'>Add</button>
    </form>
  );
}
