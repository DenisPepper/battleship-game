import { createClient } from '@supabase/supabase-js'

const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(apiUrl, apiKey);

export const fetchCars = async (onError, onSuccess) => {
    const { data, error } = await supabase.from('cars').select();

    if (error) onError(error);

    if (data) onSuccess(data)
}