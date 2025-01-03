const toathuocService = require('./toathuocService');

module.exports = {
    // GET /api/toa-thuoc
    getToaThuocs: async (req, res) => {
        try {
            const toathuoc = await toathuocService.getToaThuocs();
            if (toathuoc) {
                res.status(200).json({
                    success: true,
                    data: toathuoc,
                    message: 'Get list of prescriptions successfully !'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve prescriptions.'
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve prescriptions.',
                error: err.message
            });
        }
    },

    // GET /api/toa-thuoc/:id
    getToaThuocById: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch prescription.'
                });
            }

            const toathuoc = await toathuocService.getToaThuocById(id);

            if (toathuoc) {
                res.status(200).json({
                    success: true,
                    data: toathuoc,
                    message: 'Get prescription details successfully !'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `Prescription with ID ${id} not found.`
                });
            }
        } catch (error){
            console.error('Error fetching prescription by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve prescription.',
                error: error.message
            });
        }
    },

    // POST /api/toa-thuoc/add
    createToaThuoc: async (req, res) => {
        try {
            const body = req.body;
            console.log('controller log:', body);
            if (!body) {
                return res.status(400).json({
                    success: false,
                    message: 'Prescription details are required.'
                });
            }
            let ok = true;
            for (const element of body) {
                if (element.mathuoc) {
                    let result = await toathuocService.createToaThuoc(element);
                    if (!result) {
                        ok = false;
                        break;
                    }
                }
            }
            if (ok) {
                res.status(200).json({
                    success: true,
                    message: 'Prescription created successfully !'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to create prescription.'
                });
            }
        } catch (error) {
            console.error('Error creating prescription:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create prescription.',
                error: error.message
            });
        }
    },

    // PUT /api/toa-thuoc/update/:id
    updateToaThuoc: async (req, res) => {
        try {
            const id = req.params;
            const toathuoc = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to update prescription.'
                });
            }

            if (!toathuoc) {
                return res.status(400).json({
                    success: false,
                    message: 'Prescription details are required.'
                });
            }

            const updatedToaThuoc = await toathuocService.updateToaThuoc(id, toathuoc);

            if (updatedToaThuoc) {
                res.status(200).json({
                    success: true,
                    message: 'Prescription updated successfully !'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to update prescription.'
                });
            }
        } catch (error) {
            console.error('Error updating prescription:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update prescription.',
                error: error.message
            });
        }
    },

    // DELETE /api/toa-thuoc/delete/:maphieukham/:mathuoc
    deleteToaThuoc: async (req, res) => {
        try {
            const id = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete prescription.'
                });
            }

            const deletedToaThuoc = await toathuocService.deleteToaThuoc(id);

            if (deletedToaThuoc) {
                res.status(200).json({
                    success: true,
                    message: 'Prescription deleted successfully !'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Failed to delete prescription.'
                });
            }
        } catch (error) {
            console.error('Error deleting prescription:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete prescription.',
                error: error.message
            });
        }
    }
}