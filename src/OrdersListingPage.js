import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Paper, Typography, Box, FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,} from '@mui/material';
import { fetchOrders } from './api';  // Import the fetch function

const OrdersListingPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    New: false,
    Packed: false,
    InTransit: false,
    Delivered: false,
  });
  const [page, setPage] = useState(0); // Page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchOrders();  // Fetch orders from the API
      setOrders(data);
      setFilteredOrders(data);  // Initially show all orders
    };

    loadOrders();
  }, []);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: checked };
      filterOrders(updatedFilters);  // Reapply filters when any checkbox changes
      return updatedFilters;
    });
  };

  const filterOrders = (filters) => {
    const activeFilters = Object.keys(filters).filter((status) => filters[status]);
    if (activeFilters.length > 0) {
      const filtered = orders.filter((order) => activeFilters.includes(order.status));
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);  // Show all orders if no filter is applied
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset page to 0 when rows per page is changed
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Orders Listing
      </Typography>

      {/* Filters in Flex Row */}
      <FormGroup sx={{ marginBottom: 3, display: 'flex', flexDirection: 'row', gap: 2 }}>
        {['New', 'Packed', 'InTransit', 'Delivered'].map((status) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={filters[status]}
                onChange={handleFilterChange}
                name={status}
                color="primary"
              />
            }
            label={status}
            key={status}
            sx={{
              '& .MuiCheckbox-root': {
                padding: 0,
              },
              '& .MuiFormControlLabel-label': {
                fontWeight: 600,
              },
            }}
          />
        ))}
      </FormGroup>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default OrdersListingPage;
