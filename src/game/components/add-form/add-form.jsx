import './add-form.scss';

export function AddForm(props) {
  const { submitHandler, resetHandler } = props;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitHandler();
  };

  const handleReset = (evt) => {
    evt.preventDefault();
    resetHandler();
  };

  return (
    <form className='add-form' onSubmit={handleSubmit} onReset={handleReset}>
      <button type='submit' className='add-form__button add-btn'>
        Add
      </button>
      <button type='reset' className='add-form__button remove-btn'>
        Remove
      </button>
    </form>
  );
}
