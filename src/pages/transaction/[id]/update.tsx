// simple page to update transaction

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
  Select
} from '@mui/material'

import { getTransaction, updateTransaction } from '@/rest/transaction'
import { ITransaction, ITransactionInput } from '@/types/transaction'
import Navbar from '@/components/Navbar'
const TransactionUpdate = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'INCOME' | 'EXPENSE' | ''>('')

  const id = router.query.id as string

  const handleGetTransaction = async () => {
    try {
      if (!id) return;

      const res = await getTransaction(id)
      if (res.status === 'success') {
        // @ts-ignore
        const transaction = res.data.transaction
        setName(transaction.name)
        setAmount(transaction.amount)
        setDescription(transaction.description)
        setType(transaction.type)
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }
  }

  const handleUpdateTransaction = async () => {
    try {
      if (!id) return;

      const input: ITransactionInput = {
        name,
        amount,
        description,
        type
      }
      const res = await updateTransaction(id, input)
      if (res.status === 'success') {
        router.push('/transaction/')
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }
  }

  useEffect(() => {
    handleGetTransaction()
  }, [id])

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '500px' }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Update Transaction
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2, width: '100%' }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 2, width: '100%' }}
            />
            <TextField
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              sx={{ marginBottom: 2, width: '100%' }}
            />
            <Select
              native
              value={type}
              // @ts-ignore
              onChange={(e) => setType(e.target.value as 'INCOME' | 'EXPENSE')}
              sx={{ marginBottom: 2, width: '100%' }}
            >
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </Select>
            <Button
              variant="contained"
              onClick={handleUpdateTransaction}
              sx={{ marginBottom: 2, width: '100%' }}
            >
              Update Transaction
            </Button>
            <Link href="/transaction/" sx={{ width: '100%' }}>
              <Button variant="outlined" sx={{ width: '100%' }}>
                Cancel
              </Button>
            </Link>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default TransactionUpdate;


