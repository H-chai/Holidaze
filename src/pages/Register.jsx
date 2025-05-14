import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/Holidaze.svg';

/**
 * Register component allows users to create a new account.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 * @param {Object} setAuthChanged - A function to handle changes in authentication state.
 */

export function Register() {
  const schema = yup
    .object({
      name: yup.string().required('Username is required'),
      email: yup
        .string()
        .email('Please enter a valid email address.')
        .matches(
          /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/,
          'Email must be from stud.noroff.no domain.'
        )
        .required('Email is required'),
      password: yup
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .required('Password is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const navigate = useNavigate();

  async function onSubmit(data) {
    const body = JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      venueManager: true,
    });

    const url = 'https://v2.api.noroff.dev/auth/register';

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const result = await response.json();

      if (!response.ok) {
        setIsError(result.errors[0].message);
      } else {
        alert(
          `Registration successful!\nUsername: ${result.data.name}\nEmail: ${result.data.email}`
        );
        navigate('/login');
      }
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-6 font-roboto flex flex-col text-black h-svh justify-center">
      <Link to="/" className="block w-1/2 mx-auto sm:w-1/3 md:w-1/4 lg:w-[14%]">
        <img src={logo} alt="Holidaze logo" className="w-full" />
      </Link>
      <h1 className="text-center text-2xl font-semibold mt-8 mb-5 lg:mt-10 lg:mb-6">
        Sign up
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-3/5 sm:mx-auto md:w-1/2 xl:w-1/4"
      >
        <input
          {...register('name')}
          type="text"
          placeholder="Username"
          className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full"
        />
        <p className="text-error mt-1">{errors.name?.message}</p>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mt-4"
        />
        <p className="text-error mt-1">{errors.email?.message}</p>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="border border-outline placeholder:text-sm py-3.5 px-4 rounded-[10px] w-full mt-4"
        />
        <p className="text-error mt-1">{errors.password?.message}</p>

        {isError && <p className="text-error mt-4">{isError}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="text-center bg-blue text-white block w-full rounded-[10px] py-3.5 font-medium mt-4 cursor-pointer transition-all duration-300 hover:bg-white hover:text-blue hover:border"
        >
          {isLoading ? 'Sign up...' : 'Sign up'}
        </button>
      </form>
      <div className="flex text-sm justify-center mt-4">
        <p className=" text-outline mr-1">Already have an account?</p>
        <Link to="/login" className="underline font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}
