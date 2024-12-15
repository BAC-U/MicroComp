function compileWorkspaceToJson() {
    const blocks = workspace.getAllBlocks();
    let bl2 = [];
    let ids = [];
    console.clear();
    blocks.forEach(block => {
        let bl = {};
        bl = {
            id: block.id,
            type: block.type,
            child: []
        }
        if (block.getSurroundParent()) {
            bl.ptype = block.getSurroundParent().type;
            bl.pid = block.getSurroundParent().id;
        } else {
            bl.ptype = "";
            bl.pid = "null"
        }
        console.log(bl);
        bl2.push(bl); // use conact to keeep list reversedd
    });
    bl2.forEach(block => {
        let id = block.pid;
        bl2.forEach(block2 => {
            if (block2.id == id) {
                block2.child.concat(block);
                ids.concat(block.id);
            }
        });
    });
    for (let i = 0; i > bl2.length; i++) {
        if (ids.includes(bl2[i].id)) {
            bl2.splice(i,1);
        }
    }
    console.log(JSON.stringify(bl2, null, 2));
}
