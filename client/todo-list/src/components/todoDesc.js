import React from "react";

const TodoDesc = () => {
  return (
    <>
      <div>
        <span className="font-semibold text-md max-md:block max-md:text-center max-md:mb-3">Description: </span>{" "}
        <span className="w-10 h-10 bg-orange-600 px-3"></span>&nbsp;Non Priority{" "}
        <span className="w-10 h-10 bg-green-600 px-3"></span>
        &nbsp;Low Priority <span className="w-10 h-10 bg-red-600 px-3"></span>
        &nbsp; High Priority
      </div>
      <hr className="w-full border border-orange-600 color-black" />
    </>
  );
};

export default TodoDesc;
