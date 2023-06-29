import React from 'react'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";


const TodoForm = ({setItemPriority,itemPriority,setItemTag,itemTag}) => {




//First Add Priority & Tag
  const handleChangePriority = (e) => {
    setItemPriority(e.target.value);
    console.log(itemPriority);
  };

  const handleChangeTags = (e) => {
    setItemTag(e.target.value);
    console.log(itemTag);
  };


  return (
    <div className="w-full flex gap-6">
    <div className="w-full flex gap-6">
      <InputLabel id="demo-simple-select-standard-label">
        Priority
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={itemPriority}
        onChange={handleChangePriority}
        label="Priority"
        className="w-[60%]"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </Select>
    </div>
    <div className="w-full flex gap-6">
      <InputLabel id="demo-simple-select-standard-label">
        Tags
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={itemTag}
        onChange={handleChangeTags}
        label="Tags"
        className="w-[60%]"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Family">Family</MenuItem>
        <MenuItem value="Work">Work</MenuItem>
        <MenuItem value="Life">Life</MenuItem>
      </Select>
    </div>
  </div>
  )
}

export default TodoForm
