import { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Loading from "./Loading";

export default function SearchBox2() {
  const [options, setOptions] = useState([]);

  const [name, setName] = useState("middle");

  const [loading, setLoading] = useState(false);

  const timeOut = useRef(null);

  let getCollegeNames = useCallback(async () => {
    if (name.trim().length === 0 || name.length === 0) return;
    if (!timeOut.current) {
      //Adding debounce
      setLoading(true);
      timeOut.current = setTimeout(async () => {
        let response = await fetch(
          "http://universities.hipolabs.com/search?name=" + name
        );
        let ans = await response.json();

        //Limiting the amount of resources to be set whenver we hit a request
        setOptions(ans.slice(0, Math.min(100, ans.length)));
        setLoading(false);
      }, 1000);
    } else {
      clearTimeout(timeOut.current);
      setLoading(true);
      timeOut.current = setTimeout(async () => {
        let response = await fetch(
          "http://universities.hipolabs.com/search?name=" + name
        );
        let ans = await response.json();

        //Limiting the amount of resources to be set whenver we hit a request
        setOptions(ans.slice(0, Math.min(100, ans.length)));
        setLoading(false);
      }, 1000);
    }
  }, [name]);

  const handleCollegeSelection = async (value) => {
    let domain = value?.domains[0];

    console.log(domain);


    // let response = await fetch("https://logo.clearbit.com/")
    // let logo = await response.json()
  };

  useEffect(() => {
    try {
      getCollegeNames();
    } catch (e) {
      console.error(e);
    }
  }, [name, getCollegeNames]);
  return (
    <Autocomplete
      id="College-Select"
      sx={{ width: 300 }}
      options={options}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(event, newValue) => handleCollegeSelection(newValue)}
      autoHighlight
      loading={loading}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          onSelect={(e) => console.log("Selected " + name)}
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.domains[0]}
        >
          <img
            loading="lazy"
            width="20"
            // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`${option?.domains[0] ? `https://logo.clearbit.com/${option?.domains[0]}` : "/images/download.png"}` }
            alt="logo"
          />
          {option.name} ({option.alpha_two_code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose Your College"
          onChange={(e) => {
            setName(e.target.value);
            console.log(e.target.value);
          }}
          value={name}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
