const express=require('express');
const router=express.Router()
const auth=require('../../middleware/auth')
const projectControllers=require('../../controllers/project.controller')




router.post('/',auth,projectControllers.createProject);
router.post('/analyzeRepo',auth,projectControllers.analyzeProject)


module.exports=router