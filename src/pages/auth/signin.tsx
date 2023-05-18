// create simple login page with mui

import { useState } from 'react'
import { useRouter } from 'next/router'
import {  
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Container,
  Grid,
  Paper,
  Stack
} from '@mui/material'
import { login } from '@/rest/auth'


const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(true)

  const handleSignIn = async () => {
    try {
      const res = await login({ email, password })
      if (res.status === 'success') {
        router.push('/transaction')
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }

  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '500px' }}>
          <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
            Sign in
          </Typography>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </Stack>
          <Grid container sx={{ marginTop: 2 }}>
            <Grid item>
              <Link href="/signup" variant="body2" onClick={() => router.push('/auth/signup')}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default SignIn;