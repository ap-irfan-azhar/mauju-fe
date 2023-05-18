// simple profile page

import { useState, useEffect } from 'react'
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
  Stack,
  Table
} from '@mui/material'

import { me } from '@/rest/auth'
import Navbar from '@/components/Navbar'

const Profile = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  const handleGetMe = async () => {
    try {
      const res = await me()
      if (res.status === 'success') {
        // @ts-ignore
        setUser(res.data.user)
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }
  }

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <Typography component="h1" variant="h3" sx={{
            textAlign: 'left',
          }}>
            Profile
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              minWidth: '90vw'
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: 2 }}
              >
              {`ID: ${user?.id}`}
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: 2 }}
            >
              {`Name: ${user?.name}`}
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: 2 }}
              >
              {`Email: ${user?.email}`}
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ marginTop: 2 }}
            >
              {`Created At: ${user?.created_at}`}
            </Typography>
          </Box>
        </Box>
      </Container>
    
    </>
  )
}

export default Profile;