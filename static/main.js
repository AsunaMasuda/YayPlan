/*jshint esversion: 6 */

/**
 * This function returns select elements
 */
function renderSelect(selectName, formId) {
    return `<select class="select_avail" name="${selectName}" form="${formId}">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option>
    </select>`;
}

/**
 * This function copy the shareble link by a click
 */
function copyUrl() {
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

$(document).ready(function() {
    /**
     * This function enables validation method
     */
    let forms = document.getElementsByClassName("needs-validation");
    let validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
            "submit",
            function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            },
            false
        );
    });

    /**
     * This function adds more options of dates in create_new_plan.html
     */
    $("#addavail_button").on("click", function() {
        // Finding total number of elements added
        let totalElement = $(".element_avail").length;
        let lastId = $(".element_avail:last").attr("id");
        let splitId = lastId.split("_");
        let nextIndex = Number(splitId[1]) + 1;

        let max = 10;
        if (totalElement < max) {
            // Adding new div container after last occurance of element class
            $(".element_avail:last").after(
                `<div class="element_avail" id="addavail_${nextIndex}"></div>`
            );
            // Add a set of input and a remove button to the container created above
            $("#addavail_" + nextIndex)
                .append(
                    `<div class="row">
                        <div class="col-sm-9">
                            <input type="text" class="form-control avail_picker form-valid" name="availability_${nextIndex}" />
                        </div>
                        <div class="col-sm-3 my-auto">
                            <span id="removeavail_${nextIndex}" class="remove_avail_button">Remove</span>
                        </div>
                    </div>`
                )
                .find(".avail_picker")
                .flatpickr(fpConf);
        }
    });

    // Remove button - this removes the added container
    $(".container").on("click", ".remove_avail_button", function() {
        let removeId = this.id;
        let splitId = removeId.split("_");
        let removeIndex = splitId[1];

        if (removeIndex > 0) {
            $("#addavail_" + removeIndex).remove();
        }
    });
/*jshint esversion: 6 */

/**
 * This function returns select elements
 */
function renderSelect(selectName, formId) {
    return `<select class="select_avail" name="${selectName}" form="${formId}">
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Maybe">Maybe</option>
    </select>`;
}

/**
 * This function copy the shareble link by a click
 */
