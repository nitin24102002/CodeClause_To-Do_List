//delete selected button action
document.getElementById("delForm").addEventListener("submit", function(event) {
    // Prevent the default form submission
    event.preventDefault();
  
    var checkBoxVal = [];
    var delCheckBox = document.getElementsByClassName("delCheckBox");

    for (var i = delCheckBox.length -1 ; i>= 0; i--) {
        if (delCheckBox[i].type === "checkbox" && delCheckBox[i].checked) {
            checkBoxVal.push(delCheckBox[i].value);
        }
    }

    let thisPage = new URL('http://localhost/deleteTask');
    thisPage.searchParams.append('checkVal', checkBoxVal);
    location.replace(thisPage);
});

//select all check box
function checkAll(ele) {
     var checkboxes = document.getElementsByTagName('input');
     if (ele.checked) {
         for (var i = 0; i < checkboxes.length; i++) {
             if (checkboxes[i].type == 'checkbox') {
                 checkboxes[i].checked = true;
             }
         }
     } else {
         for (var i = 0; i < checkboxes.length; i++) {
             if (checkboxes[i].type == 'checkbox') {
                 checkboxes[i].checked = false;
             }
         }
     }
}

//prevent user entering date before current date
window.onload=function(){
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("dateTime").setAttribute('min', today);
}