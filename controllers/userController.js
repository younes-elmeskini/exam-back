const prisma = require("../utils/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/Authentication")

const signup = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).send('Utilisateur non trouvé');
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).send('Mot de passe incorrect');
      }

      const token = generateToken(user);
      res.cookie('token', token, { secure: true, httpOnly: true });
      res.status(200).json({ message: 'Bienvenue, ' , user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
};


const getProfil = async (req, res) => {
    try {

      const profil = await prisma.user.findUnique({
        where: {
          id: req.user.userId,
        },
      });
      if (!profil) {
        return res.status(404).json({ message: 'Profil non trouvé' });
      }
      res.status(200).json({ profil });
    } catch (error) {
      console.error('Error getting profil:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
};


const logout = async (req, res) => {
    res.clearCookie('token', { secure: true, httpOnly: true });
    res.send({ message: 'Déconnexion réussie' });
};


module.exports={
    signup,
    login,
    getProfil,
    logout
}