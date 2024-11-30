function getData(e) {

    e.preventDefault();
   
      let name = document.getElementById("name").value;
      let address = document.getElementById("address").value;
      let phone = document.getElementById("phone").value;
      let email = document.getElementById("email").value;
      let output = document.querySelector(".output");
  
  
      let Arr = {name,address,phone,email};
      console.log(Arr);
      console.log(Object.keys(Arr));
      console.log(Object.values(Arr));
  
      output.classList.add("open");
    
     Object.keys(Arr).forEach((elem) => {
         let p = document.createElement("p");
         const newContent = document.createTextNode(elem + ": " + Arr[elem]);
         p.appendChild(newContent);
         output.appendChild(p);
     })
  }
      
  function closeOutput(e) {
      let close = document.querySelector("#close-output");
      let output = document.querySelector(".output");
     
      output.classList.remove("open");
    
  }
  
  
  
  
  
  //add item modal
  let socialArr = [];
  
  let addItem = document.querySelector("#addItem");
  let backdrop = document.querySelector(".backdrop");
  let socialMediaModal = document.querySelector(".social-media-modal");
  let closeModal = document.querySelector("#close-modal");
  
  
  function closeSocialMediaModal(e) {
      backdrop.classList.remove("open");
  }
  
  addItem.addEventListener('click' , () => {
      callModal();
  })
  
  function callModal(id) {
  
    document.getElementById("url").value = '';
    document.getElementById("namee").value = '';
    document.getElementById("description").value = '';
  
    backdrop.classList.add("open");
    document.querySelector(".save").setAttribute("onclick" , `saveInfo(${id})`)
  }
  
  
  
  function saveInfo(id) {
  
      let url = document.getElementById("url").value;
      let namee = document.getElementById("namee").value;
      let description = document.getElementById("description").value;
  
      console.log(id);
  
      if(id===undefined){
  
          console.log("id is undefined");
  
          let socialObj = {url,namee,description,id:socialArr.length, sort: socialArr.length}
          socialArr.push(socialObj);
          console.log(socialArr);
      }else {
  
          let data = socialArr.filter(elem => elem.id == id)[0];
  
          // or
          // let data = socialArr.find(elem => elem.id === id);
  
          console.log(data);
          console.log("id is defined");
          
          data.url = url;
          data.namee = namee;
          data.description = description;
      }
  
      let backdrop = document.querySelector(".backdrop");
      backdrop.classList.remove("open");
  
      printSoc();
  
  }
  
  function printSoc() {
      let myLi = socialArr.sort((a,b) => a.sort-b.sort).reduce((total, elem) => {
          return total+= `<li data-id="${elem.id}">
                              `+ elem.description + `
                              <button onclick="editSoc(${elem.id})"><i class='bx bxs-edit-alt' ></i></button>
                              <button onclick="deleteSoc(${elem.id})"><i class='bx bx-x-circle'></i></button>
                          </li>`
      },'');
      document.querySelector('.social-media-output').innerHTML = '<ul id="list">' + myLi + '</ul>';
      $( function() {
          $( "#list" ).sortable({
              stop:(event,ui) => {
                  [...document.querySelectorAll("#list li")].forEach((row,index) => {
                      // first way
                      for(let i=0;i< socialArr.length; i++){
                          if (socialArr[i].id == row.dataset.id) {
                              socialArr[i].sort = index;
                              break;
                          }
                      }

                  })
              }
          });
        } );
  }
  
  function deleteSoc(id) {
      socialArr = socialArr.filter(elem => elem.id!==id);
      printSoc();
  }
  
  function editSoc(id) {
  
    callModal(id);
  
    let data = socialArr.filter(elem => elem.id == id)[0];
  
      //   or
      //   let data = socialArr.find(elem => elem.id === id); 
  
      document.getElementById("url").value = data.url;
      document.getElementById("namee").value = data.namee;
      document.getElementById("description").value = data.description;
  
  }
  