import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import BioCard from './BioCard';
import Search from './Seach';
import  FormDialog from '../Form/CreatrUser'; // Import the FormDialog component
import AddIcon from '@mui/icons-material/Add';

function Profile() {
  const [User, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to manage dialog visibility

  const getAllData = async () => {
    try {
      const getPeople = await fetch(
        `http://localhost:4000/user/getallUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!getPeople.ok) {
        throw new Error(`Failed to fetch data: ${getPeople.statusText}`);
      }
  
      const contentType = getPeople.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format");
      }
  
      const res = await getPeople.json();
      setUser(res.data); 
      console.log(res);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  
  useEffect(() => {
    getAllData();

  }, [openDialog]);

  const handleCreateUserClick = () => {
    setOpenDialog(true); // Open the dialog when "Create User" button is clicked
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container sx={{ bgcolor: "" }}>
        <Typography sx={{ mt: 5, mb: 5, fontFamily: "cursive" }} variant='h3'>Users</Typography>
        <Search />
      </Container>
      <Container sx={{}}>
        <Grid container spacing={4} sx={{display:"flex" ,alignContent:"center",justifyContent:'start' ,pl:2,pr:2}}>
          {User.map((item) => (
            <Grid item key={item._id}>
              <BioCard name={item.name} description={item.description} imgUrl={item.imgUrl} />
            </Grid>
          ))}
        </Grid>
        <div style={{position:'absolute',left:'90%',top:"80%"}}>
          <Button onClick={handleCreateUserClick} sx={{position:'fixed', borderRadius:"50px"}}>
            <AddIcon  sx={{fontSize:'50px'}}/>
          </Button>
        </div>
   
        <FormDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      </Container>
    </>
  );
}

export default Profile;
