import { Box, Container } from '@mui/material';
import Navbar from './Navigation'
import Head from './Head'

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'row',
          alignItems: 'stretch',
        }}
      >
        <Navbar />
        <Container
          component="main"
          maxWidth={false}
          disableGutters
        >
          {children}
        </Container>
      </Box>
    </>
  )
}
export default Layout;
