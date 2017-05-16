import jwt from 'jsonwebtoken';
import model from '../../models/';

const Users = model.Users;
const secret = process.env.SECRET || 'thisisademosecret';

export default {
  login(req, res) {
    return Users
      .findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication Failed. User not found.',
          });
        }
        // check if password matches
        if (!user.verifyPassword(req.body.password)) {
          return res.status(401).send({
            message: 'Authentication failed. Wrong password.'
          });
        }
        const token = jwt.sign({
          data:
          { id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            roleId: user.roleId }
        }, secret, {
          expiresIn: '24h' // expires in 24 hours
        });
        return res.status(200).send({
          message: 'User authenticated successfully',
          token
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'Error occurred while authenticating user'
      }));
  },

  logout(req, res) {
    return res.status(200).send({
      message: 'You have successfully logged out'
    });
  }
};
