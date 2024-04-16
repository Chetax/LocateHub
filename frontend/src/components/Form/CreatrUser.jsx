import React, { useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import useLocation from '../Map/useGeoLocation';

function FormDialog({ open, onClose }) {
  const location = useLocation(); // Get user location
  const { register, handleSubmit, setValue } = useForm(); // Include setValue function from useForm

  const handleClose = () => {
    onClose();
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
        'https://bynry-assignment.vercel.app/user/createUser',
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
  );
}

export default FormDialog;
