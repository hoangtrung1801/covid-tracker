const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        fontFamily: {
            sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        },
    },
};
