$(document).ready(function() {

  var listo = [];
  listo.ids = []; // add ids array property to store unique ids

  var Task = function(taskText) {
    this.taskText = taskText;
    this.complete = false; // boolean, default false
    this.id = Max.max(...listo.ids) + 1 || 1; // id equals highest ID + 1, or 1 (if first ID) > the "..." notation is the spread operator
    // priority will be task position in array
  };


  function addTask(task, toTop) { // toTop: optional boolean, will move to top if true
    if (toTop) { // if toTop, move to front
      listo.unshift(task);
    } else { // if not, move to back
      listo.push(task);
    }

    return 'New Task Added.';
  }

  function addTaskToTable(task) {  // add all tasks to table after?
    var newHtmlRow = '<tr><td>' + task + '</td><td>' + priority + '</td><td>CHECK</td></tr>';
    $('#task-table').find('tbody').append(newHtmlRow);
  }

  /*
  when HTML form is submitted do the following:
  1. stop it from default HTML submit
  2. capture its submitted data & serialize into array
  3. extract correct task data from array
  4. create new Task object with data & add to listo array
  5. reset form
  */

  $('#new-task-form').on('submit', function(e) {
    e.preventDefault(); // prevent form from submitting in html
    // extract data
    var data = $("#new-task-form :input").serializeArray();
    var taskText = data[0].value;


    if (/\S/.test(taskText)) { // if taskTest is not empty (has a non-space char)
      var newTask = new Task(taskText); // create task obj
      if ($('#moveToTop').is(':checked')) { // add task to top if checked
        addTask(newTask, true);
      } else { // else add task to bottom
        addTask(newTask);
      }
      this.reset(); // reset form
      // refresh table task view?
    } else { // if taskTest is empty
      $('#new-task-form').after('<p style="color: red;">No blank tasks allowed, please enter something.</p>').reset(); //add warning message + reset form
    }
    console.log(listo);
  });

  // jquery to display all task items in array

  // jquery to change priority
}); // ending closing brace/parent
