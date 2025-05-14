import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from 'react-hook-form';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { getNights } from '../utils/dateUtils';
import { BookingDone } from './BookingDone';

/**
 * Venue component handles the detailed view of a specific venue.
 * It fetches venue details based on the venue ID from the URL and displays information about the venue,
 * including images, description, owner details, location, available amenities, and booking options.
 * It also handles booking functionality, where users can select dates and the number of guests, then submit a booking request.
 *
 * @component
 * @example
 * // Usage:
 * <Venue />
 *
 * @returns {JSX.Element} The rendered component.
 */

export function Venue() {
  let { id } = useParams();
  const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`;
  const { data: venue } = useApi(url, {
    method: 'GET',
  });

  const [guests, setGuests] = useState(1);

  const handleIncrease = () => {
    if (guests < venue.maxGuests) {
      const updated = guests + 1;
      setGuests(updated);
      setValue('Guests', updated);
    }
  };

  const handleDecrease = () => {
    if (guests > 1) {
      const updated = guests - 1;
      setGuests(updated);
      setValue('Guests', updated);
    }
  };

  const schema = yup.object({
    dateRange: yup
      .array()
      .of(yup.date().nullable())
      .test(
        'both-dates-selected',
        'Please select both check-in and check-out dates.',
        (value) => {
          return value && value[0] && value[1];
        }
      ),
    guests: yup
      .number()
      .required('Please enter the number of guests')
      .min(1, 'At least 1 guest is required.'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [nights, setNights] = useState(0);

  const isLoggedIn = sessionStorage.getItem('token');
  const [isError, setIsError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  async function handleBooking(data) {
    const url = 'https://v2.api.noroff.dev/holidaze/bookings';
    const body = JSON.stringify({
      dateFrom: data.dateRange[0],
      dateTo: data.dateRange[1],
      guests: data.guests,
      venueId: id,
    });

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isLoggedIn}`,
          'X-Noroff-API-Key': apiKey,
        },
        body,
      });
      const result = await response.json();

      if (response.ok) {
        setIsDone(true);
      } else {
        setIsError(result.errors[0].message);
      }
    } catch (error) {
      setIsError(error.message);
    }
  }

  const watchDateRange = watch('dateRange');
  useEffect(() => {
    const [checkInDate, checkOutDate] = watchDateRange || [];
    if (checkInDate && checkOutDate) {
      setNights(getNights(checkInDate, checkOutDate));
    } else {
      setGuests(1);
    }
  }, [watchDateRange]);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    });
  };

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (venue?.media && venue.media.length > 0) {
      const images = venue.media.map((media) => ({
        url: media.url || 'public/noImage.jpg',
        alt: media.alt,
      }));
      setImageList(images);
    }
  }, [venue]);

  const handleImageError = (indexToRemove) => {
    setImageList((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const bookedDates = venue.bookings?.reduce(
    (reservedDates, { dateFrom, dateTo }) => {
      const start = new Date(dateFrom);
      const end = new Date(dateTo);
      while (start <= end) {
        reservedDates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
      return reservedDates;
    },
    []
  );

  return (
    <div className="overflow-hidden pt-4 font-roboto text-black">
      <div className="px-4 lg:px-32 xl:px-0 xl:max-w-[1120px] xl:mx-auto">
        <Carousel
          showThumbs={!isMobile}
          infiniteLoop={false}
          showStatus={true}
          showIndicators={false}
        >
          {imageList?.map((img, index) => (
            <div key={index}>
              <img
                src={img.url}
                alt={img.alt}
                onError={() => handleImageError(index)}
                className="rounded-[10px] aspect-3/2"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex gap-2 items-center justify-end mt-2">
          <button className="flex items-center gap-0.5 border border-outline px-2 py-2.5 rounded-[50px]">
            <ShareOutlinedIcon className="!w-4 !h-4 text-blue" />
            <p className="text-sm">Share</p>
          </button>
          <button className="flex items-center gap-0.5 border border-outline px-2 py-2.5 rounded-[50px]">
            <FavoriteBorderOutlinedIcon className="!w-4 !h-4 text-red-600" />
            <p className="text-sm">Save</p>
          </button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-20 md:mb-20 md:mt-5 md:items-start md:px-4 lg:gap-x-14 lg:px-32 lg:mb-32 lg:mt-8 xl:px-0 xl:max-w-[1120px] xl:mx-auto xl:grid-cols-8 xl:gap-x-20">
        <div className="px-4 md:px-0 xl:col-start-1 xl:col-end-6">
          <div className="flex items-end justify-between mt-3.5">
            <h1 className="text-xl font-bold break-words max-w-5/6">
              {venue.name}
            </h1>
            <div className="bg-orange py-1.5 pl-1.5 pr-2 text-white rounded-sm flex items-center gap-0.5 w-fit">
              <StarIcon className="!w-4 !h-4" />
              <p className="text-xs font-medium">{venue.rating}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1 mb-4">
            <PlaceOutlinedIcon className="!w-4" />
            <p className="text-sm">
              {venue.location?.city || 'Somewhere'},{' '}
              {venue.location?.country || 'in the world'}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HotelOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
              <p className="text-sm">{venue.maxGuests} guests</p>
            </div>
            {venue.meta?.wifi && (
              <div className="flex items-center gap-2">
                <WifiOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Free WiFi</p>
              </div>
            )}
            {venue.meta?.parking && (
              <div className="flex items-center gap-2">
                <LocalParkingRoundedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Parking available</p>
              </div>
            )}
            {venue.meta?.breakfast && (
              <div className="flex items-center gap-2">
                <FreeBreakfastOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Breakfast included</p>
              </div>
            )}
            {venue.meta?.pets && (
              <div className="flex items-center gap-2">
                <PetsOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Pets allowed</p>
              </div>
            )}
          </div>
          <div className="py-6 border-t border-light-outline border-b mt-6">
            <h2 className="text-lg font-bold mb-1.5">About</h2>
            <p className="text-sm leading-[1.5]">{venue.description}</p>
          </div>
          <div className="py-6 border-light-outline border-b">
            <h2 className="text-lg font-bold mb-1.5">Host</h2>
            <div className="flex items-center gap-2">
              <img
                src={venue.owner?.avatar?.url}
                alt={venue.owner?.avatar?.alt}
                className="w-8 h-8 rounded-[50%] object-cover object-center"
              />
              <p className="text-sm">{venue.owner?.name}</p>
            </div>
          </div>
        </div>
        <div className="shadow-box mt-8 mx-4 mb-12 rounded-[10px] px-4 py-6 md:mt-4 md:mb-4 md:mx-0 xl:col-start-6 xl:col-end-9">
          <div className="flex items-center gap-0.5 mb-6">
            <p className="text-xl font-bold">${venue.price}</p>
            <span className="text-xs text-outline">/ night</span>
          </div>
          <form
            onSubmit={handleSubmit(handleBooking)}
            id="bookingForm"
            className="mb-10"
          >
            <Controller
              control={control}
              {...register('dateRange')}
              name="dateRange"
              defaultValue={[null, null]}
              render={({ field }) => (
                <DatePicker
                  selectsRange
                  startDate={field.value[0]}
                  endDate={field.value[1]}
                  excludeDates={bookedDates}
                  onChange={(update) => {
                    field.onChange(update);
                    if (!update[0] && !update[1]) {
                      setNights(0);
                    }
                  }}
                  isClearable
                  placeholderText="Check in     -     Check out"
                  className="border border-outline py-3.5 px-4 rounded-[8px] w-full text-center"
                  value={
                    field.value[0] || field.value[1]
                      ? `${field.value[0] ? formatDate(field.value[0]) : 'Check in'} - ${field.value[1] ? formatDate(field.value[1]) : 'Check out'}`
                      : ''
                  }
                  minDate={new Date()}
                />
              )}
            />
            <p className="text-error mt-1">{errors.dateRange?.message}</p>
            <div className="border border-outline py-3.5 px-4 rounded-[8px] mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <PersonOutlineOutlinedIcon className="!w-[18px] !h-[18px] mr-1" />
                <p className="text-sm">Travelers</p>
              </div>
              <div>
                <button type="button" onClick={handleDecrease}>
                  <RemoveIcon className="!w-[18px] !h-[18px]" />
                </button>
                <input
                  {...register('guests', { valueAsNumber: true })}
                  value={guests}
                  className="!w-10 text-center text-sm"
                />
                <button type="button" onClick={handleIncrease}>
                  <AddIcon className="!w-[18px] !h-[18px]" />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue text-white w-full rounded-[8px] py-3 cursor-pointer disabled:cursor-not-allowed transition-all duration-300 hover:bg-white hover:text-blue hover:border"
              disabled={!isLoggedIn}
            >
              Book
            </button>
            {!isLoggedIn && (
              <p className="text-blue font-semibold text-center mt-2">
                <Link to="/login" className="underline">
                  Sign in{' '}
                </Link>
                to book a venue.
              </p>
            )}
            {isError && <p className="text-error mt-4">{isError}</p>}
          </form>
          <div>
            {nights !== 0 ? (
              <div className="flex items-center justify-between pb-4 border-b border-light-outline">
                <p className="font-medium">
                  ${venue.price}
                  <span className="font-normal"> x {nights} nights</span>
                </p>
                <p className="font-medium">${venue.price * nights}</p>
              </div>
            ) : (
              <div className="pb-4 border-b border-light-outline">
                <p className="font-medium">
                  ${venue.price}
                  <span className="font-normal"> / night</span>
                </p>
              </div>
            )}
            {nights !== 0 ? (
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-bold">Total</h3>
                <h3 className="font-bold">${venue.price * nights}</h3>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-bold">Total</h3>
                <h3 className="font-bold">--</h3>
              </div>
            )}
          </div>
        </div>
        <Link
          to="/"
          className="underline text-sm ml-4 mb-20 block md:ml-0 md:mb-0 whitespace-nowrap"
        >
          <KeyboardBackspaceOutlinedIcon className="!w-4 !h-4 mr-1" />
          Back to Home
        </Link>
      </div>
      {isDone && <BookingDone setIsDone={setIsDone} />}
    </div>
  );
}
