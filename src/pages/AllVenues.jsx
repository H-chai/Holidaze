import { useApi } from '../hooks/useApi';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { SearchResultSection } from '../components/homePage/SearchResultSection';
import { HeroSection } from '../components/homePage/heroSection';

export function AllVenues({
  setSearchResults,
  setSearchText,
  searchText,
  searchResults,
}) {
  const [url, setUrl] = useState(
    'https://v2.api.noroff.dev/holidaze/venues?sortOrder=asc&limit=20&page=1'
  );
  const { data: venues, meta } = useApi(url, {
    method: 'GET',
  });

  const handlePageChange = (selected) => {
    const newPage = selected.selected + 1;
    const newUrl = `https://v2.api.noroff.dev/holidaze/venues?limit=20&page=${newPage}`;
    setUrl(newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection
        setSearchResults={setSearchResults}
        setSearchText={setSearchText}
      />
      {searchResults.length > 0 && (
        <SearchResultSection
          searchResults={searchResults}
          searchText={searchText}
        />
      )}
      <div className="px-4 pt-8 text-black font-roboto lg:px-32 lg:pt-16">
        <h1 className="text-xl font-bold mb-4 lg:mb-6">All venues</h1>
        <div className="grid grid-cols-1 gap-4 sm:gap-y-6 sm:gap-x-3 sm:grid-cols-3 lg:grid-cols-4">
          {venues.map((venue, index) => (
            <Link
              key={index}
              id={venue.id}
              to={`/venue/${venue.id}`}
              className="block bg-white shadow-custom rounded-[10px] w-auto group"
            >
              <figure className="aspect-3/2 rounded-t-[10px] overflow-hidden">
                <img
                  src={venue.media[0]?.url || 'public/noImage.jpg'}
                  alt=""
                  className="rounded-t-[10px] object-cover aspect-3/2 transition-transform duration-700 group-hover:scale-105 w-full"
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
                      {venue.location?.city || 'Somewhere'},{' '}
                      {venue.location?.country || 'in the world'}
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

        {meta && (
          <ReactPaginate
            pageCount={meta.pageCount} // ページ数
            onPageChange={handlePageChange} // ページ変更時の処理
            containerClassName="pagination" // ページネーションのクラス
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
          />
        )}
      </div>
    </div>
  );
}
