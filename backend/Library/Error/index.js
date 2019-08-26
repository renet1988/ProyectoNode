module.exports = class Error {
    constructor  (title, messages) {
        this.title = title;
        this.messages = messages;
    }
};