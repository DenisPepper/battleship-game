import { createClient } from '@supabase/supabase-js';

const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(apiUrl, apiKey);

export const fetchCars = async (onError, onSuccess) => {
  const { data, error } = await supabase.from('cars').select();

  if (error) onError(error);

  if (data) onSuccess(data);
};

/**
 * Add new cars
 * @param {function} onError - callback in case of an error
 * @param {function} onSuccess - callback in case of an success
 * @param {array} items - array with new cars-objects
 */
export const addCars = async (onError, onSuccess, items) => {
  const { data, error } = await supabase.from('cars').insert(items).select();

  if (error) onError(error);

  if (data) onSuccess(data);
};

/**
 * Add new cars
 * @param {function} onError - callback in case of an error
 * @param {function} onSuccess - callback in case of an success
 * @param {object} item - car-object with updated values
 */
export const udateCarData = async (onError, onSuccess, item) => {
  const { data, error } = await supabase
    .from('cars')
    .update({ ...item, id: undefined })
    .eq('id', item.id)
    .select();

  if (error) onError(error);

  if (data) onSuccess(data);
};

export const signInWithEmail = async (onError, onSuccess, authData) => {
  /* 
  {
    email: 'example@email.com',
    password: 'example-password',
  }
  */
  const { data, error } = await supabase.auth.signInWithPassword(authData);

  if (error) onError(error);

  if (data) onSuccess(data);
};

export const signOut = async (onError) => {
  const { error } = await supabase.auth.signOut();
  onError(error);
};
