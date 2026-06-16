const express=require('express');
const router=express.Router()
const userRoutes=require('./api/user.routes');
const chatRoutes=require('./api/chat.routes');
const projectRoutes=require('./api/project.routes')

router.use('/user',userRoutes)
router.use('/chat',chatRoutes)
router.use('/project',projectRoutes)



router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports=router