const { IGNORED_FOLDERS } = require("../utils/constants");

function buildFolderStructure(tree) {
    const folders = new Map();
    let totalFiles = 0;

    tree.forEach(item => {
        if (item.type !== "blob") return;

        totalFiles++;

        const parts = item.path.split("/");


        if (parts.length === 1) return;

        const topLevelFolder = parts[0];

        if (IGNORED_FOLDERS.includes(topLevelFolder)) return;

        folders.set(
            topLevelFolder,
            (folders.get(topLevelFolder) || 0) + 1
        );
    });

    const scopes = [
        {
            name: "Entire Repository",
            value: "/",
            recommended: true,
            fileCount: totalFiles,
        },
    ];

    for (const [folder, fileCount] of folders.entries()) {
        scopes.push({
            name: folder,
            value: folder,
            recommended: false,
            fileCount,
        });
    }

    return {
        repositoryType:
            folders.size === 0
                ? "flat"
                : folders.size === 1
                ? "single_scope"
                : "multi_scope",

        canSelectScope: folders.size > 0,

        totalFiles,

        scopes,
    };
}

module.exports={
    buildFolderStructure
}