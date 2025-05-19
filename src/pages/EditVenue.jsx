import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import * as yup from 'yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

export function EditVenue({ setShowEdit }) {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`;
  const { data: venue } = useApi(url, {
    method: 'GET',
  });

  const schema = yup
    .object({
      name: yup.string().required('Please enter a venue name.'),
      description: yup.string().required('Please write a short description.'),
      media: yup.array().of(
        yup.object().shape({
          url: yup.string().url('Please enter a valid URL').optional(),
          alt: yup.string().optional(),
        })
      ),
      price: yup
        .number()
        .typeError('Please enter a valid number for the price.')
        .required('Please enter a venue price'),
      maxGuests: yup
        .number()
        .typeError('Please enter a valid number for guests.')
        .min(1, 'At least 1 guest is required.')
        .required('Please enter the number of guests.'),
      meta: yup.object({
        wifi: yup.boolean(),
        parking: yup.boolean(),
        breakfast: yup.boolean(),
        pets: yup.boolean(),
      }),
      location: yup.object({
        city: yup.string().optional(),
        country: yup.string().optional(),
      }),
    })
    .required();

  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      maxGuests: '',
      location: { city: '', country: '' },
      meta: { wifi: false, parking: false, breakfast: false, pets: false },
      media: [{ url: '', alt: '' }],
    },
  });

  useEffect(() => {
    if (venue) {
      reset({
        name: venue.name || '',
        description: venue.description || '',
        price: venue.price || '',
        maxGuests: venue.maxGuests || '',
        location: {
          city: venue.location?.city || '',
          country: venue.location?.country || '',
        },
        meta: {
          wifi: venue.meta?.wifi || false,
          parking: venue.meta?.parking || false,
          breakfast: venue.meta?.breakfast || false,
          pets: venue.meta?.pets || false,
        },
        media: venue.media?.length ? venue.media : [{ url: '', alt: '' }],
      });
    }
  }, [venue, reset]);

  const onSubmit = async (data) => {
    const token = sessionStorage.getItem('token');
    const url = `https://v2.api.noroff.dev/holidaze/venues/${id}`;
    const body = JSON.stringify({
      name: data.name,
      description: data.description,
      price: data.price,
      maxGuests: data.maxGuests,
      meta: data.meta,
      location: data.location,
      media: data.media,
    });
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': apiKey,
        },
        body,
      });
      const result = await response.json();
      if (response.ok) {
        setShowEdit(false);
        window.location.reload();
      } else {
        setIsError(result.errors[0].message);
      }
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { fields, append, remove } = useFieldArray({ control, name: 'media' });

  return (
    <div className="absolute bg-medium-transparent-black top-0 bottom-0 right-0 left-0 px-4 z-10 md:px-20">
      <div className="bg-white rounded-[10px] mt-20 relative py-16 md:py-20 lg:max-w-2/3 lg:mx-auto lg:mt-32">
        <button
          onClick={() => {
            setShowEdit(false);
          }}
          className="absolute top-4 right-4 md:top-6 md:right-6 cursor-pointer"
        >
          <CloseIcon className="!w-5 !h-5 cursor-pointer" />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 md:px-6">
          <input
            type="text"
            {...register('name')}
            placeholder="Venue name"
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          {errors.name && (
            <p className="text-error -mt-3 mb-2">{errors.name.message}</p>
          )}
          <input
            type="text"
            {...register('description')}
            placeholder="Description"
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          {errors.description && (
            <p className="text-error -mt-3 mb-2">
              {errors.description.message}
            </p>
          )}
          <input
            type="text"
            {...register('location.city')}
            placeholder="City"
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          <input
            type="text"
            {...register('location.country')}
            placeholder="Country"
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          <input
            type="number"
            {...register('price')}
            placeholder="Price per night"
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          {errors.price && (
            <p className="text-error -mt-3 mb-2">{errors.price.message}</p>
          )}
          <input
            type="number"
            {...register('maxGuests')}
            placeholder="Number of max guests"
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          {errors.maxGuests && (
            <p className="text-error -mt-3 mb-2">{errors.maxGuests.message}</p>
          )}
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <input
                type="text"
                {...register(`media.${index}.url`)}
                placeholder="Image URL"
                className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
              />
              <input
                type="text"
                {...register(`media.${index}.alt`)}
                placeholder="Alt text"
                className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-error text-sm mr-1 ml-auto block cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ url: '', alt: '' })}
            className="text-blue text-sm font-medium mr-0 ml-auto cursor-pointer flex items-center mb-2"
          >
            <AddIcon /> Add Image
          </button>
          <label className="block w-fit mb-1.5">
            <input
              type="checkbox"
              {...register('meta.wifi')}
              className="mr-1.5"
            />
            Free WiFi
          </label>
          <label className="block w-fit mb-1.5">
            <input
              type="checkbox"
              {...register('meta.parking')}
              className="mr-1.5"
            />
            Parking available
          </label>
          <label className="block w-fit mb-1.5">
            <input
              type="checkbox"
              {...register('meta.breakfast')}
              className="mr-1.5"
            />
            Breakfast included
          </label>
          <label className="block w-fit">
            <input
              type="checkbox"
              {...register('meta.pets')}
              className="mr-1.5"
            />
            Pets allowed
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue text-white w-full rounded-[10px] py-3 mt-8 cursor-pointer transition-all duration-300 border hover:bg-white hover:text-blue md:py-4"
          >
            {isLoading ? 'Listing...' : 'List new venue'}
          </button>
        </form>
        {isError && <p className="text-error mt-4 ml-2">{isError}</p>}
      </div>
    </div>
  );
}
