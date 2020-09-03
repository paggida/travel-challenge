module.exports = {
  async setNew(req, res) {
    const newDestination = req.body;

    return res.status(200).json({ message: newDestination});
  },
  async getCheapest(req, res) {
    const { originDestination, targetDestination} = req.params;

    return res.status(200).json({ message: `${originDestination} - ${targetDestination}`});
  }
};
