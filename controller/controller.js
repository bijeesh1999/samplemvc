const empls=require('../employees/emp');

const getEmployee = async (req,res)=>{

    try{
        const emps=await empls.find({});
        // res.send(emps)
        res.status(200).json(emps)
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
}
const getOneEmployee = async(req,res)=>{
    try{
        const {id}=req.params;
        const emps=await empls.findById(id);
        res.status(200).json(emps)
    }
    catch(err){
        console.log(err.message)
        res.status(404).json({message:err.message})
    }
}
const putOneEmployee=async(req,res)=>{
        try{
            const {id}=req.params
            console.log(id)
    
            const emp=await empls.findByIdAndUpdate(id ,req.body);
            // // if emp not found with id
            if(!emp){
                return res.status(404).json({message:`cannot find emp with id ${id}`})
            }
            const updatedemp=await empls.findById(id)
            res.status(200).json(updatedemp)
        }
        catch(err){
            console.log(err.message)
            res.status(404).json({message:err.message})
        }
    }
    const delOneEmployee=async(req,res)=>{
            try{
                const {id}=req.params;
                const empdel=await empls.findByIdAndDelete(id);
                if(!empdel){
                    return res.status(404).json({message:`cannot find emp with id ${id}`})
                }
                const deletedemp=await empls.findById(id)
                res.status(200).json(deletedemp)
        
            
            }
            catch(err){
                console.log(err.message)
                res.status(404).json({message:err.message})
            }
        }
module.exports = {getEmployee,getOneEmployee,putOneEmployee,delOneEmployee};