import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
}
