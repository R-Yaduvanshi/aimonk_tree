import React, { useState } from "react";

const TagElement = ({ tag, onAddChild, onNameChange, onHandleCollapse }) => {
  const [newChildName, setNewChildName] = useState("");

  const handleNameChange = (event) => {
    onNameChange(tag, event.target.value);
  };

  const handleAddChild = () => {
    onAddChild(tag, newChildName);
    setNewChildName("");
  };

  const collapsedFun = () => {
    onHandleCollapse(tag);
  };
  return (
    <div className="tag">
      <div className="tag-header">
        <button onClick={collapsedFun}>{tag.collapsed ? ">" : "v"}</button>
        <span>{tag.name}</span>
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
            <input type="text" value={tag.data} onChange={handleNameChange} />
          )}
          {tag.children === undefined && (
            <div className="add-child">
              <input
                type="text"
                placeholder="New Child Name"
                value={newChildName}
                onChange={(event) => setNewChildName(event.target.value)}
              />
              <button onClick={handleAddChild}>Add Child</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TagElement;
