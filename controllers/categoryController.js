const prisma = require("../utils/client");

const addCategory = async (req, res) => {
    try {
      const { name} = req.body;
      const category = await prisma.categories.create({
        data: {
          name,
        },
      });
      res.status(201).json({ message: 'Category added successfully', data: category });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add category', error: error.message });
    }
};

const getCategories = async (req, res) => {
      try {
          const categories = await prisma.categories.findMany({
              where: {
                  deleted: null,
              },
          });
          res.status(200).json({ categories });
      } catch (error) {
          res.status(500).json({ message: 'Error fetching categories' });
      }
};

const getCategoryById = async (req, res) => {
    try {
    const id = parseInt(req.params.id);
    const category = await prisma.categories.findUnique({
        where: {
        id: id,
        },
    });
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ category });
    } catch (error) {
    res.status(500).json({ message: 'Error fetching category' });
    }
};
const getDeletedCaretegories = async (req, res) => {
    try {
      const categories = await prisma.categories.findMany({
        where: {
          deleted: {
            not: null,
          },
        },
      });
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  };


const updateCategory = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.categories.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ message: 'category non trouvé' });
    }
    const updates = req.body;
    await prisma.categories.update({ where: { id }, data: updates });
    const updatedCategory = await prisma.categories.findUnique({ where: { id } });
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur',error:err.message });
  }
};


const deleteCategory = async (req, res) => {
  try {
      const id = parseInt(req.params.id);

      // Check if the category exists
      const category = await prisma.categories.findUnique({
          where: { id: id },
      });

      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      await prisma.categories.update({
        where: {
          id: id,
        },
        data: {
          deleted: new Date(),
        }
        });

      res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
};



module.exports = {
    addCategory,
    getCategories,
    getDeletedCaretegories,
    getCategoryById,
    updateCategory,
    deleteCategory,

}