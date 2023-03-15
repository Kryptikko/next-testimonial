import Navbar from './Navigation'
import Footer from './Footer'

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <main className="container mx-auto  min-h-screen">
      <Navbar />
        {children}
      <Footer />
    </main>
  )
}
export default Layout;
