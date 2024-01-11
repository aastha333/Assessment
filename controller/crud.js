const response = require('../response/index');
const httpStatus = require('http-status');
const fs = require('fs');
const path = require('path');


// List all objects in the "bucket"
const getImage = async (req, res) => {
    try {
        const objects = fs.readdirSync('/home/user/taskProject/public');
        return response.success(req, res, { msgCode: 'Image Fetched Successfully', data: objects }, httpStatus.OK);
    }
    catch (err) {
        console.log(err);
        return response.error(req, res, { msgCode: 'Something Went Wrong' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Upload a new object to the "bucket"
const uploadImage = async (req, res) => {
    try {
        return response.success(req, res, { msgCode: 'File Uploaded Successfully' }, httpStatus.CREATED);
    }
    catch (err) {
        console.log(err);
        return response.error(req, res, { msgCode: 'Something Went Wrong' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Download a specific object from the "bucket"
const downloadSpecifcImage = async (req, res) => {
    try {
        const objectName = req.params.objectName;
        const filePath = path.join('/home/user/taskProject/public', objectName);

        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
            // return response.success(req, res, { msgCode: 'Image Fetched Successfully', data: filePath }, httpStatus.OK);
        } else {
            return response.error(req, res, { msgCode: 'Object Not Found' }, httpStatus.NO_CONTENT);
        }
    }
    catch (err) {
        console.log(err);
        return response.error(req, res, { msgCode: 'Something Went Wrong' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

// Delete a specific object from the "bucket" 
const deleteImage = async (req, res) => {
    try {
        const objectName = req.params.objectName;
        const filePath = path.join('/home/user/taskProject/public', objectName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return response.success(req, res, { msgCode: 'Object deleted successfully' }, httpStatus.ACCEPTED);
        } else {
            return response.error(req, res, { msgCode: 'Object not found' }, httpStatus.NO_CONTENT);
        }
    }
    catch (err) {
        console.log(err);
        return response.error(req, res, { msgCode: 'Something Went Wrong' }, httpStatus.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    getImage,
    uploadImage,
    downloadSpecifcImage,
    deleteImage
};
