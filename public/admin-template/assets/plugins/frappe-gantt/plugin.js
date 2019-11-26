require.config({
    shim: {
        'frappe-gantt': ['core'],
        'frappe-gantt.min': ['core'],
    },
    paths: {
        'frappe-gantt': '/admin-template/assets/plugins/frappe-gantt/frappe-gantt',
        'frappe-gantt.min': '/admin-template/assets/plugins/frappe-gantt/frappe-gantt.min',
    }
});