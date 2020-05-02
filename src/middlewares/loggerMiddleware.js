export default function loggerMiddlewares() {
    return function (next) {
        return function (action) {
            console.log(action);
            return next(action);
        }
    }
}