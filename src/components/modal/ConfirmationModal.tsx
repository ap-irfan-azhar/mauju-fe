// simple error modal

import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Link,
  Container
} from '@mui/material'
import { Modal } from '@mui/base'

interface Props {
  title: string
  message: string
  onClose: () => void
  onConfirm?: () => void
}

const ModalConfirmation = ({ title, message, onClose, onConfirm }: Props) => {
  return (
    <Modal open={true}>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '500px' }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {message}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onConfirm}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
        </Container>
    </Modal>
  )
}

export default ModalConfirmation;