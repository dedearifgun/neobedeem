// define light and dark mode
const darkMode = () => {
    $('body').addClass('dark-mode');
    $('nav').addClass('navbar-dark');
    $('table').addClass('table-dark');
    $('#theme-toggle-icon').addClass('fa-sun').removeClass('fa-moon');
    $('#tutorial-tabs').addClass('navbar-dark');
    $('#tutorial-neobdm-tabs').addClass('navbar-dark');
    $('#tutorial-mindset-tabs').addClass('navbar-dark');
    $('#tutorial-risk-tabs').addClass('navbar-dark');
    $('#tutorial-technical-tabs').addClass('navbar-dark');
    localStorage.setItem('theme', 'dark');
}

const lightMode = () => {
    $('body').removeClass('dark-mode');
    $('nav').removeClass('navbar-dark');
    $('table').removeClass('table-dark');
    $('#theme-toggle-icon').addClass('fa-moon').removeClass('fa-sun');
    $('#tutorial-tabs').removeClass('navbar-dark');
    $('#tutorial-neobdm-tabs').removeClass('navbar-dark');
    $('#tutorial-mindset-tabs').removeClass('navbar-dark');
    $('#tutorial-risk-tabs').removeClass('navbar-dark');
    $('#tutorial-technical-tabs').removeClass('navbar-dark');    
    localStorage.setItem('theme', 'light');
}

// initialize light and dark mode
let theme = localStorage.getItem('theme');
if (theme === null || theme == "dark") {
    darkMode();
} else if (theme == "light") {
    lightMode();
}

// toggling light and dark mode when clicked
$("#theme-toggle").click(() => {
    let theme = localStorage.getItem('theme');
    if (theme == "light") {
        darkMode();
    } else if (theme == "dark") {
        lightMode();
    }
});
