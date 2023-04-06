const HealthDB = require('../model/healthRecord');
const UserDB = require('../model/user');

//dashboard
module.exports.dashboard= async function(req,res){
   try{
      let users = await UserDB.find({});
      return res.render('./admin/dashboard',{
         title:"Admin Dashboard",
         users:users
        })
   }
   catch(err){
      console.log(err);
      return res.redirect('back');
   }
}

//delete user
module.exports.deleteUser = async function(req,res){
   try{
      // console.log(req.params)
      await UserDB.findByIdAndDelete(req.params.id);
      return res.redirect('back');
   }
   catch(err){
      console.log(err);
      return res.redirect('back');
   }
}