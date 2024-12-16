let has_dropdown = [
    "event",
    "game",
    "player",
    "entity"
]
let has_multiple_dropdown = [
    "player",
    "entity"
]

function compileWorkspaceToJson() {
    const blocks = workspace.getAllBlocks().reverse();
    let bl2 = [];
    let blockMap = {}; 
    
    console.clear();
    blocks.forEach(block => {
        let bl = {
            id: block.id,
            type: block.type,
            ptype: "",
            pid: block.getSurroundParent() ? block.getSurroundParent().id : null, // for some reason thought this was only a typescript thing but I tried it and it worked yipppepepeppepep
            data: [],
            child: [],
        };
        if (has_dropdown.includes(bl.type)) {
            bl.data.push(block.getFieldValue("type_drop"));
        }
        if (has_multiple_dropdown.includes(bl.type)) {
            bl.data.push(block.getFieldValue("type_drop_2"));
        }
        blockMap[bl.id] = bl; 
    });

    blocks.forEach(block => {
        let bl = blockMap[block.id];
        if (bl.pid) {
            let parent = blockMap[bl.pid];
            if (parent) {
                parent.child.unshift(bl); 
            }
        } else {
            bl2.unshift(bl); 
        }
    })
    let string = JSON.stringify(bl2, null, 2); //uwu json libary 
    let base64String = btoa(string);
    console.log(string);
    console.log(base64String);
}
