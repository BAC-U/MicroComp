function compileBlocksToJson() {
    const workspace = Blockly.getMainWorkspace();
    function getBlockData(block) {
      return {
        name: block.type,
        children: block.getChildren().map(getBlockData)
      };
    }
  
    const blocks = workspace.getTopBlocks(true);
    const blockData = blocks.map(getBlockData);
    console.log(JSON.stringify(blockData, null, 2););
    return JSON.stringify(blockData, null, 2);
  }
  
  console.log(jsonOutput);
  