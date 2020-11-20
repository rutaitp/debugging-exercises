window.addEventListener('load', function () {
    console.log("Yes!");

    //STEP9: Add here code to fetch all chirps on page load
    fetch('/allchirps')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });

    //STEP 1: Adding button event listener
    let button = document.getElementById('chirpButton');
    button.addEventListener('click', function () {
        console.log("Chirp button was presssed!");

        //STEP2: Grab input values
        let name = document.getElementById('chirp-name').value;
        let content = document.getElementById('chirp-content').value;

        //STEP3: Create Chirp Object
        let chirpObj = {
            "name": name,
            "content": content
        };

        //STEP4: Create JSON from js object using stringify
        let chirpObjJSON = JSON.stringify(chirpObj);

        //STEP5: Send JSON to the server
        fetch('/chirpData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: chirpObjJSON
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //check if was saved
                if (data.task == "success") {
                    let currentChirp = data.chirp;
                    console.log(currentChirp);
                    //add data to the page
                    let parentElement = document.getElementById('feed');
                    //get the parent's first child
                    let theFirstChild = parentElement.firstChild;
                    //create a new element
                    let newChirp = document.createElement('p');
                    let chirpContent = currentChirp.name + " : " + currentChirp.content;
                    newChirp.innerHTML = chirpContent;
                    //insert the new element before the first child
                    parentElement.insertBefore(newChirp, theFirstChild);
                }
            });
    });
});






