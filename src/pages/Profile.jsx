import { Link, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { getNights } from '../utils/dateUtils';
import AddIcon from '@mui/icons-material/Add';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import StarIcon from '@mui/icons-material/Star';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { EditProfile } from './EditProfile';
import { useState } from 'react';
import { ListVenue } from './ListVenue';

/**
 * Profile component displays the user's profile information, including their bookings and venues.
 * It also allows the user to edit their profile or list new venues.
 * The component fetches the profile data from the API using the provided `username` and renders the profile details.
 * The user can also view and manage their bookings and venues, including creating new venues.
 *
 * @returns {JSX.Element} The Profile component UI, including user details, bookings, and venues.
 */

export function Profile() {
  const { username } = useParams();
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
  const bookings = profile.bookings;

  const [showEdit, setShowEdit] = useState(false);
  const [listVenue, setListVenue] = useState(false);

  const editProfile = () => {
    setShowEdit(true);
  };

  const createVenue = () => {
    setListVenue(true);
  };

  return (
    <div className="text-black font-roboto px-4 mb-20 lg:px-32 lg:mb-32">
      <div className="border border-light-outline rounded-[10px] px-4 py-6 mb-4 lg:mt-10 lg:mb-6 lg:px-6">
        <button
          onClick={editProfile}
          className="text-blue underline font-bold mr-0 ml-auto block cursor-pointer"
        >
          Edit
        </button>
        {showEdit && <EditProfile setShowEdit={setShowEdit} />}
        <div className="flex items-center gap-2 mb-4 -mt-6">
          <img
            src={profile.avatar?.url}
            alt={profile.avatar?.alt}
            className="w-8 h-8 rounded-[50%] object-cover"
          />
          <h1 className="text-xl font-bold">{profile.name}</h1>
        </div>
        <div className="flex mb-1">
          <p className="mr-1.5 font-medium">Email:</p>
          <p className="break-all">{profile.email}</p>
        </div>
        <div className="flex">
          <p className="mr-1.5 font-medium">Bio:</p>
          <p>{profile.bio}</p>
        </div>
      </div>
      <div className="border border-light-outline rounded-[10px] px-4 pt-6 mb-4 lg:mb-6 lg:px-6 xl:pr-0">
        <h1 className="text-xl font-bold mb-4">
          Your booking<span className="ml-1.5">({bookings?.length})</span>
        </h1>
        {bookings?.length > 0 ? (
          <div className="grid grid-flow-col auto-cols-max  overflow-x-auto pb-6 gap-4 no-scrollbar lg:pb-20 lg:gap-x-3 lg:gap-y-6 xl:pr-6 xl:grid-flow-row xl:grid-cols-4 xl:auto-cols-auto xl:overflow-x-visible">
            {bookings.map((booking, index) => (
              <Link
                key={index}
                id={booking.id}
                to={`/booking/${booking.id}`}
                className="block bg-white shadow-custom rounded-[10px] w-[300px] xl:w-auto last:mr-4 xl:last:mr-0 group"
              >
                <figure className="aspect-3/2 rounded-t-[10px] overflow-hidden">
                  <img
                    src={booking.venue.media[0]?.url || 'noImage.jpg'}
                    alt={booking.venue.media[0].alt}
                    className="rounded-t-[10px] object-cover aspect-3/2 transition-transform duration-700 group-hover:scale-105"
                  />
                </figure>
                <div className="px-2 py-4 min-h-48 flex flex-col justify-between lg:min-h-72">
                  <div>
                    <h2 className="font-semibold mb-1 break-words leading-[1.3]">
                      {booking.venue.name}
                    </h2>
                    <div className="text-outline flex items-center gap-1 mb-4">
                      <PlaceOutlinedIcon className="!w-4" />
                      <p className="text-sm">
                        {booking.venue.location.city || 'Somewhere'},{' '}
                        {booking.venue.location.country || 'in the world'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-0.5">
                        Check in:
                        <span className="text-base ml-1.5 font-normal">
                          {new Date(booking.dateFrom).toLocaleDateString(
                            'de-DE'
                          )}
                        </span>
                      </p>
                      <p className="text-sm font-medium mb-0.5">
                        Checkout:
                        <span className="text-base ml-1.5 font-normal">
                          {new Date(booking.dateTo).toLocaleDateString('de-DE')}
                        </span>
                      </p>
                      <p className="text-sm font-medium">
                        Guests:
                        <span className="text-base ml-1.5 font-normal">
                          {booking.guests}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-0.5 w-full border-b border-light-outline pb-3">
                      <p className="font-semibold">${booking.venue.price}</p>
                      <span className="text-xs mx-0.5z">x</span>
                      <span className="mr-0.5">
                        {getNights(
                          new Date(booking.dateFrom),
                          new Date(booking.dateTo)
                        )}
                      </span>
                      <span>nights</span>
                    </div>
                    <div className="mt-3 flex justify-between text-lg font-bold">
                      <p>Total</p>
                      <p>
                        $
                        {booking.venue.price *
                          getNights(
                            new Date(booking.dateFrom),
                            new Date(booking.dateTo)
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm mb-4">You have no bookings yet.</p>
        )}
      </div>
      <div className="border border-light-outline rounded-[10px] px-4 pt-6 mb-12 lg:px-6">
        <button
          onClick={createVenue}
          className="text-blue underline font-bold mr-0 ml-auto block cursor-pointer"
        >
          <AddIcon className="!w-4 !h-4 mr-0.5" />
          List venue
        </button>
        {listVenue && <ListVenue setListVenue={setListVenue} />}
        <h1 className="text-xl font-bold mb-4 -mt-6">
          Your venues<span className="ml-1.5">({profile.venues?.length})</span>
        </h1>
        {profile.venues?.length > 0 ? (
          <div className="grid grid-flow-col auto-cols-max  overflow-x-auto pb-6 gap-4 no-scrollbar lg:pb-20 lg:gap-x-3 lg:gap-y-6 xl:pr-6 xl:grid-flow-row xl:grid-cols-4 xl:auto-cols-auto xl:overflow-x-visible">
            {profile.venues.map((venue, index) => (
              <Link
                key={index}
                id={venue.id}
                to={`/venue/${venue.id}`}
                className="block bg-white shadow-custom rounded-[10px] w-[300px] xl:w-auto last:mr-4 xl:last:mr-0 group"
              >
                <figure className="aspect-3/2 rounded-t-[10px] overflow-hidden">
                  <img
                    src={venue.media[0]?.url || 'noImage.jpg'}
                    alt=""
                    className="rounded-t-[10px] object-cover aspect-3/2 transition-transform duration-700 group-hover:scale-105"
                  />
                </figure>
                <div className="px-2 py-4 min-h-48 flex flex-col justify-between lg:min-h-52">
                  <div>
                    <h2 className="font-semibold mb-2 break-words leading-[1.3]">
                      {venue.name}
                    </h2>
                    <div className="text-outline flex items-center gap-1 mb-0.5">
                      <PlaceOutlinedIcon className="!w-4" />
                      <p className="text-sm">
                        {venue.location.city || 'Somewhere'},{' '}
                        {venue.location.country || 'in the world'}
                      </p>
                    </div>
                    <div className="text-outline flex items-center gap-1">
                      <HotelOutlinedIcon className="!w-4" />
                      <p className="text-sm">{venue.maxGuests} guests</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-orange py-1.5 pl-1.5 pr-2 text-white rounded-sm flex items-center gap-0.5 w-fit">
                      <StarIcon className="!w-4 !h-4" />
                      <p className="text-xs font-medium">{venue.rating}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <p className="text-xl font-bold">${venue.price}</p>
                      <span className="text-xs text-outline">/ night</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm mb-4">You have no venues yet.</p>
        )}
      </div>
      <Link
        to="/"
        className="underline text-sm mb-20 block md:mb-0 whitespace-nowrap"
      >
        <KeyboardBackspaceOutlinedIcon className="!w-4 !h-4 mr-1" />
        Back to Home
      </Link>
    </div>
  );
}
