import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NavBar from './routes/NavBar';
import AllFile from './routes/MainFile';
import Login from './routes/Login';
import SignUp from './routes/Sign-up';
import Post from './routes/Post';
import PricingPage from './routes/PricingPage';
import PaymentPage from './routes/PaymentPage';
import { SearchProvider } from './main_files/MainPage/SearchContext';
import { FindQuestion } from './routes/FindQuestion';
import SignOut from './routes/SignOut';

const stripePromise = loadStripe('your-publishable-key'); // Replace with your actual Stripe publishable key

export default function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path='/' element={<NavBar />}>
          <Route index element={<AllFile />} />
          <Route path='post' element={<Post />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='find-question' element={<FindQuestion />} />
          <Route path='signout' element={<SignOut />} />
          <Route path='plans' element={<PricingPage />} /> {/* PricingPage route */}
          <Route 
            path='payment' 
            element={
              <Elements stripe={stripePromise}>
                <PaymentPage />
              </Elements>
            } 
          /> {/* PaymentPage route */}
        </Route>
      </Routes>
    </SearchProvider>
  );
}
