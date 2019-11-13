class DarkTheme {
    constructor() {
        this.InitTheme();
        window.addEventListener('DOMContentLoaded', () => {
            this.AddTheme();
        })
    }

    InitTheme() {
        this.currentTheme = localStorage.getItem('theme');
        if (this.currentTheme === 'dark') {
            this.AttachCSSFile();
        }
    }

    AttachCSSFile() {
        const head = document.getElementsByTagName('HEAD')[0];
        const link = document.createElement('link');
        link.id = "dark-theme-css";
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/admin-template/assets/css/custom/dark-mode.css';
        head.appendChild(link);
        localStorage.setItem('theme', 'dark');
        this.currentTheme = 'dark';
    }

    RemoveTheme() {
        const themeLink = document.getElementById('dark-theme-css');
        themeLink.parentNode.removeChild(themeLink);
        localStorage.setItem('theme', 'light');
        this.currentTheme = 'light';
    }

    AddTheme() {
        if (location.pathname.includes('/settings')) {
            const darkSwitch = document.getElementById('darkSwitch');
            console.log(darkSwitch);

            if (darkSwitch) {
                darkSwitch.checked = (this.currentTheme == 'dark') ? true : false;

                darkSwitch.addEventListener('click', () => {

                    if (this.currentTheme === 'dark') {
                        this.RemoveTheme();
                    } else {
                        this.AttachCSSFile();
                    }
                });
            }
        }
    }
}

const darkTheme = new DarkTheme();