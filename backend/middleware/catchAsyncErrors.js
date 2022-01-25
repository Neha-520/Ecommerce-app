module.exports = myFunc => (req, res, next) => {
    Promise.resolve(myFunc(req, res, next)).catch(next);
}