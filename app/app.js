$(document).ready(function() {

  //---GLOBAL LISTO ARRAY---//
  var listo = [];
  listo.maxId = 0; // add maxId property to listo obj to store unique ids

  //--TASK OBJECT CONSTRUCTOR FUNCTION---//
  var Task = function(taskText) {
    this.taskText = taskText;
    this.complete = false; // boolean, default false
    this.id = listo.maxId + 1; // id = current maxId + 1
    listo.maxId++; // increment listo max id
  };

  //---FUNCTIONS---//

  // #1 - function to hide new task button/ unhide form (or vice versa)
  function formHide() {
    $('#new-task-btn, .new-task-container').toggleClass('hidden');
  }

  // #2 - add task object to listo array, to front if toTop === true;
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

  // #3 - changes position of tasks in array, refreshes array view
  function switchTaskPriority(taskInd1, taskInd2) {


    var maxIndex = listo.length - 1;
    console.log(taskInd1, taskInd2, maxIndex);
    // if either of the indices are out of range, return error
    if (taskInd1 < 0 || taskInd2 < 0) {
      return 'Switch out of range.';
    } else if (taskInd1 > maxIndex || taskInd2 > maxIndex) {
      return 'Switch out range.';
    }
    var newLow = listo[taskInd1];
    listo[taskInd1] = listo[taskInd2];
    console.log(listo);
    listo[taskInd2] = newLow;
    console.log(listo);

    refreshTaskTable(listo);
  }

  function removeTask(index) {
    if (index >= 0 && index < listo.length) {
      var conf = confirm("Are you sure you're done with this task?");
      if (conf) {
        listo.splice(index, 1);
        refreshTaskTable(listo);
      } else {
        return 'Task deletion canceled.';
      }
    } else {
      return "Index out of range.";
    }
  }

  // #4 - refreshes the table view of listo array (used after changes)
  function refreshTaskTable(arr) {
    $('#task-table tbody').html(''); // clear original appended html
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      var text = obj.taskText;
      var newHtmlRow = '<tr id="row' + i + '"><td>' + text + '</td><td><input type="button" class="up-btn" value="Up"><input type="button" value="Down" class="down-btn"></td><td><input class="task-checkbox" type="checkbox"></td></tr>';
      // $('#task-table').find('tbody').append(newHtmlRow);
      $('#task-table tbody').append(newHtmlRow);
    }
  }

  //----EVENT LISTENERS---//

  // #1 - when the new task or cancel button clicked on, call formHide to show/hide new task form
  $('#new-task-btn, #cancel-new-task').click(formHide);

  // #2 - add new task to listo array on form submission, accounting for blank entries, task priority (from form), and clearing the form
  $('#new-task-form').on('submit', function(e) {
    e.preventDefault(); // prevent form from submitting in html
    var data = $("#new-task-form :input").serializeArray(); // get array of data
    var taskText = data[0].value; // extract text of task


    if (/\S/.test(taskText)) { // if taskTest is not empty (has a non-space char), /\S/ is a regex
      var newTask = new Task(taskText); // create task obj
      if ($('#moveToTop').is(':checked')) { // add task to top if checked
        addTask(newTask, true);
      } else { // else add task to bottom
        addTask(newTask);
      }
      this.reset(); // reset form
      refreshTaskTable(listo); // refresh table task view
    } else { // if taskTest is empty
      alert('No blank tasks allowed, please enter something.'); //alert warning message
    }
  });

  // #3 - when up/down prority button is clicked on, move object
  $('tbody').on('click', 'input', function() { // changes this to the input button
    var rowId = $(this).closest('tr').attr('id'); //get row id attr
    var currInd = parseInt(rowId[rowId.length - 1]); // extract row index
    var currClass = $(this).attr('class'); // up or down button?
    console.log(currClass);
    if (currClass === 'up-btn') {
      switchTaskPriority(currInd - 1, currInd); // switch current item with one above it, i.e. in one lower index
    } else if (currClass === 'down-btn') {
      switchTaskPriority(currInd + 1, currInd);
    } else if (currClass === 'task-checkbox') {
      removeTask(currInd);
      $(this).prop('checked', false);
    }
  });
}); // ending closing brace/parent
