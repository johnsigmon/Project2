const userRouter = require('express').Router();
const { createUser, loginUser, saveContent, loadUserProfile } = require('../models/user');
////Create new user///
userRouter.get('/new', function(req,res) {
  res.render('user/new');
});
///Redirect to login///
userRouter.post('/new', createUser, function(req,res) {
  console.log(req.body);
  res.redirect('login');
});
////
userRouter.get('/login', function(req,res) {
  res.render('user/login');
});

userRouter.post('/login', loginUser, function(req,res) {
  console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err) {
    if(err) throw err;
    res.redirect('/');
  });
});
///////////
userRouter.get('/mypage', (req,res)=>{res.render('user/mypage', {user: req.session.user})})

userRouter.get('/save-content', saveContent, (req,res)=>{res.redirect('/')});
///////////////////////////////////////

//user logout
userRouter.delete('/logout', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

module.exports = userRouter;
