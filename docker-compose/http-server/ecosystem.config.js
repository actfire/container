module.exports = {
    apps: [{
        name: "simple_http",
        script: "./index.js",
        shutdown_with_message: true,
        exec_mode: 'fork',
        watch: false,
        max_memory_restart: '300M',
        env: {
            PORT: 3000
        }
    }]
}
