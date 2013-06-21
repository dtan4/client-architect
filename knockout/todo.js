var TaskViewModel = function(title, description) {
    this.title = ko.observable(title);
    this.description = ko.observable(description);
    this.complete = ko.observable(false);

    this.complete.subscribe(function(newVal) {
        console.log(title + ': ' + newVal);
    });
};

var AppViewModel = function() {
    var self = this;

    self.taskList = ko.observableArray([]);

    self.addTask = function() {
        var title = $('#taskTitle').val();
        var description = $('#taskDescription').val();
        var task = new TaskViewModel(title, description);

        self.taskList.push(task);
    };

    self.removeTask = function() {
        self.taskList.remove(this);
    };
}

// AppViewModel を Model にバインディング
ko.applyBindings(new AppViewModel());
