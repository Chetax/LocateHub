import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import useLocation from '../Map/useGeoLocation';

export default function FormDialog() {
  const location = useLocation(); // Get user location
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm(); // Include setValue function from useForm

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createEmployee = async (data) => {
    // Add location data to form data
    const formDataWithLocation = {
      ...data,
      latitude: location.coordinate.lat,
      longitude: location.coordinate.lng,
    };

    try {
      const savedUserResponse = await fetch(
        'http://localhost:4000/user/createUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithLocation), // Send form data with location
        }
      );

      if (!savedUserResponse.ok) {
        throw new Error('Failed to create user');
      }

      console.log('User created successfully');
      // Additional logic after successful user creation
      handleClose();
    } catch (error) {
      console.error('Error creating user:', error.message);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  // Use useEffect to set location values in the form fields
  useEffect(() => {
    // Check if location is available
    if (location.loaded && !location.error) {
      // Set latitude and longitude values in form fields
      setValue('latitude', location.coordinate.lat);
      setValue('longitude', location.coordinate.lng);
    }
  }, [location, setValue]);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(createEmployee)}>
          <DialogTitle>Creating User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="User Name"
              type="text"
              fullWidth
              variant="standard"
              {...register('name')}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="textarea"
              fullWidth
              variant="standard"
              {...register('description')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="instagram"
              name="instagram"
              label="Instagram"
              type="text"
              fullWidth
              variant="standard"
              {...register('instagram')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="facebook"
              name="facebook"
              label="Facebook"
              type="text"
              fullWidth
              variant="standard"
              {...register('facebook')}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="address"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              {...register('address')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create User</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
