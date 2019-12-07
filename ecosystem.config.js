module.exports = {
    apps: [{
        name: "Matilde DASHBOARD",
        script: "./dist/app/app.js",
        watch: false,
        env: {
            "NODE_ENV": "production",
            "SECRET": 123456789,
            "PORT": 3004
        }
    }
    ]
}
