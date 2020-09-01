module.exports = {
  async setNewRoute(req, res) {
    const newDestination = req.body;

    return res.status(200).json({ message: newDestination});
  },
  async getCheapestRoute(req, res) {
    const { originDestination, targetDestination} = req.params;

    return res.status(200).json({ message: `${originDestination} - ${targetDestination}`});
  }
};
