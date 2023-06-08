const Services = require('../model/services');
const Works = require('../model/works');

exports.getContact = (req, res, next) => {
    let name = "";
    if (req.session.userName)
        name = req.session.userName;
    res.render('contactUs',
        {
            pageTitle: "Contact Us",
            name: name,
            error: false,
            isIndex: false,
            isLogin: false,
            isSignUp: false,
            isFindWorks: false,
            isFindServices: false,
            service: "",
        });
}

exports.getServiceContact = (req, res, next) => {
    console.log(req.body.fullName)
    console.log(req.body.id)
    if (req.session.fullName && req.body.id) {
        Services.findOne({
            where: {
                id: req.body.id,
                fullName: req.body.fullName,
            }
        })
            .then(result => {
                if (result)
                    return res.render('contactUs',
                        {
                            pageTitle: "Service Contact",
                            name: req.body.fullName,
                            error: false,
                            isIndex: false,
                            isLogin: false,
                            isSignUp: false,
                            isFindWorks: false,
                            isFindServices: false,
                            service: result,
                        });
                else
                    res.redirect("/findServices");
            })
            .catch(err => console.log(err));
    }
    else
        res.redirect('/login');
}

exports.getAddServices = (req, res, next) => {
    if (req.session.userName)
        res.render('addServices', {
            pageTitle: "Add new services",
            name: req.session.userName,
            editMode: false,
            isIndex: false,
            isLogin: false,
            isSignUp: false,
            isFindWorks: false,
            isFindServices: false,
        })
    else
        res.redirect("/404");
}

exports.getUpdateServices = (req, res, next) => {
    let name = "";
    if (req.session.userName) {

        name = req.session.userName;
        Services.findOne({
            where: {
                userName: name,
                id: req.body.id,
            }
        })
            .then(result => {
                return res.render('addServices', {
                    pageTitle: "Edit",
                    name: name,
                    editMode: true,
                    id: req.body.id,
                    imgUrl: result.imgURL,
                    title: result.title,
                    major: result.major,
                    certificate: result.certificate,
                    salary: result.salaryExpectation,
                    contact: result.contact,
                    description: result.description,
                    isIndex: false,
                    isLogin: false,
                    isSignUp: false,
                    isFindWorks: false,
                    isFindServices: false,
                });
            })
    }
}

module.exports.getFindServices = (req, res, next) => {
    let name = "";
    if (req.session.userName)
        name = req.session.userName;
    Services.findAll()
        .then(result => {
            res.render('findServices',
                {
                    pageTitle: "Services",
                    name: name,
                    isIndex: false,
                    isLogin: false,
                    isSignUp: false,
                    isFindWorks: false,
                    isFindServices: true,
                    services: result,
                })
        })
        .catch(err => console.log(err));
}

exports.getUserPosts = (req, res, next) => {
    let name = "";
    if (req.session.userName) {
        name = req.session.userName;

        Works.findAll({
            where: {
                userName: name
            }
        }).then(works => {
            Services.findAll({
                where: {
                    userName: name
                }
            }).then(services => {
                return res.render('userPosts', {
                    pageTitle: "User Posts",
                    name: name,
                    services: services,
                    works: works,
                    isIndex: false,
                    isLogin: false,
                    isSignUp: false,
                    isFindWorks: false,
                    isFindServices: false,
                });
            }).catch(err => console.log(err));
        })
            .catch(err => console.log(err));
    }
    else
        res.redirect("/404");
}

exports.postAddServices = (req, res, next) => {
    const userName = req.session.userName;
    const fullName = req.session.fullName;
    const userImgURL = req.session.imgURL;
    const imgURL = req.body.image;
    const title = req.body.title;
    const major = req.body.major;
    const certificate = req.body.certificate;
    const salaryExpectation = req.body.salary;
    const description = req.body.description;
    const contact = req.body.contact;

    Services.create({
        userName: userName,
        fullName: fullName,
        imgURL: imgURL,
        userImgURL: userImgURL,
        title: title,
        major: major,
        certificate: certificate,
        salaryExpectation: salaryExpectation,
        description: description,
        contact: contact
    })

    res.redirect("/userPosts");
}

exports.postUpdateServices = (req, res, next) => {
    const userName = req.session.userName;
    const major = req.body.major;
    const title = req.body.title;
    const id = req.body.id;
    const certificate = req.body.certificate;
    const salaryExpectation = req.body.salary;
    const description = req.body.description;
    const contact = req.body.contact;

    Services.update({
        major: major,
        title: title,
        certificate: certificate,
        salaryExpectation: salaryExpectation,
        description: description,
        contact: contact
    }, {
        where: { userName: userName, id: id }
    })
        .then(() => {
            return res.redirect("/userPosts");
        })
        .catch(err => console.log(err))
}

module.exports.postDeleteServices = (req, res, next) => {
    const id = req.body.id;
    const userName = req.session.userName;
    Services.destroy({
        where: {
            userName: userName,
            id: id,
        }
    })
        .then(() => {
            res.redirect("/userPosts");
        })
        .catch(err => console.log(err))
}
