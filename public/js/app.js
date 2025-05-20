
loadData();

addButton.addEventListener('click', () => {
    let brandNewRow = createNewExpenserow();
    fetch('/new-row', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(brandNewRow)
    });

});
