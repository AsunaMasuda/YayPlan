$(document).ready(function () {
  // Add more places in create_new_plan.html
  /**
   * This function adds more options for places
   * @constructor
   */
  $("#addplaces_button").on("click", function () {
    // Finding total number of elements added
    let total_element = $(".element").length;
    let lastid = $(".element:last").attr("id");
    let split_id = lastid.split("_");
    let next_index = Number(split_id[1]) + 1;

    let max = 10;
    if (total_element < max) {
      // Adding new div container after last occurance of element class
      $(".element:last")
        .after(`<div class="element" id="addplaces_` + next_index + `"></div>`)
        
       $("#addplaces_" + next_index).append(
          `<div class="row"><div class="col-sm-9"><input type="text" class="form-control event_place" name="event_place` +
            next_index + `"></div><div class="col-sm-3 my-auto"><span id="remove_` +
            next_index +
            `" class="remove_place_avail">Remove</span></div></div>`
        );
    }
  });

  // Remove element
  $(".container").on("click", ".remove_place_avail", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let deleteindex = split_id[1];

    $('#addplaces_' + deleteindex).remove();
  });


  // Add more date & time in create_new_plan.html
  /**
   * This function adds more options for date and time
   * @constructor
   */
  $("#add_avail").on("click", function () {
    $("#taskEmpty")
      .append(
        `<input
                  type="text"
                  class="form-control avail_picker"
                  name="event_availability` +
          (Number($("#event_availability").length) + 1) +
          `"
                />`
      )
      .find(".avail_picker")
      .flatpickr(fpConf);
  });

  // Add flatpickr
  /**
   * This function enables flatpickr
   * @constructor
   */
  const fpConf = {
    enableTime: true,
    dateFormat: "Y-m-d Kh:i",
  };

  flatpickr(".avail_picker", fpConf);
});
