const canlamsangService = require('./canlamsangService');

module.exports = {
    // GET /api/can-lam-sang
    getCanLamSangs: async (req, res) => {
        try {
            const canlamsangs = await canlamsangService.getCanLamSangs();
            if (!canlamsangs) {
                return res.status(404).json({
                    success: false,
                    message: 'Failed to retrieve list of subclinical.'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Retrieved list of subclinical successfully.',
                data: canlamsangs
            });
        } catch (error) {
            console.error('Error fetching subclinical:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve subclinical.',
                error: error.message
            });
        }
    },

    // GET /api/can-lam-sang/:id
    getCanLamSangById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to fetch subclinical.'
                });
            }

            const canlamsang = await canlamsangService.getCanLamSangById(id);

            if (canlamsang) {
                res.status(200).json({
                    success: true,
                    data: canlamsang
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `subclinical with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error fetching subclinical by ID:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve subclinical.',
                error: error.message
            });
        }
    },

    // POST /api/can-lam-sang/add
    createCanLamSang: async (req, res) => {
        try {
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'subclinical data is required to create a new entry.'
                });
            }

            const canlamsang = await canlamsangService.createCanLamSang(body);
            res.status(201).json({
                success: true,
                data: canlamsang,
                message: 'subclinical created successfully.'
            });
        } catch (error) {
            console.error('Error creating subclinical:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create subclinical.',
                error: error.message
            });
        }
    },

    // PUT /api/can-lam-sang/update/:id
    updateCanLamSang: async (req, res) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const canlamsang = await canlamsangService.updateCanLamSang(id, body);

            if (canlamsang) {
                res.status(200).json({
                    success: true,
                    data: canlamsang,
                    message: 'subclinical updated successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `subclinical with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error updating subclinical:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update subclinical.',
                error: error.message
            });
        }
    },

    // DELETE /api/can-lam-sang/delete/:id
    deleteCanLamSang: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID is required to delete subclinical.'
                });
            }

            const result = await canlamsangService.deleteCanLamSang(id);

            if (result) {
                res.status(200).json({
                    success: true,
                    message: 'subclinical deleted successfully.'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: `subclinical with ID ${id} not found.`
                });
            }
        } catch (error) {
            console.error('Error deleting subclinical:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete subclinical.',
                error: error.message
            });
        }
    }
};