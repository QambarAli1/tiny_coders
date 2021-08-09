const base_url = "http://localhost:5000"

function createPost() {
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const post = document.getElementById("post")
    const obj = {
        title: title,
        description: description
    }
    console.log(obj)

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";


    axios.post(`${base_url}/createPost`, obj)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })
}



//SignUp 

var sign = () => {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var address = document.getElementById('address').value;
    var number = document.getElementById('number').value;

    var obj = {
        email: email,
        password: password,
        name: name,
        number: number,
        address: address
    }
    axios.post(`${base_url}/signup`, obj)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            location.href = "login.html"
        })
        .catch((error) => {
            console.log(`Error ...... ${error.message}`);
        })
}



// >>>
function log() {
    var email = document.getElementById('emaillog').value;
    var password = document.getElementById('password').value;



    axios.get(`${base_url}/signup`, { headers: { email: email } })
        .then((response) => {


            console.log(`Login data ....>>>>>>  ${JSON.stringify(response.data)}`);
            console.log(JSON.stringify(response.data.name));
            
            localStorage.setItem('name', JSON.stringify(response.data.name))
            localStorage.setItem('email', JSON.stringify(response.data.email))
            localStorage.setItem('address', JSON.stringify(response.data.address))
            localStorage.setItem('number', JSON.stringify(response.data.number))

            if (email == response.data.email & password == response.data.password) {
                console.log("Account found");
                location.href = "dashboard.html"
                
                var currentUserName = document.getElementById('currentUserName');
                var currentUserEmail = document.getElementById('currentUserEmail');
                var currentUserAddress = document.getElementById('currentUserAddress');
                var currentUserNumber = document.getElementById('currentUserNumber');
                currentUserName.innerHTML = JSON.parse(localStorage.getItem("name"));
                currentUserEmail.innerHTML = JSON.parse(localStorage.getItem("email"));
                currentUserAddress.innerHTML = JSON.parse(localStorage.getItem("address"));
                currentUserNumber.innerHTML = JSON.parse(localStorage.getItem("number"));

            }
            else {
                console.log("Account not found");
            }
        })
        .catch((error) => {
            console.log(`Login Error ....>>>>>> ${error}`);
        })
}






// Get current user through local Storage

// var getCurrentUser = () => {
//     var user = JSON.parse(localStorage.getItem("user"));
//     if (user === null) {
//         location.href = 'login.html'
//     }
//     var currentUserName = document.getElementById('currentUserName');
//     var currentUserEmail = document.getElementById('currentUserEmail');
//     var currentUserAddress = document.getElementById('currentUserAddress');
//     var currentUserNumber = document.getElementById('currentUserNumber');
//     currentUserName.innerHTML = user.name;
//     currentUserEmail.innerHTML = user.email;
//     currentUserAddress.innerHTML = user.address;
//     currentUserNumber.innerHTML = user.number;
// }




function read() {
    axios.get(`${base_url}/readAll`)
        .then((response) => {
            // getCurrentUser();
            console.log(JSON.stringify(response.data));
            // console.log(response.data[1].title);
            for (i = 0; i < response.data.length; i++) {
                var post = document.getElementById('postItem');
                var divMain = document.createElement('div');
                var h5 = document.createElement('h5');
                var divInner = document.createElement('div');
                var image = document.createElement('img');
                var para = document.createElement('p')

                divMain.setAttribute("class", "card")
                divMain.setAttribute("style", "width: 18rem;")
                image.setAttribute("class", "card-img-top")
                image.setAttribute("src", "images/user.jpg")
                divInner.setAttribute("class", "card-body")
                h5.setAttribute("class", "card-title")
                para.setAttribute("class", "card-text")

                var h5Text = document.createTextNode(JSON.stringify(response.data[i].title));
                h5.appendChild(h5Text)
                var paraText = document.createTextNode(JSON.stringify(response.data[i].description));
                para.appendChild(paraText)
                divInner.appendChild(h5)
                divInner.appendChild(para)
                divMain.appendChild(image)
                divMain.appendChild(divInner);
                post.appendChild(divMain);
                title.value = "";
                description.value = "";
            }
        })
        .catch((error) => {
            console.log(`Error getting all posts : ${error.message}`);
        })

}
