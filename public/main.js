document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)


async function updateEntry() {
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName("name")[0].value,
                age: document.getElementsByName("age")[0].value,
                birthLocation: document.getElementsByName("birthLocation")[0].value,
                birthName: document.getElementsByName("birthName")[0].value,
                image: document.getElementsByName("image")[0].value,
                yearsActive: document.getElementsByName("yearsActive")[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}


async function deleteEntry() {
    const input = document.getElementById("deleteInput")
    try {
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err){
        console.log(err)
    }
}