function copyUrl() {
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

$(document).ready(function() {
    /**
     * This function enables validation method
     */
    let forms = document.getElementsByClassName("needs-validation");
    let validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
            "submit",
            function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            },
            false
        );
    });

    /**
     * This function adds more options of dates in create_new_plan.html
     */
    $("#addavail_button").on("click", function() {
        // Finding total number of elements added
        let totalElement = $(".element_avail").length;
        let lastId = $(".element_avail:last").attr("id");
        let splitId = lastId.split("_");
        let nextIndex = Number(splitId[1]) + 1;

        let max = 10;
        if (totalElement < max) {
            // Adding new div container after last occurance of element class
            $(".element_avail:last").after(
                `<div class="element_avail" id="addavail_${nextIndex}"></div>`
            );
            // Add a set of input and a remove button to the container created above
            $("#addavail_" + nextIndex)
                .append(
                    `<div class="row">
                        <div class="col-sm-9">
                            <input type="text" class="form-control avail_picker form-valid" name="availability_${nextIndex}" />
                        </div>
                        <div class="col-sm-3 my-auto">
                            <span id="removeavail_${nextIndex}" class="remove_avail_button">Remove</span>
                        </div>
                    </div>`
                )
                .find(".avail_picker")
                .flatpickr(fpConf);
        }
    });

    // Remove button - this removes the added container
    $(".container").on("click", ".remove_avail_button", function() {
        let removeId = this.id;
        let splitId = removeId.split("_");
        let removeIndex = splitId[1];

        if (removeIndex > 0) {
            $("#addavail_" + removeIndex).remove();
        }
    });

    /**
     * This function enables flatpickr
     */
    let fpConf = {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    };

    flatpickr(".avail_picker", fpConf);

    /**
     * This function adds one more participant in update_plan_participants.html
     */
    $(".participant_add").on("click", function() {
        // Finding total number of participants added already
        let lastId = $(".participant_count:last").attr("id");
        let splitId = lastId.split("_");
        let nextIndex = Number(splitId[1]) + 1;

        // Adding new div container after the last parcipant
        $(".participant_count:last").after(
            `<tr class="participant_count" id="participant_${nextIndex}"></tr>`
        );

        // Get the number of suggested dates
        let elementAvailNum = document.getElementsByClassName("avail").length;

        // Create a component that holds options for availabilities
        let htmlInsertTdAll = "";
        for (let i = 1; i <= elementAvailNum; i++) {
            let selectName = `part_${nextIndex}_avail_${i.toString()}`
            htmlInsertTdAll += `<td>${renderSelect(selectName, "form1")}</td>`;
        }

        // Add a component for name, availabilities, note, edit button and remove button
        $("#participant_" + nextIndex).append(
            `<td>
                <input type="text" class="form-control" name="participant_${nextIndex}" form="form1" required/>
             </td>
                ${htmlInsertTdAll}
             <td>
                <textarea class="form-control" rows="1" name="part_note" form="form1"></textarea>
             </td>
             <td>
             </td>
             <td>
                 <button id ="removeparticipant_${nextIndex}" class="participant_remove">Remove</button>
             </td>
             <td></td>`
        );
    });

    // Event handler to remove a participant
    $(".container").on("click", ".participant_remove", function() {
        let removeId = this.id;
        let splitId = removeId.split("_");
        let removeIndex = splitId[1];
        $("#participant_" + removeIndex).remove();
    });

    /**
     * This function enables users to edit the existing data
     */
    $(".button_edit").on("click", function() {
        let nameClicked = $(this)
            .parent()
            .parent()
            .find(".participant_name")
            .text()
            .trim();

        let elementAvailNum = document.getElementsByClassName("avail").length;
        let htmlInsertTdAll = "";
        for (let i = 1; i <= elementAvailNum; i++) {
            let selectAvail = `availability_${i.toString()}`
            htmlInsertTdAll +=
                `<td>${renderSelect(selectAvail, "form2")}</td>`;
        }

        let insertHtml =
            `<tr>
                <td>
                    <input type="text" class="form-control" name="edit_name" value="${nameClicked}" form="form3" readonly/>
                    <input type="hidden" name="edit_name" value="${nameClicked}" form="form2" readonly/>
                </td>
                    ${htmlInsertTdAll}
                <td>
                    <textarea class="form-control" rows="1" name="part_note" form="form2"></textarea>
                </td>
                <td>
                    <input type="submit" class="participant_schedule_button" form="form2" value="Save"/>
                </td>
                <td>
                    <button class="participant_delete_from_DB" type="button" data-toggle="modal" data-target="#myModal">Delete Data</button>
                </td>
            </tr>`;

        $(this).parent().parent().replaceWith(insertHtml);
    });

    /**
     * This function counts the number of Yes/No/Maybe per availability
     */
    let elementAvailNum = document.getElementsByClassName("avail").length;
    let elementParticipantNum = document.getElementsByClassName(
        "participant_name"
    ).length;

    for (let i = 0; i < elementAvailNum; i++) {
        let numYes = 0;
        let numNo = 0;
        let numMaybe = 0;
        let testVariable = ".avail_num_" + i.toString();
        let classNameAvailability = "availability_" + i.toString();
        let valueArray = document.getElementsByClassName(classNameAvailability);
        for (let n = 0; n < elementParticipantNum; n++) {
            if (valueArray[n].innerHTML.includes("Yes")) {
                numYes = numYes + 1;
            } else if (valueArray[n].innerHTML.includes("No")) {
                numNo = numNo + 1;
            } else if (valueArray[n].innerHTML.includes("Maybe")) {
                numMaybe = numMaybe + 1;
            }
        }
        $(testVariable).append(
            `<div>Yes - ${numYes}</div><div>No - ${numNo}</div><div>Maybe - ${numMaybe}</div>`
        );
    }
});

    /**
     * This function enables flatpickr
     */
    let fpConf = {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    };

    flatpickr(".avail_picker", fpConf);

    /**
     * This function adds one more participant in update_plan_participants.html
     */
    $(".participant_add").on("click", function() {
        // Finding total number of participants added already
        let lastId = $(".participant_count:last").attr("id");
        let splitId = lastId.split("_");
        let nextIndex = Number(splitId[1]) + 1;

        // Adding new div container after the last parcipant
        $(".participant_count:last").after(
            `<tr class="participant_count" id="participant_${nextIndex}"></tr>`
        );

        // Get the number of suggested dates
        let elementAvailNum = document.getElementsByClassName("avail").length;

        // Create a component that holds options for availabilities
        let htmlInsertTdAll = "";
        for (let i = 1; i <= elementAvailNum; i++) {
            let selectName = `part_${nextIndex}_avail_${i.toString()}`;
            htmlInsertTdAll += `<td>${renderSelect(selectName, "form1")}</td>`;
        }

        // Add a component for name, availabilities, note, edit button and remove button
        $("#participant_" + nextIndex).append(
            `<td>
                <input type="text" class="form-control" name="participant_${nextIndex}" form="form1" required/>
             </td>
                ${htmlInsertTdAll}
             <td>
                <textarea class="form-control" rows="1" name="part_note" form="form1"></textarea>
             </td>
             <td>
             </td>
             <td>
                 <button id ="removeparticipant_${nextIndex}" class="participant_remove">Remove</button>
             </td>
             <td></td>`
        );
    });

    // Event handler to remove a participant
    $(".container").on("click", ".participant_remove", function() {
        let removeId = this.id;
        let splitId = removeId.split("_");
        let removeIndex = splitId[1];
        $("#participant_" + removeIndex).remove();
    });

    /**
     * This function enables users to edit the existing data
     */
    $(".button_edit").on("click", function() {
        let nameClicked = $(this)
            .parent()
            .parent()
            .find(".participant_name")
            .text()
            .trim();

        let elementAvailNum = document.getElementsByClassName("avail").length;
        let htmlInsertTdAll = "";
        for (let i = 1; i <= elementAvailNum; i++) {
            let selectAvail = `availability_${i.toString()}`;
            htmlInsertTdAll +=
                `<td>${renderSelect(selectAvail, "form2")}</td>`;
        }

        let insertHtml =
            `<tr>
                <td>
                    <input type="text" class="form-control" name="edit_name" value="${nameClicked}" form="form3" readonly/>
                    <input type="hidden" name="edit_name" value="${nameClicked}" form="form2" readonly/>
                </td>
                    ${htmlInsertTdAll}
                <td>
                    <textarea class="form-control" rows="1" name="part_note" form="form2"></textarea>
                </td>
                <td>
                    <input type="submit" class="participant_schedule_button" form="form2" value="Save"/>
                </td>
                <td>
                    <button class="participant_delete_from_DB" type="button" data-toggle="modal" data-target="#myModal">Delete Data</button>
                </td>
            </tr>`;

        $(this).parent().parent().replaceWith(insertHtml);
    });

    /**
     * This function counts the number of Yes/No/Maybe per availability
     */
    let elementAvailNum = document.getElementsByClassName("avail").length;
    let elementParticipantNum = document.getElementsByClassName(
        "participant_name"
    ).length;

    for (let i = 0; i < elementAvailNum; i++) {
        let numYes = 0;
        let numNo = 0;
        let numMaybe = 0;
        let testVariable = ".avail_num_" + i.toString();
        let classNameAvailability = "availability_" + i.toString();
        let valueArray = document.getElementsByClassName(classNameAvailability);
        for (let n = 0; n < elementParticipantNum; n++) {
            if (valueArray[n].innerHTML.includes("Yes")) {
                numYes = numYes + 1;
            } else if (valueArray[n].innerHTML.includes("No")) {
                numNo = numNo + 1;
            } else if (valueArray[n].innerHTML.includes("Maybe")) {
                numMaybe = numMaybe + 1;
            }
        }
        $(testVariable).append(
            `<div>Yes - ${numYes}</div><div>No - ${numNo}</div><div>Maybe - ${numMaybe}</div>`
        );
    }
});