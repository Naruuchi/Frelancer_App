const Works = require('../model/works');
const bidInfo = require('../model/bidInfo');

module.exports.getFindJobs = (req, res, next) => {
    let name = "";
    if (req.session.userName)
        name = req.session.userName;
        Works.findAll()
            .then(result => {
                res.render('findJobs',
                    {
                        pageTitle: "Jobs",
                        name: name,
                        isIndex: false,
                        isLogin: false,
                        isSignUp: false,
                        isFindWorks: true,
                        isFindServices: false,
                        works: result,
                    })
            })
            .catch(err => console.log(err));
}

module.exports.getJobDetails = (req, res, next) => {
    let name = "";
    if (req.session.userName) {
        name = req.session.userName;
        console.log(name);
        const title = req.body.title;
        const details = req.body.details;

        res.render('jobDetails',
            {
                pageTitle: "Details",
                name: name,
                isIndex: false,
                details: details,
                title: title,
                isLogin: false,
                isSignUp: false,
                isFindWorks: false,
                isFindServices: false,
            })
    }
    else
        res.redirect("/login");
}

exports.getAddJobs = (req, res, next) => {
    if (req.session.userName) {
        res.render('addJobs', {
            pageTitle: "Add new Jobs",
            name: req.session.userName,
            editMode: false,
            isIndex: false,
            isLogin: false,
            isSignUp: false,
            isFindWorks: false,
            isFindServices: false,
        });
    }
    else
        res.redirect("/404");
}

exports.postAddjobs = (req, res, next) => {
    if (req.session.userName) {
        Works.create({
            hirer: req.body.hirer,
            title: req.body.title,
            start: req.body.start,
            request: req.body.request,
            details: req.body.details,
            userName: req.session.userName,
            fullName: req.session.fullName,
        })
            .then(() => { return res.redirect("/userPosts") })
            .catch(err => console.log(err))
    }
    else
        res.redirect('/404');
}

exports.getUpdateJobs = (req, res, next) => {
    let name = "";
    if (req.session.fullName) {
        name = req.session.fullName;
        Works.findOne({
            where: {
                fullName: name,
            }
        })
            .then(result => {
                return res.render('addJobs', {
                    pageTitle: "Edit",
                    name: name,
                    editMode: true,
                    id: result.id,
                    prevtitle: req.body.title,
                    hirer: result.hirer,
                    title: result.title,
                    start: result.start,
                    request: result.request,
                    details: result.details,
                    isIndex: false,
                    isLogin: false,
                    isSignUp: false,
                    isFindWorks: false,
                    isFindServices: false,
                });
            })
    }
    else
        res.redirect('/404');
}

exports.postUpdateJobs = (req, res, next) => {
    console.log(req.body.id);
    if (req.session.userName) {
        Works.update({
            hirer: req.body.hirer,
            title: req.body.title,
            start: req.body.start,
            request: req.body.request,
            details: req.body.details,
            userName: req.session.userName,
            fullName: req.session.fullName,
        }, {
            where: { userName: req.session.userName, id: req.body.id }
        })
            .then(() => {
                return res.redirect("/userPosts");
            })
            .catch(err => console.log(err))
    }
    else
        res.redirect("/404");
}

module.exports.postBidInfo = (req, res, next) => {
    if (req.session.userName) {
        const bid = req.body.bid;
        const exp = req.body.exp;
        const solution = req.body.solution;
        const contact = req.body.contact;
        const deadline = req.body.deadline;
        const userName = req.session.userName;
        const title = req.body.title;

        bidInfo.create({
            bid: bid,
            exp: exp,
            solution: solution,
            contact: contact,
            deadline: deadline,
            title: title,
            userName: userName,
        })
        then(() => {
            res.redirect("/findJobs");
        })
    }
    else
        res.redirect("/404");
}

module.exports.postDeleteJobs = (req, res, next) => {
    const userName = req.session.userName;
    Works.destroy({
        where: {
            userName: userName,
            title: req.body.title
        }
    })
        .then(() => {
            res.redirect("/userPosts");
        })
        .catch(err => console.log(err))
}