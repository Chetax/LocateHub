import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import BioCard from './BioCard';
import SearchBar from './Seach'; // Import the SearchBar component
import FormDialog from '../Form/CreatrUser'; // Import the FormDialog component
import AddIcon from '@mui/icons-material/Add';

function Profile() {
  const [users, setUsers] = useState([]); // Renamed User to users for better naming
  const [findUser, setFindUser] = useState(""); // State for search input
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getAllData = async () => {
    try {
      const response = await fetch(
        `https://bynry-assignment.vercel.app/user/getallUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not in JSON format");
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [openDialog, findUser]);

  const handleCreateUserClick = () => {
    setOpenDialog(true);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Container sx={{ bgcolor: "" }}>
        <Typography sx={{ mt: 5, mb: 5, fontFamily: "cursive" }} variant='h3'>Users</Typography>
            <SearchBar user={findUser} setuser={setFindUser} />
      </Container>
      <Container sx={{}}>
        <Grid container spacing={4} sx={{display:"flex" ,alignContent:"center",justifyContent:'start' ,pl:2,pr:2}}>
          {users
            .filter((item) => findUser === "" || item.name.toLowerCase().includes(findUser.toLowerCase()))
            .map((item) => (
              <Grid item key={item._id}>
                <BioCard name={item.name} description={item.description} imgUrl={item.imgUrl} instagram={item.instagram} facebook={item.facebook} longitude={item.latitude}  latitude={item.longitude}/>
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
