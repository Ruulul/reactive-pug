export default function index(req, res, next) {
    console.log('Authenticated!');
    next();
}