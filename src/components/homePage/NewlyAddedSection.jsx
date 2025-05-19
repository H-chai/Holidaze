import { useApi } from '../../hooks/useApi';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

/**
 * NewlyAddedSection - Displays the most recently created venues in a horizontal scrollable list.
 *
 * This component fetches the latest venue data from the API using the `sort=created` parameter,
 * and displays the four most recently added venues in a responsive, card-based layout.
 *
 * Each venue card shows an image, name, location, guest capacity, rating, and price per night.
 * The layout is horizontally scrollable on small screens and grid-based on larger screens.
 *
 * @component
 * @example
 * return (
 *   <NewlyAddedSection />
 * );
 */

export function NewlyAddedSection() {
  const url = 'https://v2.api.noroff.dev/holidaze/venues?sort=created';
  const { data: venues } = useApi(url, {
    method: 'GET',
  });
  return (
    <div className="pt-8 pl-4 text-black font-roboto lg:pl-32 lg:pr-28 lg:pt-16">
      <h1 className="text-xl font-bold mb-4">Newly added venues</h1>
      <div className="grid grid-flow-col auto-cols-max auto-rows-max overflow-x-auto pb-8 gap-4 no-scrollbar lg:grid-cols-4 lg:gap-3 lg:pb-20 lg:pr-4">
        {venues.slice(0, 4).map((venue, index) => (
          <Link
            key={index}
            id={venue.id}
            to={`/venue/${venue.id}`}
            className="block bg-white shadow-custom rounded-[10px] w-[300px] lg:w-auto last:mr-4 lg:last:mr-0 group"
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
    </div>
  );
}
