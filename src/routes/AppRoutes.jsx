import { Route, Routes, useLocation } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Layout } from '../components/Layout';
import { useEffect, useState } from 'react';
import { Home } from '../pages/Home';
import { Venue } from '../pages/Venue';
import { AllVenues } from '../pages/AllVenues';
import { TrendingDestination } from '../pages/TrendingDestination';
import { ScrollToTop } from './ScrollToTop';
import { Profile } from '../pages/Profile';
import { EditBooking } from '../pages/EditBooking';
import { BackToTop } from '../components/BackToTop';

export function AppRoutes() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [authChanged, setAuthChanged] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed flex flex-col justify-center top-0 bottom-0 right-0 left-0 bg-white z-50">
          <h1 className="font-roboto text-black tracking-wide text-center mb-2">
            LOADING
          </h1>
          <div>
            <span className="w-4 h-4 rounded-[50%] inline-block absolute left-1/2 ml-[-10px] bg-blue animate-bounceLeft"></span>
            <span className="w-4 h-4 rounded-[50%] inline-block absolute left-1/2 ml-[-10px] bg-orange z-50"></span>
            <span className="w-4 h-4 rounded-[50%] inline-block absolute left-1/2 ml-[-10px] bg-blue animate-bounceRight"></span>
          </div>
        </div>
      )}

      <ScrollToTop />
      <BackToTop />
      <Routes>
        <Route path="/" element={<Layout setAuthChanged={setAuthChanged} />}>
          <Route
            path="/"
            element={
              <Home
                authChanged={authChanged}
                setSearchResults={setSearchResults}
                setSearchText={setSearchText}
                searchText={searchText}
                searchResults={searchResults}
              />
            }
          />
          <Route path="venue/:id" element={<Venue />} />
          <Route
            path="allVenues"
            element={
              <AllVenues
                setSearchResults={setSearchResults}
                setSearchText={setSearchText}
                searchText={searchText}
                searchResults={searchResults}
              />
            }
          />
          <Route path="venues/:destination" element={<TrendingDestination />} />
          <Route
            path="login"
            element={<Login setAuthChanged={setAuthChanged} />}
          />
          <Route path="register" element={<Register />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="booking/:id" element={<EditBooking />} />
        </Route>
      </Routes>
    </div>
  );
}
