export function* idGenerator(len) {
    let id = len;
    while(true) {
        yield id++;
    }
};

