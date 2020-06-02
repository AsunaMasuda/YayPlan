$(document).ready(function () {
  // Add more places in create_new_plan.html
  /**
   * This function adds more options for places
   * @constructor
   */
  $("#addplaces_button").on("click", function () {
    // Finding total number of elements added
    let total_element = $(".element_place").length;
    let lastid = $(".element_place:last").attr("id");
    let split_id = lastid.split("_");
    let next_index = Number(split_id[1]) + 1;

    let max = 10;
    if (total_element < max) {
      // Adding new div container after last occurance of element class
      $(".element_place:last").after(
        `<div class="element_place" id="addplaces_` + next_index + `"></div>`
      );

      $("#addplaces_" + next_index).append(
        `<div class="row"><div class="col-sm-9"><input type="text" class="form-control event_place form-valid" name="event_place_` +
          next_index +
          `"></div><div class="col-sm-3 my-auto"><span id="remove_` +
          next_index +
          `" class="remove_place_button">Remove</span></div></div>`
      );
    }
  });

  // Remove element
  $(".container").on("click", ".remove_place_button", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let deleteindex = split_id[1];

    $("#addplaces_" + deleteindex).remove();
  });

  // Add more date & time in create_new_plan.html
  /**
   * This function adds more options for date and time
   * @constructor
   */
  $("#addavail_button").on("click", function () {
    // Finding total number of elements added
    let total_element = $(".element_avail").length;
    let lastid = $(".element_avail:last").attr("id");
    let split_id = lastid.split("_");
    let next_index = Number(split_id[1]) + 1;

    let max = 10;
    if (total_element < max) {
      // Adding new div container after last occurance of element class
      $(".element_avail:last").after(
        `<div class="element_avail" id="addavail_` + next_index + `"></div>`
      );

      $("#addavail_" + next_index)
        .append(
          `<div class="row"><div class="col-sm-9"><input type="text" class="form-control avail_picker form-valid" name="availability_` +
            next_index +
            `"></div><div class="col-sm-3 my-auto"><span id="removeavail_` +
            next_index +
            `" class="remove_avail_button">Remove</span></div></div>`
        )
        .find(".avail_picker")
        .flatpickr(fpConf);
    }
  });

  // Remove element
  $(".container").on("click", ".remove_avail_button", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let deleteindex = split_id[1];

    $("#addavail_" + deleteindex).remove();
  });

  // Add flatpickr
  /**
   * This function enables flatpickr
   * @constructor
   */
  const fpConf = {
    enableTime: true,
    dateFormat: "m-d-Y H:i",
    allowInput:true
  };
  
  flatpickr(".avail_picker", fpConf);

  // Validation 
  /**
   * Validation
   * @constructor
   */
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

  // Add one more participant
  /**
   * This function adds more options for date and time
   * @constructor
   */
  $(".participant_add").on("click", function () {
    // Finding total number of participants added already
    let lastid = $(".participant_count:last").attr("id");
    console.log(lastid);
    let split_id = lastid.split("_");
    let next_index = Number(split_id[1]) + 1;

    // Adding new div container after last occurance of element class
    $(".participant_count:last").after(
      `<tr class="participant_count" id="participant_` + next_index + `"></tr>`
    );

    // Finding total number of availability in the data base
    let element_avail_num = document.getElementsByClassName("avail").length;
    let html_isert_td_all = "";
    for (let i = 1; i <= element_avail_num; i++) {
      html_isert_td =
        `<td><select name="participant_` +
        next_index +
        `_availability_` +
        i.toString() +
        `" form="form1"><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option></select></td>`;
      html_isert_td_all += html_isert_td;
    }

    $("#participant_" + next_index).append(
      `<td><input type="text" class="form-control" name="participant_` +
        next_index +
        `" form="form1"/></td>` +
        html_isert_td_all +
        `<td><textarea class="form-control" rows="1" name="participant_note" form="form1"></textarea></td><td ><input type="submit" class="participant_schedule_button" form="form1" value="Submit"/></td><td><button id ="removeparticipant_` +
        next_index +
        `" class="participant_remove">Remove</button></td>`
    );
  });

  // Remove element
  $(".container").on("click", ".participant_remove", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let deleteindex = split_id[1];

    $("#participant_" + deleteindex).remove();
  });

  // Edit existing participant data
  /**
   * This function enables users to change the existing data
   * @constructor
   */
  $(".button_edit").on("click", function () {
    let name_clicked = $(this)
      .parent()
      .parent()
      .find(".participant_name")
      .text();

    let element_avail_num = document.getElementsByClassName("avail").length;
    let html_isert_td_all = "";
    for (let i = 1; i <= element_avail_num; i++) {
      html_isert_td =
        `<td><select form="form2" name="availability_` +
        i.toString() +
        `"><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option></select></td>`;
      html_isert_td_all += html_isert_td;
    }

    let insert_html =
      `<tr><td><input type="text" class="form-control" name="edit_name" value=` +
      name_clicked +
      ` form="form3" readonly/><input type="hidden" name="edit_name" value=` +
      name_clicked +
      ` form="form2" readonly/></td>` +
      html_isert_td_all +
      `<td><textarea class="form-control" rows="1" name="participant_note" form="form2"></textarea></td><td><input type="submit" class="participant_schedule_button" form="form2" value="Save"/></td><td><button class="participant_delete_from_DB" type="button" data-toggle="modal" data-target="#myModal">Delete Data</button></td></tr>`;

    $(this).parent().parent().replaceWith(insert_html);
  });
});

// Copy to clipboard
/**
 * This function copy the shareble link by a click
 * @constructor
 */
function myFunction() {
  /* Get the text field */
  var copyText = document.getElementById("copy_link_url");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* display the text "copied successfully" */
  $(".copied_successfully").css("color", "black");
  let textReplace = $(".copied_successfully").text();
  let result = textReplace.replace(".", "Copied successfully!");
  $(".copied_successfully").text(result);
}
