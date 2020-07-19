export default function ErrorBag(errors = {}) {
    for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
            this[key] = errors[key]
        }
    }
}

ErrorBag.prototype.all = function () {
    return Object.keys(this).map((key) => this[key]).flatMap(v => v);
}

ErrorBag.prototype.any = function () {
    return this.all().length > 0
}