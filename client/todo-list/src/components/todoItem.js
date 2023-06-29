import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Button from "@mui/material/Button";
import { useState } from "react";
import CheckBox from "@mui/material/Checkbox";
import axios from "axios";

const TodoItem = ({ item, listItems, setListItems, setIsUpdating }) => {

   //delete Item  //
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5600/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
    } catch (error) {
      console.log(error.message);
    }
  };

    //done Item  //
    const doneItem = async (id) => {
      try {
        const res = await axios.put(`http://localhost:5600/api/item/done/${id}`);
        window.location.reload(false);
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <>
      <div className="flex flex-col">
        <p
          className={`w-[300px] mb-5 max-md:w-[150px] max-sm:w-[100px]" ${
            item?.priority === "High"
              ? " bg-red-500 p-3 rounded-lg text-white"
              : ""
          } ${
            item?.priority === "Low"
              ? " bg-green-500 p-3 rounded-lg text-white"
              : ""
          }
                        ${
                          item?.priority === ""
                            ? " bg-orange-500 p-3 rounded-lg text-white"
                            : ""
                        }
                        `}
          style={{ overflowWrap: "break-word" }}
        >
          {item.item}
        </p>
        <div className="flex gap-10">
          {item?.priority !== "" && (
            <p className="font-bold">Priority: {item?.priority}</p>
          )}
          {item?.tags[0] !== "" && (
            <p className="font-bold">Tag: {item?.tags[0]}</p>
          )}
          {item?.done === true && (
            <p className="font-bold text-green-500">Done</p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="contained"
          endIcon={<DeleteIcon />}
          color="error"
          size="small"
          onClick={() => {
            deleteItem(item._id);
          }}
        />
        {item?.done !== true && (
          <>
            <Button
              variant="contained"
              endIcon={<ModeEditOutlineRoundedIcon />}
              color="success"
              size="small"
              onClick={() => setIsUpdating(item._id)}
            />
            <CheckBox
              onClick={() => {
                doneItem(item._id);
              }}
              color="success"
            />
          </>
        )}
      </div>
    </>
  );
};

export default TodoItem;
