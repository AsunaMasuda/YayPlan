$(document).ready(function () {
  /*jshint esversion: 6 */

  // Add more dates in create_new_plan.html
  /**
   * This function adds more options of dates in create_new_plan.html
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
      // Add a set of input and a remove button to the container created above
      $("#addavail_" + next_index)
        .append(
          `<div class="row">
          <div class="col-sm-9"><input type="text" class="form-control avail_picker form-valid" name="availability_` +
            next_index +
            `"></div>
            <div class="col-sm-3 my-auto"><span id="removeavail_` +
            next_index +
            `" class="remove_avail_button">Remove</span></div>
            </div>`
        )
        .find(".avail_picker")
        .flatpickr(fpConf);
    }
  });

  // Remove button - this removes the added container
  $(".container").on("click", ".remove_avail_button", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let removeindex = split_id[1];

    if (removeindex > 0) {
      $("#addavail_" + removeindex).remove();
    } else {
      pass;
    }
  });

  // Add flatpickr
  /**
   * This function enables flatpickr
   * @constructor
   */
  let fpConf = {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
  };

  flatpickr(".avail_picker", fpConf);

  // Validation
  /**
   * This function enables validation method
   * @constructor
   */
  (function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName("needs-validation");
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();

  // Add one more participant
  /**
   * This function adds one more participant in update_plan_participants.html
   * @constructor
   */
  $(".participant_add").on("click", function () {
    // Finding total number of participants added already
    let lastid = $(".participant_count:last").attr("id");
    console.log(lastid);
    let split_id = lastid.split("_");
    let next_index = Number(split_id[1]) + 1;

    // Adding new div container after the last parcipant
    $(".participant_count:last").after(
      `<tr class="participant_count" id="participant_` + next_index + `"></tr>`
    );

    // Get the number of suggested dates
    let element_avail_num = document.getElementsByClassName("avail").length;

    // Create a component that holds options for availabilities
    let html_isert_td_all = "";
    for (let i = 1; i <= element_avail_num; i++) {
      let html_isert_td =
        `<td>
        <select class="select_avail" name="participant_` +
        next_index +
        `_availability_` +
        i.toString() +
        `" form="form1">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option></select>
        </td>`;
      html_isert_td_all += html_isert_td;
    }

    // Add a component for name, availabilities, note, edit button and remove button
    $("#participant_" + next_index).append(
      `<td><input type="text" class="form-control" name="participant_` +
        next_index +
        `" form="form1" required/></td>` +
        html_isert_td_all +
        `<td><textarea class="form-control" rows="1" name="participant_note" form="form1"></textarea></td>
        <td><button id ="removeparticipant_` +
        next_index +
        `" class="participant_remove">Remove</button></td>
        <td></td>`
    );
  });

  // Button for removing a participant
  $(".container").on("click", ".participant_remove", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let removeindex = split_id[1];
    $("#participant_" + removeindex).remove();
  });

  // Edit existing participant data
  /**
   * This function enables users to edit the existing data
   * @constructor
   */
  $(".button_edit").on("click", function () {
    let name_clicked = $(this)
      .parent()
      .parent()
      .find(".participant_name")
      .text()
      .trim();

    let element_avail_num = document.getElementsByClassName("avail").length;
    let html_isert_td_all = "";
    for (let i = 1; i <= element_avail_num; i++) {
      let html_isert_td =
        `<td><select class="select_avail" form="form2" name="availability_` +
        i.toString() +
        `"><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option></select></td>`;
      html_isert_td_all += html_isert_td;
    }

    let insert_html =
      `<tr><td><input type="text" class="form-control" name="edit_name" value="` + name_clicked +
      `" form="form3" readonly/><input type="hidden" name="edit_name" value="` +
      name_clicked +
      `" form="form2" readonly/></td>` +
      html_isert_td_all +
      `<td><textarea class="form-control" rows="1" name="participant_note" form="form2"></textarea></td>
      <td><input type="submit" class="participant_schedule_button" form="form2" value="Save"/></td>
      <td><button class="participant_delete_from_DB" type="button" data-toggle="modal" data-target="#myModal">Delete Data</button></td></tr>`;

    $(this).parent().parent().replaceWith(insert_html);
  });

  // Count the number of Yes/No/Maybe
  /**
   * This function counts the number of Yes/No/Maybe per availability
   * @constructor
   */
  let element_avail_num = document.getElementsByClassName("avail").length;
  let element_participant_num = document.getElementsByClassName(
    "participant_name"
  ).length;

  for (let i = 0; i < element_avail_num; i++) {
    let num_yes = 0;
    let num_no = 0;
    let num_maybe = 0;
    let test_variable = ".avail_num_" + i.toString();
    let class_name_availability = "availability_" + i.toString();
    let valueArray = document.getElementsByClassName(class_name_availability);
    for (let n = 0; n < element_participant_num; n++) {
      if (valueArray[n].innerHTML.includes("Yes")) {
        num_yes = num_yes + 1;
      } else if (valueArray[n].innerHTML.includes("No")) {
        num_no = num_no + 1;
      } else if (valueArray[n].innerHTML.includes("Maybe")) {
        num_maybe = num_maybe + 1;
      }
    }
    $(test_variable).append(
      `<div>Yes - ` +
        num_yes +
        `</div><div>No - ` +
        num_no +
        `</div><div>Maybe - ` +
        num_maybe +
        `</div>`
    );
  }
});

// Copy to clipboard
/**
 * This function copy the shareble link by a click
 * @constructor
 */
function myFunction() {
  //  Get the text field
  let copyText = document.getElementById("copy_link_url");

  //  Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  //  Copy the text inside the text field
  document.execCommand("copy");

  //  display the text "copied successfully"
  $(".copied_successfully").css("color", "black");
  let textReplace = $(".copied_successfully").text();
  let result = textReplace.replace(".", "Copied successfully!");
  $(".copied_successfully").text(result);
}
