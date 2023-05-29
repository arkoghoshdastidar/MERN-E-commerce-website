const getAllProducts = async (req, res, next) => {
    res.status(200).json({ message: 'Route controller in working fine!' });
}

module.exports = { getAllProducts };