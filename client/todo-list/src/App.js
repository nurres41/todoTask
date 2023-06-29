//React Hooks and Helpers
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
//MUI Icons
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//MUI Materials
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
//App Components
import TodoItem from "./components/todoItem";
import TodoForm from "./components/todoForm";
import TodoDesc from "./components/todoDesc";
import Title from "./components/Title";

function App() {
  
  //States Start
  const [itemText, setItemText] = useState("");
  const [itemPriority, setItemPriority] = useState("");
  const [itemTag, setItemTag] = useState("");
  const [isDone, setIsDone] = useState(false);

  const [updateTag, setUpdateTag] = useState("");
  const [updatePriority, setUpdatePriority] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [life, setLife] = useState([]);

  //States Finish

  //Update Add Priority & Tag
  const handleUpdatePriority = (e) => {
    setUpdatePriority(e.target.value);
    console.log(itemPriority);
  };

  const handleUpdateTags = (e) => {
    setUpdateTag(e.target.value);
    console.log(itemTag);
  };

  //Add new todo to db
  const addItem = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5600/api/item", {
        item: itemText,
        priority: itemPriority,
        tags: itemTag,
        done: isDone,
      });
      //Add new data to db and keep old data.
      setListItems((prev) => [...prev, res.data]);
      //Reset inputs after add.
      setItemText("");
      setItemPriority("");
      setItemTag("");
      console.log(res)
      if(res.status === 200){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
      if(res.data.item === ""){
        Swal.fire({
          icon: 'info',
          title: 'We think you forgot to write something in the field to-do!',
          text: 'But do not worry, you can update or delete.',
        })
      }
    } catch (error) {
      console.log(error)
    }
  };

  // get all todo items from database
  useEffect(() => {
    const getItemsList = async () => {
      try {
        // fetch all todo
        const res = await axios.get("http://localhost:5600/api/items");

          setListItems([...res.data]);
   
      } catch (error) {
        console.log(error);
      }
    };
    getItemsList();
  }, []);

  //update item form
  const renderUpdateForm = () => {
    return (
      <form
        className="flex items-center justify-between w-full gap-24"
        onSubmit={(e) => updateItem(e)}
      >
        <div className="flex flex-col w-full gap-4">
          <TextField
            id="standard-multiline-flexible"
            label="Update"
            multiline
            maxRows={4}
            variant="standard"
            className="w-full"
            onChange={(e) => setUpdateItemText(e.target.value)}
            value={updateItemText}
          />
          <div className="flex justify-between">
            <InputLabel id="demo-simple-select-standard-label">
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updatePriority}
              onChange={handleUpdatePriority}
              label="Priority"
              className="w-[30%]"
              size="medium"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-standard-label">Tags</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={updateTag}
              onChange={handleUpdateTags}
              label="Tags"
              className="w-[30%]"
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
        <div className="flex gap-4 items-center">
          <Button
            variant="contained"
            endIcon={<ArrowBackIcon />}
            size="small"
            type="submit"
            color="warning"
            onClick={() => {
              setIsUpdating("");
            }}
          />
          <Button
            variant="contained"
            endIcon={<ModeEditOutlineRoundedIcon />}
            size="small"
            type="submit"
            color="success"
          />
        </div>
      </form>
    );
  };

  //update Item
  const updateItem = async (id) => {
    try {
      //Overwrite data from client to old data.
      const res = await axios.put(
        `http://localhost:5600/api/item/${isUpdating}`,
        { item: updateItemText, priority: updatePriority, tags: updateTag }
      );
      //After process reset inputs.
      setUpdateItemText("");
      setUpdatePriority("");
      setUpdateItemText("");
    } catch (error) {
      console.log(error.message);
    }
  };

  //get lifetag items
  const getLifeTagItems = async () => {
    const res = await axios.get("http://localhost:5600/api/items/life");
    setLife([...res.data]);
    setListItems([]);
  }

  return (
    <div className="w-screen flex justify-center bg-gradient-to-t from-lime-300 via-lime-500 to-lime-800 min-h-screen max-md:w-screen ">
      <div className="w-[800px] flex justify-center my-8 flex-col items-center gap-8 bg-slate-100 py-10 px-6 rounded-2xl relative max-md:w-[400px]">
        {/*Todo Title Component*/}
        <Title />
        {/*Add Todo Form*/}
        <form
          className="h-100 flex items-center gap-4 justify-between w-full"
          onSubmit={(e) => addItem(e)}
        >
          {/*Todo Inputs Div*/}

          <div className="flex flex-col gap-5 mt-10 w-full">
            {/*Todo Text Input*/}
            <TextField
              id="outlined-multiline-flexible"
              label="Add Todo"
              multiline
              maxRows={4}
              className="w-full"
              type="text"
              onChange={(e) => {
                setItemText(e.target.value);
              }}
              value={itemText}
            />
            {/*Todo Select Div*/}
            <div className="flex gap-10 justify-between">
              {/*Todo Add Priority and Tag Component*/}
              <TodoForm
                setItemPriority={setItemPriority}
                setItemTag={setItemTag}
                itemPriority={itemPriority}
                itemTag={itemTag}
              />
              <Button
                variant="contained"
                endIcon={<AddBoxRoundedIcon />}
                size="large"
                type="submit"
              >
                Add
              </Button>
            </div>
          </div>
        </form>
        <div className="flex gap-5 items-center">
        Filter: 
        <Button
        variant="contained"
        size="small"
        type="submit"
        color="warning"
        onClick={()=>window.location.reload(true) }
      >
        See All
      </Button>
      <Button
        variant="contained"
        size="small"
        type="submit"
        color="warning"
        onClick={()=>getLifeTagItems()}
      >
        Life Tag
      </Button>
      </div>
      
        {/*Description Component*/}
        <TodoDesc />
     
        {/*All Todo Items*/}
        {listItems.map((item) => {
          return (
            <div className=" h-100  gap-5 w-full mt-4" key={item._id}>
              <div className="flex gap-5 h-100 items-center justify-between w-full">
                {isUpdating === item._id ? (
                  renderUpdateForm()
                ) : (
                  <TodoItem
                    item={item}
                    listItems={listItems}
                    setListItems={setListItems}
                    setIsUpdating={setIsUpdating}
                  />
                )}
              </div>
              <hr className="w-full border border-black-600 border-opacity-90 color-black mt-5" />
            </div>
          );
        })}
        {life.map((item) => {
          return (
            <div className=" h-100  gap-5 w-full mt-4" key={item._id}>
              <div className="flex gap-5 h-100 items-center justify-between w-full">
                {isUpdating === item._id ? (
                  renderUpdateForm()
                ) : (
                  <TodoItem
                    item={item}
                    listItems={listItems}
                    setListItems={setListItems}
                    setIsUpdating={setIsUpdating}
                  />
                )}
              </div>
              <hr className="w-full border border-black-600 border-opacity-90 color-black mt-5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;