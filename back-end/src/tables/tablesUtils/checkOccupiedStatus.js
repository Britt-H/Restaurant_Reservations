const service = require("../tables.services");

async function checkOccupiedStatus(req,res,next){
    const {table_id} = req.params;
    const table = await service.read(Number(table_id))

    if(table.occupied === true){
        return next({status:400,message:"Table is currently occupied."})
    }
    
    next();
}

module.exports = checkOccupiedStatus;