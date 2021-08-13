const Menu = require('../models/Menu');


// Route for getting all menu
exports.get_all_menu = (req, res, next)=>{
    Menu.find({}, (error, docs)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(docs);
        }
    })
}
// Route for adding menu
exports.add_menu = (req, res, next)=>{
    const menu = new Menu(req.body);
    menu.save((error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
}
// Route for updating menu
exports.update_menu = (req, res, next)=>{
    const data = req.body;
    Menu.findByIdAndUpdate(req.params.id, {$set: data}, {new: true}, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc)
        }
    })
}
// Route for deleting menu
exports.delete_menu = (req, res, next)=>{
    Menu.findByIdAndDelete(req.params.id, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
}
// Route for finding menu by id
exports.find_menu_by_id = (req, res, next)=>{
    Menu.findById(req.params.id, (error, doc)=>{
        if (error){
            console.log(error);
        }else{
            res.status(200).json(doc);
        }
    })
}

// Add a translation
exports.add_translation_to_menu = (req, res, next)=>{
    const menu = Menu.findById(req.params.id);
    if (menu){
        if (!menu.translations.includes(req.body.transId)){
            menu.updateOne({$push: {translations: req.body.transId}}, {new: true}, (error, doc)=>{
                if (error){
                    console.log(error);
                }else{
                    res.status(200).json(doc);
                }
               
            })
        }
    }
}
// Remove a translation
exports.remove_translation_to_menu = (req, res, next)=>{
    const menu = Menu.findById(req.params.id);
    if (menu){
        if (menu.translations.includes(req.body.transId)){
            menu.updateOne({$pull: {translations: req.body.transId}}, {new: true}, (error, doc)=>{
                if (error){
                    console.log(error);
                }else{
                    res.status(200).json(doc);
                }
            })
        }
    }
}
