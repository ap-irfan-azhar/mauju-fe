// simple create transaction page

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
  Stack,
  Select
} from '@mui/material'
import { createTransaction } from '@/rest/transaction'
import { ITransactionInput } from '@/types/transaction'
import Navbar from '@/components/Navbar'

const CreateTransaction = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'INCOME' | 'EXPENSE' | ''>('')

  const formValid = name && amount && description && type;

  const handleCreateTransaction = async () => {
    try {
      const payload : ITransactionInput = {
        name,
        amount: parseInt(amount),
        description,
        type
      }
      const res = await createTransaction(payload)
      if (res.status === 'success') {
        router.push('/transaction')
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '500px' }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Create Transaction
            </Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField
                label="Title"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Select
                native
                value={type}
                // @ts-ignore
                onChange={(e) => setType(e.target.value)}
              >
                <option aria-label="None" value="">Select Type</option>
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </Select>
              <Button
                variant="contained"
                onClick={handleCreateTransaction}
                disabled={!formValid}
              >
                Create Transaction
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default CreateTransaction;