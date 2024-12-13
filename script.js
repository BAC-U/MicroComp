function getAllBlocks(workspace) {
    let blockInfo = [];
    let ids = new Set();

    function getBlockInfo(block) {
        if (ids.has(block.id)) return null;
        ids.add(block.id);

        // Collect nested blocks (true child blocks inside inputs)
        let nbf = [];
        block.inputList.forEach(input => {
            if (input.connection && input.connection.targetBlock()) {
                let targetBlock = getBlockInfo(input.connection.targetBlock());
                if (targetBlock) {
                    nbf.push(targetBlock);
                }
            }
        });

        // Process the next block (sequential sibling block)
        let nextBlock = block.getNextBlock();
        while (nextBlock) {
            let nextBlockData = getBlockInfo(nextBlock);
            if (nextBlockData) {
                blockInfo.push(nextBlockData);  // Push sequential sibling block to the top-level array
            }
            nextBlock = nextBlock.getNextBlock();
        }

        return {
            type: block.type,
            id: block.id,
            childs: nbf
        };
    }

    // Process all top-level blocks
    workspace.getTopBlocks(true).forEach(block => {
        let blockData = getBlockInfo(block);
        if (blockData) {
            blockInfo.push(blockData);
        }
    });

    return blockInfo;
}

function compileBlocksToJson() {
    let blocksJson = getAllBlocks(workspace);
    console.log(JSON.stringify(blocksJson, null, 2));
    console.log(workspace.getAllBlocks(false));
}
