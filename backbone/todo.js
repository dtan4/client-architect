var Model = {};
var View = {};

// Model (Task)
Model.TaskModel = Backbone.Model.extend({
    defaults: {
        title: "",
        description: "",
        complete: false
    },

    toggleComplete: function() {
        this.set('complete', !this.get('complete'));
    }
});

// Model (TaskList)
Model.TaskList = Backbone.Collection.extend({
    model: Model.TaskModel,
});

var TaskList = new Model.TaskList();

// View (each Task)
View.TaskView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'click .completeChk': 'toggleComplete',
        'click .removeBtn': 'remove'
    },

    render: function() {
        var task = this.model;
        var chk = $('<input>')
            .attr('type', 'checkbox')
            .attr('class', 'completeChk');
        var span = $('<span>')
            .attr('class', 'completeMsg')
            .text('Complete');
        span.hide();

        if (task.get('complete')) {
            chk.attr('checked', 'checked');
            span.show();
        }

        this.$el.append(
            $('<td>')
                .append(chk)
                .append(span)
                .attr('class', 'completeRow')
        ).append(
            $('<td>').text(task.get('title'))
        ).append(
            $('<td>').text(task.get('description'))
        ).append(
            $('<td>').append(
                $('<button>')
                    .attr('class', 'removeBtn')
                    .text('Remove')
            )
        );

        return this.$el;
    },

    toggleComplete: function() {
        this.model.toggleComplete();
    },

    remove: function() {
        this.model.destroy();
    }
});

// View (whole)
View.AppView = Backbone.View.extend({
    el: $('#taskTable'),

    initialize: function() {
        this.listenTo(TaskList, 'add', this.addOne);
        this.listenTo(TaskList, 'all', this.render);
        this.listenTo(TaskList, 'destroy', this.render);

        this.render();
    },

    render: function() {
        if (TaskList.length == 0) {
            this.$el.hide();
            return;
        }

        this.$el.show();
        this.addAll();
    },

    addTask: function(task) {
        var view = new View.TaskView({model: task});
        this.$el.children('#taskList').append(view.render());
    },

    addAll: function(task) {
        this.$el.children('#taskList').empty();
        TaskList.each(this.addTask, this);
    }
});

var AppView = new View.AppView();

// Controller
$('#addBtn').click(function() {
    var title = $('#taskTitle').val();
    var description = $('#taskDescription').val();

    if (!title) {
        return;
    }

    TaskList.unshift({
        title: title,
        description: description
    });
});
