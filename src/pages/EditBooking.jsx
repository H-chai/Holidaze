import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { Link } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

/**
 * EditBooking - A component to display and edit booking details.
 *
 * This component fetches and displays booking details for a specific booking ID,
 * allowing users to view the venue details, booking information, and the option to cancel the booking.
 * It includes images of the venue, as well as other relevant details such as location, facilities, and host information.
 * Users can also cancel the booking directly from this page.
 *
 * @returns {JSX.Element} The EditBooking component that shows booking details and allows the user to cancel the booking.
 *
 * @example
 * <EditBooking />
 */

export function EditBooking() {
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('username');
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://v2.api.noroff.dev/holidaze/bookings/${id}?_venue=true`;
  const { data: booking } = useApi(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'X-Noroff-API-Key': apiKey,
    },
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (booking.venue?.media && booking.venue.media.length > 0) {
      const images = booking.venue.media.map((media) => ({
        url: media.url || 'public/noImage.jpg',
        alt: media.alt,
      }));
      setImageList(images);
    }
  }, [booking.venue]);

  const handleImageError = (indexToRemove) => {
    setImageList((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const navigate = useNavigate();

  const [isError, setIsError] = useState(null);

  const deleteBooking = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmed) {
      return;
    }

    const url = `https://v2.api.noroff.dev/holidaze/bookings/${id}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': apiKey,
        },
      });

      if (response.ok) {
        alert('Booking was successfully cancelled.');
        navigate(`/profile/${username}`);
      } else {
        const result = await response.json();
        setIsError(result.errors[0].message);
      }
    } catch (error) {
      setIsError(error.message);
    }
  };

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
          <button className="flex items-center gap-0.5 border border-outline px-2 py-2.5 rounded-[50px] cursor-pointer hover:underline">
            <ShareOutlinedIcon className="!w-4 !h-4 text-blue" />
            <p className="text-sm">Share</p>
          </button>
          <button className="flex items-center gap-0.5 border border-outline px-2 py-2.5 rounded-[50px] cursor-pointer hover:underline">
            <FavoriteBorderOutlinedIcon className="!w-4 !h-4 text-red-600" />
            <p className="text-sm">Save</p>
          </button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-20 md:mb-20 md:mt-5 md:items-start md:px-4 lg:gap-x-14 lg:px-32 lg:mb-32 lg:mt-8 xl:px-0 xl:max-w-[1120px] xl:mx-auto xl:grid-cols-8 xl:gap-x-20">
        <div className="px-4 md:px-0 xl:col-start-1 xl:col-end-6">
          <div className="flex items-end justify-between mt-3.5">
            <h1 className="text-xl font-bold break-words max-w-5/6">
              {booking.venue?.name}
            </h1>
            <div className="bg-orange py-1.5 pl-1.5 pr-2 text-white rounded-sm flex items-center gap-0.5 w-fit">
              <StarIcon className="!w-4 !h-4" />
              <p className="text-xs font-medium">{booking.venue?.rating}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1 mb-4">
            <PlaceOutlinedIcon className="!w-4" />
            <p className="text-sm">
              {booking.venue?.location?.city || 'Somewhere'},{' '}
              {booking.venue?.location?.country || 'in the world'}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HotelOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
              <p className="text-sm">{booking.venue?.maxGuests} guests</p>
            </div>
            {booking.venue?.meta?.wifi && (
              <div className="flex items-center gap-2">
                <WifiOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Free WiFi</p>
              </div>
            )}
            {booking.venue?.meta?.parking && (
              <div className="flex items-center gap-2">
                <LocalParkingRoundedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Parking available</p>
              </div>
            )}
            {booking.venue?.meta?.breakfast && (
              <div className="flex items-center gap-2">
                <FreeBreakfastOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Breakfast included</p>
              </div>
            )}
            {booking.venue?.meta?.pets && (
              <div className="flex items-center gap-2">
                <PetsOutlinedIcon className="!w-[18px] !h-[18px] mr-0.5" />
                <p className="text-sm">Pets allowed</p>
              </div>
            )}
          </div>
          <div className="py-6 border-t border-light-outline border-b mt-6">
            <h2 className="text-lg font-bold mb-1.5">About</h2>
            <p className="text-sm leading-[1.5]">
              {booking.venue?.description}
            </p>
          </div>
          <div className="py-6 border-light-outline border-b">
            <h2 className="text-lg font-bold mb-1.5">Host</h2>
            <div className="flex items-center gap-2">
              <img
                src={booking.venue?.owner?.avatar?.url}
                alt={booking.venue?.owner?.avatar?.alt}
                className="w-8 h-8 rounded-[50%] object-cover object-center"
              />
              <p className="text-sm">{booking.venue?.owner?.name}</p>
            </div>
          </div>
        </div>
        <div className="shadow-box mt-8 mx-4 mb-12 rounded-[10px] px-4 py-6 md:mt-4 md:mb-4 md:mx-0 xl:col-start-6 xl:col-end-9">
          <h2 className="text-lg font-bold mb-6">Booking information</h2>
          <p className="mb-1">
            Check in:
            <span className="ml-2 font-medium">
              {formatDate(booking.dateFrom)}
            </span>
          </p>
          <p className="mb-1">
            Checkout:
            <span className="ml-2 font-medium">
              {formatDate(booking.dateTo)}
            </span>
          </p>
          <p>
            Guests:<span className="ml-2 font-medium">{booking.guests}</span>
          </p>
          <button
            onClick={deleteBooking}
            className="mt-6 bg-error text-white w-full rounded-[8px] py-3 cursor-pointer font-medium disabled:cursor-not-allowed transition-all duration-300 hover:bg-white hover:text-error hover:border"
          >
            Cancel booking
          </button>
          {isError && <p className="text-error mt-4 ml-2">{isError}</p>}
        </div>
        <Link
          to="/"
          className="underline text-sm ml-4 mb-20 block md:ml-0 md:mb-0 whitespace-nowrap"
        >
          <KeyboardBackspaceOutlinedIcon className="!w-4 !h-4 mr-1" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
