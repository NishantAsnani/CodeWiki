const STATUS_CODE={
NOT_FOUND:404,
SUCCESS:200,
SERVER_ERROR:500,
UNAUTHORIZED:401,
CONFLICT:409,
}

const IGNORED_FOLDERS =[
  "node_modules",
  ".git",
  ".github",
  "dist",
  "build",
  "coverage",
  ".next",
  ".vscode",
  ".idea",
  "__pycache__"
]

module.exports={
    STATUS_CODE,
    IGNORED_FOLDERS
}