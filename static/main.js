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
      $(".element_place:last")
        .after(`<div class="element_place" id="addplaces_` + next_index + `"></div>`)
        
       $("#addplaces_" + next_index).append(
          `<div class="row"><div class="col-sm-9"><input type="text" class="form-control event_place" name="event_place_` +
            next_index + `"></div><div class="col-sm-3 my-auto"><span id="remove_` +
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

    $('#addplaces_' + deleteindex).remove();
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
      $(".element_avail:last")
        .after(`<div class="element_avail" id="addavail_` + next_index + `"></div>`)
        
       $("#addavail_" + next_index).append(
          `<div class="row"><div class="col-sm-9"><input type="text" class="form-control avail_picker" name="availability_` +
            next_index + `"></div><div class="col-sm-3 my-auto"><span id="removeavail_` +
            next_index +
            `" class="remove_avail_button">Remove</span></div></div>`
        ).find(".avail_picker").flatpickr(fpConf);
    }
  });

  // Remove element
  $(".container").on("click", ".remove_avail_button", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let deleteindex = split_id[1];

    $('#addavail_' + deleteindex).remove();
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


  // Add one more participant
  /**
   * This function adds more options for date and time
   * @constructor
   */
   $(".participant_add").on("click", function () {

    // Finding total number of availability in the data base
    let element_avail_num = document.getElementsByClassName("avail").length;
    var html_isert_td_all = "";
    for (let i=1; i <= element_avail_num; i++) {
        html_isert_td = '<td><select name="availability_'+ i.toString() +'"><option value="Available">Available</option><option value="Not Available">Not Available</option><option value="Maybe">Maybe</option></select></td>';
        html_isert_td_all += html_isert_td;
    }
    console.log(html_isert_td_all)

    // Finding total number of participants added already
    let total_participant_num = document.getElementsByClassName("participant_count").length
    let next_index = total_participant_num + 1;

    let max = 10;
    if (total_participant_num < max) {
      // Adding new div container after last occurance of element class
      $(".participant_count:last")
        .after(`<tr id="participant_` + next_index + `" class="participant_count"></tr>`)
        
       $("#participant_" + next_index).append(`<td><input type="text" name="participant_"` + next_index + `/></td>` + html_isert_td_all + `<td><textarea class="form-control" rows="1" name="participant_note"></textarea></td><td><button class="participant_schedule_button">Submit</button></td><td><button id ="removeparticipant_`+ next_index +`" class="participant_remove">Remove</button></td>`);
    }
  });


  // Remove element
  $(".container").on("click", ".participant_remove", function () {
    let remove_id = this.id;
    let split_id = remove_id.split("_");
    let deleteindex = split_id[1];

    $('#participant_' + deleteindex).remove();
  });


});
