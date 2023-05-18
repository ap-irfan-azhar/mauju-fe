// simple list of transaction list table

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
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

import { getTransactions, deleteTransaction } from '@/rest/transaction'
import { ITransaction } from '@/types/transaction'
import Navbar from '@/components/Navbar'
import ModalConfirmation from '@/components/modal/ConfirmationModal'

const TransactionList = () => {
  const router = useRouter()
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
  const [rows, setRows] = useState<any[]>([])

  const handleGetTransactions = async () => {
    try {
      const res = await getTransactions()
      if (res.status === 'success') {
        setTransactions(res.data.transactions)
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }
  }

  const handleDeleteTranasaction = async (id: string) => {
    try {
      const res = await deleteTransaction(id)
      if (res.status === 'success') {
        handleGetTransactions()
        alert(`Transaction with id ${id} deleted`)
      }
    } catch (err) {
      // @ts-ignore
      alert(err.response.data.errors[0].message)
    }
  }

  const openDeleteDialog = (id: string) => {
    setSelectedId(id)
    setIsOpenDeleteDialog(true)
  }

  const createData = (
    id: string,
    name: string,
    amount: number,
    description: string,
    type: string,
  ) => {
    return { id, name, amount, description, type };
  }

  useEffect(() => {
    handleGetTransactions()
  }, [])

  useEffect(() => {
    const rows = transactions.map((transaction) => {
      return createData(
        transaction.id,
        transaction.name,
        transaction.amount,
        transaction.description,
        transaction.type,
      )
    })
    setRows(rows)
  }, [transactions])

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
          <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '90vw' }}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 2 }}>
              Transaction List
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    rows.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                        <TableCell align="right">
                          <Container style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: '5px'
                          }}>
                            <Button
                              variant="contained"
                              onClick={() => router.push(`/transaction/${row.id}`)}
                              >
                              Detail
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => router.push(`/transaction/${row.id}/update`)}
                              color="warning"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => openDeleteDialog(row.id)}
                              color="error"
                            >
                              Delete
                            </Button>
                          </Container>
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
      {
        isOpenDeleteDialog && (
          <ModalConfirmation
            title="Delete Transaction"
            message="Are you sure want to delete this transaction?"
            onClose={() => setIsOpenDeleteDialog(false)}
            onConfirm={() => {
              handleDeleteTranasaction(selectedId)
              setIsOpenDeleteDialog(false)
            }}
          />
        )
      }
    </>
  )
}

export default TransactionList;