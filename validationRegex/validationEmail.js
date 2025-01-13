export function vaildationEmail(emailInput) {
    const emailRegex = /^\w+([,.-]\w+)*@\w+(\.\w+)$/;
    return emailRegex.test(emailInput);
}