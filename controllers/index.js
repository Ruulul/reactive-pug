export default function index(_, _, next) {
    console.log('Authenticated!');
    next();
}