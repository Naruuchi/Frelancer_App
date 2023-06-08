const auth = require('../model/auth');

exports.getRegister = (req, res, next) => {
    res.render('register', {
        pageTitle: "Sign up",
        error: false,
        name: "",
        fill: false,
        isIndex: false,
        isLogin: false,
        isSignUp: true,
        isFindWorks: false,
        isFindServices: false,
    });
}

exports.postRegister = (req, res, next) => {
    const userName = req.body.tk;
    const password = req.body.mk;
    const name = req.body.name;
    const dayOfBirth = req.body.ngaysinh;
    const imgURL = req.body.imgURL;
    let sex = true;
    if (req.body.sex === 'female') {
        sex = false;
    }
    const email = req.body.email;

    if (userName && password && name && dayOfBirth && imgURL && email) {
        auth.findOne({
            where: {
                userName: userName,
            }
        })
            .then(tk => {
                if (tk) {
                    return res.render("register", {
                        pageTitle: "Sign up",
                        error: true,
                        fill: false,
                        name: "",
                        isIndex: false,
                        isLogin: false,
                        isSignUp: true,
                        isFindWorks: false,
                        isFindServices: false,
                    });
                }

                auth.create({
                    userName: userName,
                    passWord: password,
                    name: name,
                    dayOfBirth: dayOfBirth,
                    sex: sex,
                    email: email,
                    imgURL: imgURL,
                })
                    .then(() => {
                        return res.redirect('/login');
                    })
            })
            .catch(err => console.log(err));
    }
    else
        return res.render("register", {
            pageTitle: "Sign up",
            error: false,
            name: "",
            fill: true,
            isIndex: false,
            isLogin: false,
            isSignUp: true,
            isFindWorks: false,
            isFindServices: false,
        });
}


exports.getLogin = (req, res, next) => {
    res.render('login',
        {
            pageTitle: "Log in",
            name: "",
            error: false,
            isIndex: false,
            isLogin: true,
            isSignUp: false,
            isFindWorks: false,
            isFindServices: false,
        });
}

exports.postLogin = (req, res, next) => {
    const userName = req.body.tk;
    const password = req.body.mk;
    auth.findOne({ where: { userName: userName, passWord: password } })
        .then(user => {
            if (user) {
                req.session.userName = userName;
                req.session.fullName = user.name;
                console.log(user.name);
                req.session.imgURL = user.imgURL;
                return res.render('index', {
                    name: req.session.userName,
                    pageTitle: "Home",
                    isIndex: true,
                    isLogin: false,
                    isSignUp: false,
                    isFindWorks: false,
                    isFindServices: false,
                });
            }
            return res.render('login', {
                pageTitle: "Log in",
                name: "",
                error: true,
                isIndex: false,
                isLogin: true,
                isSignUp: false,
                isFindWorks: false,
                isFindServices: false,
            });
        })
        .catch(err => console.log(err));
}


exports.getChangePwd = (req, res, next) => {
    if (req.session.userName) {

        res.render('changePwd',
            {
                pageTitle: "Change Password",
                name: req.session.userName,
                isIndex: false,
                isLogin: false,
                isSignUp: false,
                isFindWorks: false,
                isFindServices: false,
            });
    }
}

exports.postChangePwd = (req, res, next) => {
    const userName = req.session.userName;
    const password = req.body.mk;
    const nPassword = req.body.newmk;
    console.log(userName);
    auth.findOne({ where: { userName: userName, passWord: password } })
        .then(user => {
            if (user) {
                auth.update({ passWord: nPassword }, {
                    where: {
                        userName: user.name,
                    }
                });
                return res.render('index', {
                    name: req.session.userName,
                    pageTitle: "Home",
                    isIndex: true,
                });
            }
            return res.render('changePwd', {
                pageTitle: "Change Password",
                name: "",
                error: true,
            });
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    let name = "";
    if (req.session.userName)
        name = req.session.userName;
    res.render('index', {
        pageTitle: "Home",
        name: name,
        isIndex: true,
        isLogin: false,
        isSignUp: false,
        isFindWorks: false,
        isFindServices: false,
    })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/home');
}


