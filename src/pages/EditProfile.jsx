import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

/**
 * EditProfile component allows the user to edit their profile, including their bio and avatar image URL.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.setShowEdit - Function to toggle the visibility of the edit profile form.
 * @returns {JSX.Element} The rendered profile edit form. */

export function EditProfile({ setShowEdit }) {
  let { username } = useParams();
  const token = sessionStorage.getItem('token');
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://v2.api.noroff.dev/holidaze/profiles/${username}?_bookings=true&_venues=true`;
  const { data: profile } = useApi(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
  });

  const schema = yup
    .object({
      bio: yup.string(),
      avatar: yup.object({
        url: yup.string().url('Please enter a valid URL').optional(),
        alt: yup.string().optional(),
      }),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isError, setIsError] = useState(null);
  const onSubmit = async (data) => {
    const url = `https://v2.api.noroff.dev/holidaze/profiles/${username}`;
    const body = JSON.stringify({
      bio: data.bio || profile.bio,
      avatar: {
        url: data.avatarUrl || profile.avatar?.url || '',
        alt: data.avatarAlt || profile.avatar?.alt || '',
      },
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
    }
  };

  return (
    <div className="absolute bg-medium-transparent-black top-0 bottom-0 right-0 left-0 px-4 z-10 md:px-20">
      <div className="bg-white rounded-[10px] mt-20 relative py-16 md:py-20 lg:max-w-2/3 lg:mx-auto lg:mt-32">
        <button
          onClick={() => {
            setShowEdit(false);
          }}
          className="absolute top-4 right-4 md:top-6 md:right-6"
        >
          <CloseIcon className="!w-5 !h-5" />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="px-2 md:px-6">
          <input
            type="text"
            {...register('bio')}
            defaultValue={profile.bio}
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          <input
            type="text"
            {...register('avatarUrl')}
            defaultValue={profile.avatar?.url}
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          <p className="text-error">{errors.avatarUrl?.message}</p>
          <input
            type="text"
            {...register('avatarAlt')}
            defaultValue={profile.avatar?.alt}
            className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue text-white w-full rounded-[10px] py-3 cursor-pointer transition-all duration-300 hover:bg-white hover:text-blue hover:border md:py-4"
          >
            Save
          </button>
        </form>
        {isError && <p className="text-error mt-4 ml-2">{isError}</p>}
      </div>
    </div>
  );
}
