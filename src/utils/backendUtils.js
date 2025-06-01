export function getDataFromForm(formData, ...args) {
    let data = {};
    for (let i = 0; i < args.length; i++) {
        data[args[i]] = formData.get(args[i]);
    }
    return data;
}