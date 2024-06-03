import { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

export default function SearchBox2() {
  const [options, setOptions] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeOut = useRef(null);
  const [collegeLogo, setCollegeLogo] = useState("/images/notfound.png");

  const getCollegeNames = useCallback(async (name) => {
    //Simply returning nothing if the name is empty
    if (name.trim().length === 0) return;

    //Setting up timeout to apply the debouce functionality
    if (!timeOut.current) {
      setLoading(true);
      timeOut.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://universities.hipolabs.com/search?name=${name}`
          );
          const data = await response.json();
          setOptions(data.slice(0, Math.min(100, data.length)));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching college names:", error);
          setLoading(false);
        }
      }, 1000);
    } else {
      clearTimeout(timeOut.current);
      setLoading(true);
      timeOut.current = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://universities.hipolabs.com/search?name=${name}`
          );
          const data = await response.json();
          setOptions(data.slice(0, Math.min(100, data.length)));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching college names:", error);
          setLoading(false);
        }
      }, 1000);
    }
  }, []);

  //Once a college is selected we display it's name along with the logo.
  const handleCollegeSelection = async (value) => {
    setSelectedCollege(value);
    const domain = value?.domains[0];
    try {
      const response = await fetch(`https://logo.clearbit.com/${domain}`);
      if (response.ok) {
        setCollegeLogo(`https://logo.clearbit.com/${domain}`);
      } else {
        setCollegeLogo("/images/notfound.png");
      }
    } catch (error) {
      console.error("Error fetching college logo:", error);
      setCollegeLogo("/images/notfound.png");
    }
  };

  useEffect(() => {

    //Setting up a delay here as well, so the requests aren't immediately sent on rerendering.
    const delayedGetCollegeNames = setTimeout(() => {
      getCollegeNames("");
    }, 1000);

    return () => clearTimeout(delayedGetCollegeNames);
  }, [getCollegeNames]);

  return (
    <>
      <Autocomplete
        id="College-Select"
        sx={{ width: 300 }}
        options={options}
        value={selectedCollege}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        onChange={(event, newValue) => handleCollegeSelection(newValue)}
        autoHighlight
        loading={loading}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option.domains[0]}
          >
            <img
              loading="lazy"
              width="50"
              src={`${
                option?.domains[0]
                  ? `https://logo.clearbit.com/${option?.domains[0]}`
                  : "/images/notfound.png"
              }`}
              alt="logo"
            />
            {option.name} ({option.alpha_two_code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search College"
            onChange={(e) => getCollegeNames(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && (
                    <CircularProgress color="inherit" size={20} />
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {/* Conditional Rendering of the logo and the name, only if any value is selected. */}
      {selectedCollege && (
        <Box display="flex" alignItems="center" mt={2}>
          <Avatar
            alt={selectedCollege.name}
            src={collegeLogo}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <span>{selectedCollege.name}</span>
        </Box>
      )}
    </>
  );
}