$(document).ready(function(){
    
// Add more places 
/**
 * This function adds more options for places
 * @constructor
 */
$("#add_places").on("click", function () {
  $("#extra_places").append(
    `<input type="text"
    class="form-control event_place"
    name="event_place` + ((Number($('.event_place').length)) + 1) + `"/>`
)
});

// Add more date & time
/**
 * This function adds more options for date and time
 * @constructor
 */
$("#add_avail").on("click", function () {
$("#taskEmpty").append(`<input
                  type="text"
                  class="form-control avail_picker"
                  name="event_availability` + (Number($('#event_availability').length) + 1) + `"
                />`).find(".avail_picker").flatpickr(fpConf);
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

})