import logo from "./logo.svg";
import "./App.css";
import TagElement from "./component/TagElement";
import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";

const initialTree = {
  name: "Root",
  collapsed: true,
  children: [
    {
      name: "child1",
      collapsed: true,
      children: [
        { name: "child1-child1", data: "c1-c1 Hello", collapsed: true },
        { name: "child1-child2", data: "c1-c2 JS", collapsed: true },
      ],
    },
    { name: "child2", data: "c2 World", collapsed: true },
  ],
};
function App() {
  const [tree, setTree] = useState(initialTree);

  const handleAddChild = (parentTag, childName) => {
    if (!parentTag.children) {
      parentTag.children = [];
    }
    parentTag.children.push({ name: childName, collapsed: true });
    setTree({ ...tree });
  };

  const handleNameChange = (tag, newName) => {
    tag.name = newName;
    setTree({ ...tree });
  };

  const handleCollapseToggle = (tag) => {
    tag.collapsed = !tag.collapsed;
    setTree({ ...tree });
  };

  const handleExport = () => {
    const exportedData = JSON.stringify(tree, ["name", "children", "data"], 2);
    console.log(exportedData); // we can change this to set the data to a state for display on the UI.
  };
  return (
    <div className="App">
      <Text fontWeight={"extrabold"}>Nested Tags Tree</Text>
      <TagElement
        tag={tree}
        onAddChild={handleAddChild}
        onNameChange={handleNameChange}
        onHandleCollapse={handleCollapseToggle}
      />
      <Button onClick={handleExport}>Export</Button>
    </div>
  );
}

export default App;
