const sidebarMenu = document.querySelector('#sidebar-menu');
const sidebar = document.querySelector('nav');

sidebarMenu.addEventListener('click', () => {
    if(sidebar.classList.contains('translate-x-[-100%]')) {
        sidebar.classList.remove('translate-x-[-100%]');
        document.querySelector('.ph-x-bold').classList.remove('hidden-important');
        document.querySelector('.ph-list-bold').classList.add('hidden-important');
    } else {
        sidebar.classList.add('translate-x-[-100%]');
        document.querySelector('.ph-x-bold').classList.add('hidden-important');
        document.querySelector('.ph-list-bold').classList.remove('hidden-important');
    }
})