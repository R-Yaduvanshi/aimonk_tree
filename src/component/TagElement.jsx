import React, { useState } from "react";
import AddChildModal from "./AddChildModal";
import { useDisclosure, useToast } from "@chakra-ui/react";

const TagElement = ({ tag, onAddChild, onNameChange, onHandleCollapse }) => {
  const toast = useToast();
  const [newChildName, setNewChildName] = useState("");

  const handleNameChange = (event) => {
    onNameChange(tag, event.target.value);
  };

  const handleAddChild = () => {
    onAddChild(tag, newChildName);
    setNewChildName("");
    toast({
      title: "Child Added",
      description: "you have successfully added your child name",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
    // console.log(newChildName);
  };

  const collapsedFun = () => {
    onHandleCollapse(tag);
  };
  return (
    <div className="tag">
      <div className="tag-header">
        <div>
          <button onClick={collapsedFun}>{tag.collapsed ? ">" : "v"}</button>
          <span>{tag.name}</span>
        </div>
        <AddChildModal
          hanndleNewChild={handleAddChild}
          handleInputAddChild={(e) => setNewChildName(e.target.value)}
        />
      </div>
      {!tag.collapsed && (
        <>
          {tag.children &&
            tag.children.map((child) => (
              <TagElement
                key={child.name}
                tag={child}
                onAddChild={onAddChild}
                onNameChange={onNameChange}
                onHandleCollapse={onHandleCollapse}
              />
            ))}
          {tag.data !== undefined && (
            <>
              <div className="data_div">
                <p>Data</p>
                <input
                  type="text"
                  value={tag.data}
                  onChange={handleNameChange}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TagElement;
