import './add-form.scss';

export function AddForm(props) {
  const { submitHandler } = props;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitHandler();
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <button type='submit' className='add-form__button'>
        Add
      </button>
    </form>
  );
}
