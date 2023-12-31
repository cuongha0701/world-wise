import supabase from './supabase';

export async function getCities() {
  const { data, error } = await supabase.from('cities').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cities data could not be loaded!');
  }

  return data;
}

export async function getCity(id) {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error('Cities data could not be loaded!');
  }

  return data;
}

export async function deleteCity(id) {
  const { data, error } = await supabase
    .from('cities')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('City could not be deleted!');
  }

  return data;
}

export async function addCity(newCity) {
  const { data, error } = await supabase
    .from('cities')
    .insert(newCity)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('City could not be created!');
  }

  return data;
}

export async function deleteAllCities() {
  const { error } = await supabase.from('cities').delete().gt('id', 0);
  if (error) console.log(error.message);
}

export async function createSampleCities(cities) {
  const { data, error } = await supabase.from('cities').insert(cities).select();
  if (error) console.log(error.message);
  return data;
}
