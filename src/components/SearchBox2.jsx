import { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBox2() {
  const [options, setOptions] = useState([]);

  const [name, setName] = useState("middle")

  let getCollegeNames = useCallback (async () => {
    let response = await fetch(
      "http://universities.hipolabs.com/search?name=" + name
    );
    let ans = await response.json();
    console.log(ans);
    setOptions(ans)
  }, [name]);

  useEffect(() => {
    try {
        if(name.trim().length === 0 || name.length === 0){
            throw Error("Name can not be empty")
        }
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
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
          key={option.domains[0]}
        >
          {/* <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          /> */}
          {option.name} ({option.alpha_two_code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose Your College"
          onChange={(e) => {
            setName(e.target.value)
            console.log(e.target.value)
            }
            }
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

