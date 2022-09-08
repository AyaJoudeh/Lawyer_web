$("#updateCase").submit((event) => {
    event.preventDefault();

    let array = $(this).serializeArray();
    let data = {};

    $.map(array, (value, i) => {
        data[n["name"]] = n["value"];
    });

    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/api/cases/${data.id}",
        data: data,
    })
    alert("Case updated Successfully!");
});

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td button.delete");
    $ondelete.click(() => {
        let id = $(this).attr("data-id");

        if (confirm("Are you sure you want to delete this record?")) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/api/cases/${id}",
            }).done((response) => {
                alert("Data Deleted Successfully!");
                location.reload();
            });
        }
    });
}