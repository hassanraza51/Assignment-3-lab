$(function(){
LoadRecepies();
$("#rep").on("click",".btn-danger",handleDelete);
$("#rep").on("click",".btn-warning",handleUpdate);
$("#addBtn").click(addRecipe);
$("#updateSave").click(function(){
    var id=$("#updateId").val();
    var name=$("#updateName").val();
    var gender=$("#updateGender").val();
    var email=$("#updateEmail").val();
    var street=$("#updateStreet").val();
    var city=$("#updateCity").val();
    var country=$("#updateCountry").val();
    var course=$("#updateCourse").val();
    var phone=$("#updatePhone").val();
    var address={street,city,country};
    $.ajax({
        url:"https://myfacultyapi.herokuapp.com/api/faculty/"+id,
        data:{name,gender,email,address,course,phone},
        method:"PUT",
        success:function(response){
            console.log(response);
            LoadRecepies();
            $("#updateModel").modal("hide");
        }
    });
});
});
function handleUpdate(){
    $("#updateModel").modal("show");
    var btn=$(this);
    var parentDiv=btn.closest(".recipe");
    let id=parentDiv.attr("data-id");
    $.get("https://myfacultyapi.herokuapp.com/api/faculty/"+id,function(response){
        $("#updateId").val(response.id);
        $("#updateName").val(response.name);   
        $("#updateGender").val(response.gender);
        $("#updateEmail").val(response.email);
        $("#updateStreet").val(response.address.street_address);
        $("#updateCity").val(response.address.city);
        $("#updateCountry").val(response.address.country);
        $("#updateCourse").val(response.course_code);
        $("#updatePhone").val(response.phone_no);
        $("#updateModel").modal("show");
    });
}
function addRecipe(name,gender,email,address,course,phone){
    var name=$("#name").val();
    var gender=$("#gender").val();
    var email=$("#email").val();
    var street=$("#street").val();
    var city=$("#city").val();
    var country=$("#country").val();
    var address={street,city,country};
    var course=$("#course").val();
    var phone=$("#phone").val();
    $.ajax({
        url:"https://myfacultyapi.herokuapp.com/api/faculty",
        method:"POST",
        data: { name,gender,email,address,course,phone},
        success:function(response){
            console.log(response);
            $("#name").val();
            $("#gender").val();
            $("#email").val();
            $("#street").val();
            $("#city").val();
            $("#country").val();
            $("#course").val();
            $("#phone").val();$("#addModel").modal("hide");
            LoadRecepies();
        }
    });
}
function handleDelete(){
    var btn=$(this);
    var parentDiv=btn.closest(".recipe");
    let id=parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url:"https://myfacultyapi.herokuapp.com/api/faculty/"+id,
        method:"DELETE",
        success: function(){
            LoadRecepies();
        }
    })
}
function LoadRecepies(){
    $.ajax({
        url:"https://myfacultyapi.herokuapp.com/api/faculty",
        method: "GET",
        error:function(response){
            var recipes=$("#rep");
            recipes.append("Error occured");
        },
        success: function(response){
            console.log(response);
            var recepies=$("#rep");
            recepies.empty();
            for(var i=0;i<response.length;i++)
             {
                 var rec=response[i];
                 recepies.append(`<div class="recipe" data-id="${rec.id}"><h3>ID: ${rec.id}</h3>
                 <h3>Name: ${rec.name}</h3><h5>Gender: ${rec.gender}</h5>
                 <h5>Email: ${rec.email}</h5><h5>Street: ${rec.address.street_address}</h5>
                 <h5>City: ${rec.address.city}</h5><h5>Country: ${rec.address.country}</h5><h5>Course Code: ${rec.course_code}</h5>
                 <h5>Phone No: ${rec.phone_no}</h5>
                 <button class="btn btn-danger btn-sm ">delete</button>
                 <button class="btn btn-warning btn-sm">edit</button></div>`);
                 //recepies.append("<div><h3>"+ rec.title +"</h3></div>");
             }
        }
    });
}