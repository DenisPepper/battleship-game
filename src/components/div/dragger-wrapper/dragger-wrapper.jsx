import './dragger-wrapper.css';

export function DraggerWrapper(props) {
  const { children } = props;

  return (
    <section className='dragger-wrapper'>
      {children}
      <div>there are control elements</div>
    </section>
  );
}
