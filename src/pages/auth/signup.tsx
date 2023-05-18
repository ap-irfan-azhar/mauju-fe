// simple sign up page with email, name, password, and password confirmation fields

import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Container,
  Grid,
  Stack
} from '@mui/material'
import { register } from '@/rest/auth'

const SignUp = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState('')

  const handleSignUp = async () => {
    try {
      const payload = {
        name,
        email,
        password,
        password_confirm: passwordConfirmation,
      }
      console.log(payload)
      const res = await register(payload)
      if (res.status === 'success') {
        router.push('/auth/signin')
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
            {/* name */}
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Password Confirmation"
              variant="outlined"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleSignUp}
            >
              Sign in
            </Button>
          </Stack>
          <Grid container sx={{ marginTop: 2 }}>
            <Grid item>
              <Link href="/auth/signin" variant="body2" onClick={() => router.push('/auth/signin')}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default SignUp;
