import { Outlet } from 'react-router-dom';
import { Header, Footer } from './Chrome';

/**
 * Header and footer for every route.
 *
 * Pages render only their <main>; the chrome lives here so it mounts once and
 * survives navigation. useSiteMotion reaches the footer's motion toggle by id,
 * which only works because the footer is never unmounted between routes.
 */
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
