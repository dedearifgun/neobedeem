const showSidebar = () => {
    $('body').removeClass('sidebar-collapse');
    localStorage.setItem('sidebar-state', "show");
}

const collapseSidebar = () => {
    $('body').addClass('sidebar-collapse');
    localStorage.setItem('sidebar-state', "collapse");
}

// initialize sidebar state
let sidebarState = localStorage.getItem('sidebar-state');
if (sidebarState === null || sidebarState == "show") {
    showSidebar();
} else if (sidebarState == "collapse") {
    collapseSidebar();
}

// toggling light and dark mode when clicked
$("#collapse-burger").click(() => {
    let sidebarState = localStorage.getItem('sidebar-state');
    if (sidebarState == "collapse") {
        localStorage.setItem('sidebar-state', "show");
    } else if (sidebarState == "show") {
        localStorage.setItem('sidebar-state', "collapse");
    }
});


$(() => {
    var url = window.location;
    // for single sidebar menu
    $('ul.nav-sidebar a').filter(function () {
        return this.href == url;
    }).addClass('active');

    // for sidebar menu and treeview
    $('ul.nav-treeview a').filter(function () {
        return this.href == url;
    }).parentsUntil(".nav-sidebar > .nav-treeview")
        .css({'display': 'block'})
        .addClass('menu-open').prev('a')
        .addClass('active');
}); 