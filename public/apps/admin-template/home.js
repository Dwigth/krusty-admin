class Home {
    constructor() {
        if (location.pathname.includes('/home')) {
            this.AddUserIdToAnchors();
        }
    }

    AddUserIdToAnchors() {
        const PlannerAnchor = document.getElementById('planner-anchor');
        PlannerAnchor.href = PlannerAnchor.href + profile.profile.id_admin;
    }

}

const home = new Home();