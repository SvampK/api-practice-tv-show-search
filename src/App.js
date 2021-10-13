import "./App.css";
import * as React from "react";
import {
  TextField,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
// import { application } from "express";

function App() {
  const [input, setInput] = React.useState("");
  const [shows, setShows] = React.useState();
  const fetchData = async (input) => {
    const res = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${input}`
    );
    console.log("res", res);
    if (res.data.length > 0) {
      const shows = res.data.map((data) => data.show);
      console.log("shows", shows);
      setShows(shows);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    console.log("event: ", e.target.value);
  };
  React.useEffect(() => {
    fetchData(input);
    console.log("input:", input);
  }, [input]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
        }}
      >
        <TextField
          id="search-input"
          label="Search Tv show"
          variant="standard"
          placeholder="Search"
          value={input}
          onChange={handleChange}
        />
      </Box>
      {shows ? (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
        }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="showsTable">
              <TableHead>
                <TableRow>
                  <TableCell> Name</TableCell>
                  <TableCell> Runtime</TableCell>
                  <TableCell> Rating</TableCell>
                  <TableCell> Premiered</TableCell>
                  <TableCell> Link</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {shows.map((show) => (
                  <TableRow
                    key={show.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{show.name}</TableCell>
                    <TableCell>{show.runtime}</TableCell>
                    <TableCell>{show.rating.average}</TableCell>
                    <TableCell>{show.premiered}</TableCell>
                    <TableCell>
                      <a href={show.url}>{show.url}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : null}
    </>
  );
}

export default App;
