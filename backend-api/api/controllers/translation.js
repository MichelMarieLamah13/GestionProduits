const Translation = require('../models/Translation');


// Route for getting all translation
exports.get_all_translation = (req, res, next)=>{
    Translation.find({}, (error, docs)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(docs);
        }
    })
}
// Route for adding translation
exports.add_translation = (req, res, next)=>{
    const translation = new Translation(req.body);
    translation.save((error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
}
// Route for updating translation
exports.update_translation = (req, res, next)=>{
    const data = req.body;
    Translation.findByIdAndUpdate(req.params.id, {$set: data}, {new: true}, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc)
        }
    })
}
// Route for deleting translation
exports.delete_translation = (req, res, next)=>{
    Translation.findByIdAndDelete(req.params.id, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
}
// Route for finding translation by id
exports.find_translation_by_id = (req, res, next)=>{
    Translation.findById(req.params.id, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
}
