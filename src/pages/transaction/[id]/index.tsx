// detail transaction page

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

import { getTransaction } from '@/rest/transaction'
import { ITransaction } from '@/types/transaction'
import Navbar from '@/components/Navbar'

const TransactionDetail = () => {
  const router = useRouter()
  const [transaction, setTransaction] = useState<ITransaction | null>(null)

  const id = router.query.id as string
  

  const handleGetTransaction = async () => {
    try {
      if (!id) return;

      const res = await getTransaction(id)
      if (res.status === 'success') {
        // @ts-ignore
        setTransaction(res.data.transaction)
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
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '500px' }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Transaction Detail
            </Typography>
            <Button
              variant="contained"
              onClick={handleGetTransaction}
            >
              Get Transaction
            </Button>
            <Table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>amount</th>
                  <th>description</th>
                  <th>type</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {transaction && (
                  <tr>
                    <td>{transaction.id}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.created_at}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default TransactionDetail;