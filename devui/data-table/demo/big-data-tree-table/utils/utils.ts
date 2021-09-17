export const simDeepClone = obj => {
    if (obj === null) { return null; }
    if (typeof obj === 'object') {
        return JSON.parse(JSON.stringify(obj));
    } else if (typeof obj === 'string') {
        try {
            return JSON.parse(obj);
        } catch (e) {
            console.error(e);
        }
    } else {
        return obj;
    }
};

export const highPerformanceFilter = (arr, func) => {
    let res = [];
    const arrLength = arr.length;
    if (arrLength < 10000 || arrLength > 99999) {
        for (let a = 0; a < arrLength; a++) {
            if (func(arr[a])) {
                res.push(arr[a]);
            }
        }
    } else {
        res = arr.filter(func);
    }
    return res;
};
