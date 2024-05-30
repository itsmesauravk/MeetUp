const postData = require("../schema/postSchema")

const addPost = async(req,res) =>{
    try {
        if (!req.file.path) {
          return res.status(400).json({ message: 'No image uploaded' });
        }
    
        const { caption} = req.body;
        const{userId} = req.params;
        const imagePath = req.file.path.replace(/\\/g, "/");
        
    
        const addUserPost = await postData.create({
          caption: caption,
          image: imagePath,
          user: userId   
        });
    
        if (addUserPost) {
          return res.status(200).json({success:true, message: 'Your post has been added successfully', addUserPost });
        } else {
          return res.status(500).json({success:false, message: 'Failed to add post' });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }

}

const getPostUserDetails = async(req,res) =>{
  try {
    const showUserData = await postData.find({}).populate("user")
    if(!showUserData){
      return res.status(404).json({success:false,message:"Unable to show user"})
    }else{
      return res.status(200).json({success:true,showUserData})
    }
  } catch (error) {
    return res.status(400).json({success:false,message:"error",error})
  }
}


module.exports = {addPost,getPostUserDetails}