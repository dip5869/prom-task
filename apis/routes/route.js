const express = require('express');
const router = express.Router()
const Admin = require('../models/admin')
const Emp = require('../models/employee')

router.post('/login',async(req,res)=>{
try{
    const admin = await Admin.findOne({'user_name': req.body.user_name,'password': req.body.password})
    if(admin!=null){
        res.json({'success':true,admin})
    }else{
        res.json({'success':false})
    }
  
}catch(err){
    res.send('Error,' + err)
}
})

router.get('/employees',async(req,res)=>{
try{
    const employees = await Emp.find()
    if(employees!=null){
        res.json({'success':true,employees})
    }else{
        res.json({'success':false})
    }
  
}catch(err){
    res.send('Error,' + err)
}
})

router.get('/:id',async(req,res)=>{
try{
    const employees = await Emp.findById(req.params.id)
    if(employees!=null){
        res.json({'success':true,employees})
    }else{
        res.json({'success':false})
    }
  
}catch(err){
    res.send('Error,' + err)
}
})

router.delete('/:id',async(req,res)=>{
try{
    
    const employees = await Emp.findOneAndDelete({ _id: req.params.id })
    if(employees!=null){
        res.json({'success':true})
    }else{
        res.json({'success':false})
    }
  
}catch(err){
    res.send('Error,' + err)
}
})

router.post('/add_employee',async(req,res)=>{
    const employee = new Emp({
        name:req.body.name,
        salary: req.body.salary
    })
    try{
        const a1 = await employee.save()
        res.json({'success':true})
    }catch(err){
        res.send('Error,' + err)
    }
    })

router.post('/update_employee',async(req,res)=>{
    try{
        const filter = { _id:req.body.id };
        const update = {"name":req.body.name,"salary":req.body.salary}
        let doc = await Emp.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
          });
        res.json({'success':true})
    }catch(err){
        res.send('Error,' + err)
    }
    })

router.post('/',async(req,res)=>{
    const admin = new Admin({
        user_name:req.body.user_name,
        password: req.body.password
    })
    try{
        const a1 = await admin.save()
        res.json(a1)
    }catch(err){
        res.send('Error,' + err)
    }
    })


module.exports = router