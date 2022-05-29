export const checkFile = (file) => {
    let err = "";
    if (!file) err = "This file does not exist";
    // if (file.size > 100000 * 1024 * 1024 || file.size < 50000 * 1024 * 1024) // 100mb
    //     err = "File size largest is 100mb";
    if (file.type !== "xls/xlsx" &&
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type !== "application/vnd.ms-excel")
        err = "File format is not correct"
    return err
}

export const valid = (fromEmail, toEmail) => {
    let err = "";
    if (!fromEmail || !toEmail) {
        err = "Missing from email or/and to email"
    }
    if (!validateEmail(fromEmail) || !validateEmail(toEmail)) {
        err = "Email format is incorrect";
    }

    return err;
}

function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}