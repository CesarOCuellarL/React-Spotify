import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getSpotifyToken, spotifySearch } from "../../api/spotify";
import { Card } from "../../components/Card";
const cookies = new Cookies();

function Home() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        type: "all",
        query: null,
    });
    const TYPES = ["all","album","artist","track"];
    const token = cookies.get("token");

    const search = async () => {
        const data = await spotifySearch(searchQuery.type, searchQuery.query);
        setData(data);
    };

    useEffect(() => {
        if(!token) getSpotifyToken();
    }, [token]);

    return (
        <Grid container marginTop={10}>
            <Grid item xs={6}>
                <TextField 
                id="outlined-search" 
                label="Search Field" 
                type="search" 
                onChange={(e) => 
                    setSearchQuery((current) => ({ ...current, query: e.target.value }))
                }
            />
            <FormControl>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchQuery.type}
                    label="Age"
                    onChange={(e) =>
                        setSearchQuery((current) => ({ ...current, type: e.target.value }))
                }
                >
                        {TYPES.map((element, idx) => (
                            <MenuItem key={idx} value={element}>
                                {element}
                            </MenuItem>
                        ))}
                    </Select>
            </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={search}>
                    Search
                </Button>
            </Grid>
            <Grid 
            container
            spacing={{ xs:2, md:3 }}
            columns={{ xs:4, sm:8, md:12 }}
            padding={10}
            >
                {data?.tracks &&
                    data?.tracks?.items?.map((track, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card
                                name={track.name}
                                artist={track.artist[0].name}
                                image={track.album?.images[0]?.url}
                            />
                        </Grid>
                    ))}  
            </Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
}
export default Home;