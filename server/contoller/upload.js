const cloudinary = require('cloudinary');
const fs = require('fs');
require('dotenv').config(); 
module.exports = {
    uploaded: (req, res) => {
        if (!req.files){
          return res.status(400).send('No files were uploaded.');
        }

        cloudinary.config(process.env.CLOUDINARY_URL);
        // cloudinary.config({ 
        //     cloud_name: 'devmountain', 
        //     api_key: '496317639374845', 
        //     api_secret: 'u2F-OfEOvqCAWavm-2lnWNlHR-8' 
        //   });
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;
        console.log(sampleFile)
    
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(`./temp/${req.files.file.name}`, (err) => {


          if (err){
            return res.status(500).send(err);
          }

          cloudinary.v2.uploader.upload(`./temp/${req.files.file.name}`, {
              public_id:`${req.files.file.name}`,
              overwrite: true,
            },function(err, result) { 
            fs.unlink(`./temp/${req.files.file.name}`, function(error) {
                if (error) {
                    throw error;
                }
                console.log('Deleted');
                console.log(result)
                
                  
                res.send(result);
            });
            
          });
          
        });
      }
}