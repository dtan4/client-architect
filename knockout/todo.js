var Task = function(title, description) {
    this.title = title;
    this.description = description;
    this.complete = ko.observable(false);
};

// ViewModel
var AppViewModel = function() {
    var self = this;

    self.taskList = ko.observableArray([]);
    self.inputTitle = ko.observable('');
    self.inputDescription = ko.observable('');

    self.addTask = function() {
        if (!self.inputTitle()) {
            return;
        }

        self.taskList.unshift(
            new Task(self.inputTitle(), self.inputDescription()));
    };

    self.removeTask = function(task, e) {
        self.taskList.remove(task);
    };
}

// AppViewModel を View にバインディング
ko.applyBindings(new AppViewModel());
