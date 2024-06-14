// import dependencies
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');

const Users = require('../models/Usuarios');

const login = async(req, res) => {

  try {    
    // extract the fields from the request body
    let usuario = req.body;

    // find the user in the database
    const user = await Users.findOne({ userName: usuario.userName });

    // verify the password
    if(!user || usuario.password !== user.password)      
      throw new Error('Usuario o contraseña incorrectos');

    // prepare the jwt claims
    let claims = {
      userName: usuario.userName,
      secret: crypto.randomBytes(32).toString('hex')
    };
    
    // create the token for 1h
    let token = jsonwebtoken.sign(claims, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
    
    // save the token in the client
    res.cookie('jwt_token', token, {
      httpOnly: true,
      sameSite: 'Strict',
    });
    
    // save the secret in the database
    user.tokens.push(claims.secret);
    await user.save();
    
    // log the login request and send the token
    console.log(`Usuario '${usuario.userName}' inicio sesión`);

    res.status(200).json({
      token: token,
      rolUser: user.rolUser
    });

  } catch(error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  
  try {
    // check if the token is set and valid
    const data = await verify(req.cookies.jwt_token);

    // fail if its not valid
    if (!data) throw new Error('Invalid token');

    // get the user, and remove the token from its list, and then save it
    const user = await Users.findOne({ userName: data.userName });
    user.tokens = user.tokens.filter(token => token !== data.secret);
    await user.save();
    
    // remove the token from the client
    res.clearCookie("jwt_token");

    // log the logout request
    console.log(`Usuario '${user.userName}' cerro sesión`);
    
    // return the success code
    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {

  try {
    // extract the fields from the request body
    const {
      nameUser,
      lastNameUser,
      rolUser,
      userName,
      emailAddress,
      password,
    } = req.body;
    
    // ensure all the fields have been provided
    if (!nameUser || !lastNameUser || !rolUser || !userName || !emailAddress || !password) 
      throw new Error('All fields are required');
    
    // check if the user exists already
    const user = await Users.findOne({ emailAddress });
    
    // fail if it does
    if (user) throw new Error('User already exists');
  
    // create the user
    const newUser = await Users.create({
      nameUser,
      lastNameUser,
      rolUser,
      userName,
      emailAddress,
      password,
    });

    // log the registration request
    console.log(`Usuario '${userName}' ha sido registrado: ${newUser}`);
    
    // return the new user
    res.status(201).json({
      _id: newUser._id,
      nameUser: newUser.nameUser,
      lastNameUser: newUser.lastNameUser,
      rolUser: newUser.rolUser,
      userName: newUser.userName,
      emailAddress: newUser.emailAddress
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {

  try {
    // extract the fields from the request body
    const {
      emailAddress,
    } = req.body;
    
    // check if the token is valid
    const data = await verify(req.cookies.jwt_token);

    // ensure the email is provided or that the token is valid
    if (!data && !emailAddress) 
      throw new Error('Email and password or token are required');
    
    // get the user from the token and from the email if provided
    const tokenUser = await Users.findOne({ userName: data.userName });
    const emailUser = emailAddress? await Users.findOne({ emailAddress }) : null;

    let user;

    // if both are the same user, just remove it or the email one is null
    if (!emailUser || emailUser._id === tokenUser._id)
      user = tokenUser;
      
    // if the token user is an admin, remove the email user
    else if (tokenUser.rolUser === 'admin' && emailUser)
      user = emailUser;
    
    // if not, throw an error
    else throw new Error('User not deleted');
  
    // perform the actual deletion
    await Users.findByIdAndDelete(user._id);

    // log the deletion request
    console.log(`Usuario '${user.userName}' ha sido eliminado`);

    // return the success code
    res.sendStatus(204);

  } catch(error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

const getUser = async (req, res) => {

  try {
    // check if the token is valid
    const data = await verify(req.cookies.jwt_token);

    // fail if its not valid
    if (!data) throw new Error('Invalid token');

    // get the user from the token
    const user = await Users.findOne({ userName: data.userName });

    // log the get request
    console.log(`Usuario '${data.userName}' ha solicitado sus datos`);

    // extract some data from the user and send it
    res.status(200).json({
      _id: user._id,
      nameUser: user.nameUser,
      lastNameUser: user.lastNameUser,
      rolUser: user.rolUser,
      userName: user.userName,
      emailAddress: user.emailAddress
    });

  } catch(error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
}

const verify = async (token) => {

  let userName;
  let secret;

  try {
    // perform the validation
    const data = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
    
    // and assign the values
    userName = data.userName;
    secret = data.secret;

    // check if the secret exists in the database
    const dbUser = await Users.findOne({ userName });

    // return null if the user does not have the secret
    if (!dbUser.tokens.includes(secret)) return null;

    // else, return the token data
    return data;

  } catch (error) {

    // if the error is that the token has expired,
    if (error.message === 'jwt expired' || error.name === 'TokenExpiredError') {

      // remove the secret from the database, save it
      const user = await Users.findOne({ userName });
      user.tokens = user.tokens.filter(token => token !== secret);

      await user.save();

      // and fail nevertheless
      return null;
    }
    
    // otherwise, bubble the error up
    throw error;
  }
};

// Actualizar un perfil de usuario por ID
const updateUser = async (req, res) => {

  try {
    // get the user from the database
    const user = await Users.findById(req.params.id);

    // check if the user exists
    if (user == null) 
      throw new Error('User not found');

    // update the fields
    user.nameUser = req.body.nameUser;
    user.lastNameUser = req.body.lastNameUser;
    user.emailAddress = req.body.emailAddress;
    user.rolUser = req.body.rolUser;
    user.userName = req.body.userName;

    // save the modified user
    const updatedUser = await user.save();

    // log the update request
    console.log(`Usuario '${updatedUser.userName}' ha sido actualizado: ${updatedUser}`);

    // send the updated user
    res.status(200).json({
      _id: updatedUser._id,
      nameUser: updatedUser.nameUser,
      lastNameUser: updatedUser.lastNameUser,
      rolUser: updatedUser.rolUser,
      userName: updatedUser.userName,
      emailAddress: updatedUser.emailAddress
    });
    
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
};

// Devuelve todos los usuarios tipo Cliente de la base de datos
const getAllUsersClient = async (req, res) => {
  
  try{
    // check if the token is valid
    const data = await verify(req.cookies.jwt_token);

    // fail if its not valid
    if (!data) throw new Error('Invalid token');
    
    // get all the clients
    const allUsers = await Users.find({rolUser: "cliente"});
    
    // filter some client data
    const list = [];
    for (const user of allUsers) {
      list.push({
        _id: user._id,
        nameUser: user.nameUser,
        lastNameUser: user.lastNameUser,
        rolUser: user.rolUser,
        userName: user.userName,
        emailAddress: user.emailAddress
      });
    }

  // log the get request
  console.log(`Usuario '${data.userName}' ha solicitado todos los clientes`);

  // send the list
  res.status(200).json(list);
    
  }catch(error){
    console.error(error);
    res.status(404).json({ message: error.message });
  }
}

module.exports = {
  login,
  logout,
  register,
  remove,
  getUser,
  verify,
  updateUser,
  getAllUsersClient
};