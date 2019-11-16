/**
 * @description
 * @see https://frappe.io/gantt
 * @see https://github.com/frappe/gantt
 */
class Planner {
    constructor() {
        var tasks = [
            {
                id: 'Task 1',
                name: 'Redesign website',
                start: '2016-12-28',
                end: '2016-12-30',
                progress: 20,
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 2',
                name: 'Redesign website',
                start: '2016-12-30',
                end: '2017-01-01',
                progress: 20,
                dependencies: 'Task 1',
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 3',
                name: 'Redesign website',
                start: '2016-12-28',
                end: '2016-12-30',
                progress: 20,
                dependencies: 'Task 2',
                custom_class: 'bar-milestone' // optional
            },
            {
                id: 'Task 4',
                name: 'Redesign website',
                start: '2016-12-28',
                end: '2016-12-30',
                progress: 20,
                dependencies: 'Task 3',
                custom_class: 'bar-milestone' // optional
            }, {
                id: 'Task 5',
                name: 'Redesign website',
                start: '2016-12-28',
                end: '2016-12-30',
                progress: 20,
                dependencies: 'Task 3',

                custom_class: 'bar-milestone' // optional
            },
        ]
        var gantt = new Gantt("#gantt", tasks, {
            on_click: function (task) {
                console.log(task);
            },
            on_date_change: function (task, start, end) {
                console.log(task, start, end);
            },
            on_progress_change: function (task, progress) {
                console.log(task, progress);
            },
            on_view_change: function (mode) {
                console.log(mode);
            }
        });
        gantt.change_view_mode('Week')
    }

}
// Necesitamos usar esta estructura para poder utilizar las dependencias de JS
require(
    [
        'moment',
        'snap-svg',
        'frappe-gantt',
        'jquery'
    ],
    function (moment, snapsvg, gantt, $) {
        const planner = new Planner();
    });