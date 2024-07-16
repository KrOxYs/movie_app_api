import { Director } from "../../Model/association.js";

export const createDirector = async (req, res) => {
  const { name } = req.body;
  try {
    const director = await Director.create({ name });
    res.status(201).json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
