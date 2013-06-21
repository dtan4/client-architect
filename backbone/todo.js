var TaskModel = Backbone.Model.extend({
    defaults: {
        title: "",
        description: "",
        complete: false
    }
});


var TaskList = Backbone.Collection.extend({
    model: TaskModel
});

var Tasks = new TaskList();


var TaskView = Backbone.View.extend({
    //
});


var AppView = Backbone.View.extend({
    //
});
