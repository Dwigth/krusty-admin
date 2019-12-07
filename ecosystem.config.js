module.exports = {
    apps: [{
        name: "Matilde DASHBOARD",
        script: "./dist/app/app.js",
        watch: false,
        env: {
            "NODE_ENV": "production",
            "SECRET": 123456789,
            "PORT": 3004,
            "FORGOT_PASSWORD_URL": "http://166.62.103.25:3004"
        }
    }
    ]
}
