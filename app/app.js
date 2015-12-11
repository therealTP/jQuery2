$(document).ready(function() {

  var listo = [];
  listo.maxId = 0; // add maxId property to listo obj to store unique ids

  var Task = function(taskText) {
    this.taskText = taskText;
    this.complete = false; // boolean, default false
    this.id = listo.maxId + 1; // id = current maxId + 1
    listo.maxId++; // increment listo max id
  };

  // var newTask = $('#new-task-btn');
  // var cancel = $('#cancel-new-task');
  // var form = $('.new-task-container');
  // var combinedClick = newTask.add(cancel);
  // var combinedHide = newTask.add(form);

  // function to hide new task button/ unhide form (or vice versa)
  function formHide() {
    $('#new-task-btn, .new-task-container').toggleClass('hidden');
  }

  // when the new task or cancel button clicked on, call formHide
  $('#new-task-btn, #cancel-new-task').click(formHide);

  // $('#cancel-new-task').on('click', function() {
  //   $('.new-task-container, #new-task-btn').toggleClass('hidden');
  // });


  function addTask(task, toTop) {
    // toTop: optional boolean, will move to top if true
    // priority of task will be its position in listo arr
    if (toTop) { // if toTop, move to front
      listo.unshift(task);
    } else { // if not, move to back
      listo.push(task);
    }

    console.log('New Task Added.');
  }

  function refreshTaskTable(arr) {
    $('#task-table tbody').html(''); // clear original appended html
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      var text = obj.taskText;
      var newHtmlRow = '<tr><td>' + text + '</td><td> Up Down </td><td>Checkbox</td></tr>';
      $('#task-table').find('tbody').append(newHtmlRow);
    }
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
      refreshTaskTable(listo);
      // refresh table task view?
    } else { // if taskTest is empty
      alert('No blank tasks allowed, please enter something.'); //alert warning message
    }

    console.log(listo);
  });

  // jquery to display all task items in array

  // jquery to change priority
}); // ending closing brace/parent
