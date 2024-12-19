import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load cart data from localStorage 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotal(storedCart); 
  }, []);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity; 
    });
    setTotalPrice(total.toFixed(2)); 
  };

  // Handle delete functionality
  const handleDelete = (_id) => {

    // Debugging to check the id
    console.log("Deleting item with id:", _id);

    const updatedCart = cartItems.filter((item) => item._id !== _id); 
    console.log("Updated Cart after deletion:", updatedCart);

    setCartItems(updatedCart); 
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    calculateTotal(updatedCart); 

    toast.success("Item removed from the cart.");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" mb={4}>
        Your Cart
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button LinkComponent={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Button LinkComponent={Link} to="/" variant="contained" color="secondary">
          Cart
        </Button>
      </Box>

      {cartItems.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h6" mb={2}>
            Your cart is empty.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="cart table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(item._id)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {cartItems.length > 0 && (
        <Box mt={4} display="flex" justifyContent="space-between">
          <Typography variant="h6">Total: ${totalPrice}</Typography>
        </Box>
      )}
    </Container>
  );
}

export default AddToCart;
