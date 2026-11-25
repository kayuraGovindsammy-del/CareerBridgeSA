
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Navbar from './components/layout/NavBar'
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Opportunities from './pages/Opportunities';
import OpportunityDetails from './pages/OpportunityDetails';

function ComingSoon({ title }: { title: string }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-4 text-slate-500">
        This page is currently under development.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
      >
        Back to Home
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
  path="/opportunities"
  element={<Opportunities />}
/>

<Route
  path="/opportunities/:id"
  element={<OpportunityDetails />}
/>

            <Route
              path="/providers"
              element={<ComingSoon title="For Providers" />}
            />

            <Route
              path="/about"
              element={<ComingSoon title="About Us" />}
            />

            <Route
              path="/login"
              element={<ComingSoon title="Log In" />}
            />

            <Route
              path="/register"
              element={<ComingSoon title="Create an Account" />}
            />

            <Route
              path="/privacy"
              element={<ComingSoon title="Privacy Policy" />}
            />

            <Route
              path="/terms"
              element={<ComingSoon title="Terms of Service" />}
            />

            <Route
              path="*"
              element={<ComingSoon title="Page Not Found" />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
