import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, Paper, Typography, Box, FormGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

// Function to fetch product data
const fetchProducts = async () => {
  const response = await fetch('/products.json'); // Update this path to match your actual API
  const data = await response.json();
  return data;
};

const ProductsListingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    expired: false,
    lowStock: false,
  });
  const [page, setPage] = useState(0); // Page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data); // Initially show all products
    };

    loadProducts();
  }, []);

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: checked };
      filterProducts(updatedFilters);
      return updatedFilters;
    });
  };

  const filterProducts = (filters) => {
    const activeFilters = {
      expired: filters.expired,
      lowStock: filters.lowStock,
    };

    let filtered = [...products];

    if (activeFilters.expired) {
      filtered = filtered.filter((product) => new Date(product.expiryDate) < new Date());
    }

    if (activeFilters.lowStock) {
      filtered = filtered.filter((product) => product.stock < 100);
    }

    setFilteredProducts(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to page 0 when rows per page is changed
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Products Listing
      </Typography>

      {/* Filters */}
      <FormGroup sx={{ marginBottom: 3, display: 'flex', flexDirection: 'row', gap: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.expired}
              onChange={handleFilterChange}
              name="expired"
              color="primary"
            />
          }
          label="Expired"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.lowStock}
              onChange={handleFilterChange}
              name="lowStock"
              color="primary"
            />
          }
          label="Low Stock"
        />
      </FormGroup>

      {/* Products Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{new Date(product.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>${product.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ProductsListingPage;
