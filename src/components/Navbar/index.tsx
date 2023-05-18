// simple navbar with transaction and profile menu

import {
  Box,
  Button,
  Typography,
  Link,
  Container
} from '@mui/material'

import { useRouter } from 'next/router';


const Navbar = () => {
  const router = useRouter();

  return (
    <Box 
      sx={{ padding: 4, display: 'flex', flexDirection: 'row', alignItems: 'end', width: '100vw' }}
      component="div"
      // @ts-ignore
      backgroundColor="primary.secondary"
    >
      <Button
        variant="contained"
        sx={{ marginRight: 2 }}
        onClick={() => router.push('/transaction')}
      >Transaction</Button>
      <Button
        variant="contained"
        sx={{ marginRight: 2 }}
        onClick={() => router.push('/profile')}
      >Profile</Button>
    </Box>
  )
}

export default Navbar;
